import { createHash } from "node:crypto";
import type { IncomingMessage } from "node:http";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const upstashMocks = vi.hoisted(() => ({
  limit: vi.fn(),
  redisInstances: [] as unknown[],
  limiterConfigs: [] as unknown[],
}));

vi.mock("@upstash/redis", () => ({
  Redis: class RedisMock {
    options: unknown;
    constructor(options: unknown) {
      this.options = options;
      upstashMocks.redisInstances.push(this);
    }
  },
}));

vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: class RatelimitMock {
    config: unknown;
    constructor(config: unknown) {
      this.config = config;
      upstashMocks.limiterConfigs.push(config);
    }
    static slidingWindow(tokens: number, duration: string) {
      return { algorithm: "sliding-window", tokens, duration };
    }
    limit(identifier: string) {
      return upstashMocks.limit(identifier);
    }
  },
}));

import handler from "../../api/contact";

type MockResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body?: unknown;
  html?: string;
  status: (code: number) => MockResponse;
  json: (payload: Record<string, unknown>) => MockResponse;
  setHeader: (name: string, value: string) => void;
  end: (value?: string) => void;
};

const createRequest = (overrides: Partial<IncomingMessage> & { body?: unknown } = {}) => ({
  method: "POST",
  headers: {
    host: "example.test",
    origin: "https://example.test",
    accept: "application/json",
    "content-type": "application/json",
    "x-vercel-forwarded-for": `192.0.2.${Math.floor(Math.random() * 200) + 1}`,
  },
  body: { name: "A Visitor", email: "visitor@example.org", topic: "product", message: "I would like to discuss a collaboration." },
  ...overrides,
}) as IncomingMessage & { body?: unknown };

const createResponse = (): MockResponse => ({
  statusCode: 200,
  headers: {},
  status(code) { this.statusCode = code; return this; },
  json(payload) { this.body = payload; return this; },
  setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
  end(value) { this.html = value; },
});

const invoke = async (request = createRequest()) => {
  const response = createResponse();
  await handler(request as IncomingMessage, response as unknown as Parameters<typeof handler>[1]);
  return response;
};

const limitResult = (success: boolean, reset = Date.now() + 600_000, reason?: "timeout") => ({
  success,
  limit: 5,
  remaining: success ? 4 : 0,
  reset,
  pending: Promise.resolve(),
  ...(reason ? { reason } : {}),
});

const mockRateLimit = (...results: ReturnType<typeof limitResult>[]) => {
  upstashMocks.limit.mockReset().mockResolvedValue(limitResult(true));
  results.forEach((result) => upstashMocks.limit.mockResolvedValueOnce(result));
  return upstashMocks.limit;
};

const configureMail = () => {
  vi.stubEnv("RESEND_API_KEY", "test-secret-not-real");
  vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.test");
  vi.stubEnv("CONTACT_FROM_EMAIL", "Website <website@example.test>");
};

beforeEach(() => {
  upstashMocks.limit.mockReset().mockResolvedValue(limitResult(true));
  upstashMocks.redisInstances.length = 0;
  upstashMocks.limiterConfigs.length = 0;
  vi.stubEnv("UPSTASH_REDIS_REST_URL", `https://redis-${Date.now()}-${Math.random()}.example.test`);
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "unit-test-token");
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("contact API", () => {
  it("rejects methods other than POST", async () => {
    const response = await invoke(createRequest({ method: "GET" }));
    expect(response.statusCode).toBe(405);
    expect(response.headers.allow).toBe("POST");
  });

  it("rejects cross-origin requests", async () => {
    const request = createRequest({ headers: { host: "example.test", origin: "https://attacker.test" } });
    const response = await invoke(request);
    expect(response.statusCode).toBe(403);
  });

  it("validates input before attempting email delivery", async () => {
    const request = createRequest({ body: { name: "Visitor", email: "not-an-email", topic: "product", message: "Too short" } });
    const response = await invoke(request);
    expect(response.statusCode).toBe(400);
  });

  it("rejects an oversized payload before email delivery", async () => {
    const request = createRequest({ body: { name: "Visitor", email: "visitor@example.org", topic: "other", message: "x".repeat(13_000) } });
    const response = await invoke(request);
    expect(response.statusCode).toBe(413);
  });

  it("rejects unsupported request content types", async () => {
    const request = createRequest({ headers: { host: "example.test", origin: "https://example.test", accept: "application/json", "content-type": "text/plain" } });
    const response = await invoke(request);
    expect(response.statusCode).toBe(415);
  });

  it("does not send mail until Resend credentials are configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_TO_EMAIL", "");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    const rateLimitSpy = mockRateLimit();
    const response = await invoke();
    expect(response.statusCode).toBe(503);
    expect(response.body).toEqual({ error: "Contact service is not configured" });
    expect(rateLimitSpy).not.toHaveBeenCalled();
  });

  it("fails closed without shared Upstash credentials", async () => {
    configureMail();
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const rateLimitSpy = mockRateLimit();

    const response = await invoke();
    expect(response.statusCode).toBe(503);
    expect(response.body).toEqual({ error: "Contact service is temporarily unavailable" });
    expect(rateLimitSpy).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails closed for an insecure Upstash endpoint", async () => {
    configureMail();
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "http://redis.example.test");
    const rateLimitSpy = mockRateLimit();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await invoke();
    expect(response.statusCode).toBe(503);
    expect(rateLimitSpy).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails closed if the shared limiter cannot reach Redis", async () => {
    configureMail();
    const rateLimitSpy = mockRateLimit();
    rateLimitSpy.mockRejectedValue(new Error("Redis unavailable"));
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await invoke();
    expect(response.statusCode).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(rateLimitSpy).toHaveBeenCalledOnce();
  });

  it("fails closed when Upstash returns success=true because the per-IP check timed out", async () => {
    configureMail();
    const rateLimitSpy = mockRateLimit(limitResult(true, Date.now() + 600_000, "timeout"));
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await invoke();
    expect(response.statusCode).toBe(503);
    expect(rateLimitSpy).toHaveBeenCalledOnce();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails closed when Upstash returns success=true because the global check timed out", async () => {
    configureMail();
    const rateLimitSpy = mockRateLimit(limitResult(true), limitResult(true, Date.now() + 3_600_000, "timeout"));
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await invoke();
    expect(response.statusCode).toBe(503);
    expect(rateLimitSpy).toHaveBeenCalledTimes(2);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not trust a client-supplied x-forwarded-for fallback", async () => {
    configureMail();
    const rateLimitSpy = mockRateLimit();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const request = createRequest({ headers: {
      host: "example.test",
      origin: "https://example.test",
      accept: "application/json",
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.99",
    } });

    const response = await invoke(request);
    expect(response.statusCode).toBe(503);
    expect(rateLimitSpy).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("uses a hashed Vercel client IP and checks the shared global budget", async () => {
    configureMail();
    const ip = "198.51.100.42";
    const rateLimitSpy = mockRateLimit();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const request = createRequest({ headers: {
      host: "example.test",
      origin: "https://example.test",
      accept: "application/json",
      "content-type": "application/json",
      "x-vercel-forwarded-for": ip,
      "x-forwarded-for": "203.0.113.99",
    } });

    const response = await invoke(request);
    expect(response.statusCode).toBe(200);
    expect(rateLimitSpy).toHaveBeenNthCalledWith(1, createHash("sha256").update(ip).digest("hex"));
    expect(rateLimitSpy).toHaveBeenNthCalledWith(2, "all");
    expect(upstashMocks.redisInstances).toHaveLength(1);
    expect(upstashMocks.limiterConfigs).toHaveLength(2);
    const [perIpConfig, globalConfig] = upstashMocks.limiterConfigs as Array<{
      redis: unknown;
      prefix: string;
      limiter: { algorithm: string; tokens: number; duration: string };
    }>;
    expect(perIpConfig.redis).toBe(globalConfig.redis);
    expect(perIpConfig.limiter).toMatchObject({ algorithm: "sliding-window", tokens: 5, duration: "10 m" });
    expect(globalConfig.limiter).toMatchObject({ algorithm: "sliding-window", tokens: 20, duration: "1 h" });
    expect(perIpConfig.prefix).not.toBe(globalConfig.prefix);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [, requestOptions] = fetchMock.mock.calls[0] as [string, RequestInit];
    const email = JSON.parse(String(requestOptions.body));
    expect(email.to).toEqual(["owner@example.test"]);
    expect(email.reply_to).toBe("visitor@example.org");
    expect(email.text).toContain("I would like to discuss a collaboration.");
  });

  it("blocks an IP after the shared per-IP budget is exhausted", async () => {
    configureMail();
    const reset = Date.now() + 120_000;
    const rateLimitSpy = mockRateLimit(limitResult(false, reset));
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await invoke();
    expect(response.statusCode).toBe(429);
    expect(Number(response.headers["retry-after"])).toBeGreaterThan(0);
    expect(rateLimitSpy).toHaveBeenCalledOnce();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("blocks when the shared global mail budget is exhausted", async () => {
    configureMail();
    const reset = Date.now() + 3_600_000;
    const rateLimitSpy = mockRateLimit(limitResult(true), limitResult(false, reset));
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await invoke();
    expect(response.statusCode).toBe(429);
    expect(Number(response.headers["retry-after"])).toBeGreaterThan(0);
    expect(rateLimitSpy).toHaveBeenCalledTimes(2);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts a native URL-encoded form POST and returns an HTML confirmation", async () => {
    configureMail();
    mockRateLimit();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const form = new URLSearchParams({ name: "A Visitor", email: "visitor@example.org", topic: "product", message: "I would like to discuss a collaboration.", website: "" });
    const request = createRequest({
      headers: {
        host: "example.test",
        origin: "https://example.test",
        accept: "text/html",
        "content-type": "application/x-www-form-urlencoded",
        "x-vercel-forwarded-for": "198.51.100.43",
      },
      body: form.toString(),
    });
    const response = await invoke(request);
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.html).toContain("訊息已送出");
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("escapes message HTML and returns a no-JavaScript confirmation page", async () => {
    configureMail();
    mockRateLimit();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const request = createRequest({
      headers: {
        host: "example.test",
        origin: "https://example.test",
        accept: "text/html",
        "content-type": "application/json",
        "x-vercel-forwarded-for": "198.51.100.44",
      },
      body: { name: "<script>alert(1)</script>", email: "visitor@example.org", topic: "other", message: "<img src=x onerror=alert(1)> Please reply." },
    });
    const response = await invoke(request);
    const [, requestOptions] = fetchMock.mock.calls[0] as [string, RequestInit];
    const email = JSON.parse(String(requestOptions.body));
    expect(email.html).not.toContain("<img src=x");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.html).toContain("訊息已送出");
  });
});
