import { createHash } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { isIP } from "node:net";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface ContactRequest extends IncomingMessage {
  body?: unknown;
}

interface ContactResponse extends ServerResponse {
  status(code: number): this;
  json(payload: Record<string, unknown>): this;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown;
};

type SharedLimiters = {
  perIp: InstanceType<typeof Ratelimit>;
  global: InstanceType<typeof Ratelimit>;
};

const allowedTopics = new Map([
  ["product", "AI, product, or technology collaboration"],
  ["learning", "Learning systems and memory design"],
  ["speaking", "Speaking, workshop, or media inquiry"],
  ["other", "Other"],
]);

let cachedLimiters: { url: string; token: string; limiters: SharedLimiters } | undefined;

function getSharedLimiters(): SharedLimiters | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    if (new URL(url).protocol !== "https:") return null;
  } catch {
    return null;
  }
  if (cachedLimiters?.url === url && cachedLimiters.token === token) return cachedLimiters.limiters;

  const redis = new Redis({ url, token });
  const limiters: SharedLimiters = {
    perIp: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "jeromekuo:contact:ip",
    }),
    global: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 h"),
      prefix: "jeromekuo:contact:global",
    }),
  };
  cachedLimiters = { url, token, limiters };
  return limiters;
}

function isSameOrigin(req: ContactRequest): boolean {
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (typeof origin !== "string" || typeof host !== "string") return false;
  try {
    const parsedOrigin = new URL(origin);
    return parsedOrigin.host.toLowerCase() === host.toLowerCase()
      && (parsedOrigin.protocol === "https:" || parsedOrigin.protocol === "http:");
  } catch {
    return false;
  }
}

function normalizePayload(body: unknown, contentType: string): ContactPayload | null {
  if (typeof body === "string") {
    if (contentType === "application/x-www-form-urlencoded") {
      return Object.fromEntries(new URLSearchParams(body)) as ContactPayload;
    }
    try {
      const parsed: unknown = JSON.parse(body);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as ContactPayload : null;
    } catch {
      return null;
    }
  }
  return body && typeof body === "object" && !Array.isArray(body) ? body as ContactPayload : null;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

function respond(res: ContactResponse, statusCode: number, body: Record<string, unknown>, accept = ""): void {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (accept.includes("text/html")) {
    const succeeded = statusCode >= 200 && statusCode < 300;
    const title = succeeded ? "訊息已送出" : "暫時無法送出訊息";
    const message = succeeded ? "謝謝聯絡。訊息已安全轉交。" : "請返回聯絡頁確認欄位，或稍後再試。";
    res.status(statusCode);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}｜Jerome Kuo</title></head><body><main style="font:16px system-ui;max-width:42rem;margin:12vh auto;padding:2rem;line-height:1.8"><h1>${title}</h1><p>${message}</p><p><a href="/contact">返回聯絡頁</a></p></main></body></html>`);
    return;
  }
  res.status(statusCode).json(body);
}

function getClientIp(req: ContactRequest): string | undefined {
  // Vercel documents this as its client-IP header. Do not trust a client-supplied fallback.
  const forwarded = req.headers["x-vercel-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const candidate = typeof raw === "string" ? raw.split(",")[0].trim() : "";
  return isIP(candidate) ? candidate : undefined;
}

function retryAfterSeconds(resetAt: number, fallbackSeconds: number): number {
  const remainingSeconds = Math.ceil((resetAt - Date.now()) / 1000);
  return Number.isFinite(remainingSeconds) ? Math.max(1, remainingSeconds) : fallbackSeconds;
}

export default async function handler(req: ContactRequest, res: ContactResponse): Promise<void> {
  const accept = String(req.headers.accept ?? "");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    respond(res, 405, { error: "Method not allowed" }, accept);
    return;
  }
  if (!isSameOrigin(req)) {
    respond(res, 403, { error: "Request origin not allowed" }, accept);
    return;
  }
  const contentLength = Number(req.headers["content-length"] ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 12_000) {
    respond(res, 413, { error: "Request is too large" }, accept);
    return;
  }

  const contentTypeHeader = req.headers["content-type"];
  const contentType = (Array.isArray(contentTypeHeader) ? contentTypeHeader[0] : contentTypeHeader ?? "")
    .split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json" && contentType !== "application/x-www-form-urlencoded") {
    respond(res, 415, { error: "Unsupported content type" }, accept);
    return;
  }

  let payload: ContactPayload | null;
  try {
    payload = normalizePayload(req.body, contentType);
  } catch {
    respond(res, 400, { error: "Invalid request" }, accept);
    return;
  }
  if (!payload) {
    respond(res, 400, { error: "Invalid request" }, accept);
    return;
  }
  if (new TextEncoder().encode(JSON.stringify(payload)).byteLength > 12_000) {
    respond(res, 413, { error: "Request is too large" }, accept);
    return;
  }

  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    respond(res, 200, { ok: true }, accept);
    return;
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const topic = typeof payload.topic === "string" ? payload.topic : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 1 || name.length > 100 || !validEmail || email.length > 254
    || !allowedTopics.has(topic) || message.length < 10 || message.length > 5000) {
    respond(res, 400, { error: "Please check the required fields" }, accept);
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    respond(res, 503, { error: "Contact service is not configured" }, accept);
    return;
  }

  const ip = getClientIp(req);
  let limiters: SharedLimiters | null;
  try {
    limiters = getSharedLimiters();
  } catch {
    respond(res, 503, { error: "Contact service is temporarily unavailable" }, accept);
    return;
  }
  if (!ip || !limiters) {
    respond(res, 503, { error: "Contact service is temporarily unavailable" }, accept);
    return;
  }

  const clientIdentifier = createHash("sha256").update(ip).digest("hex");
  try {
    const perIp = await limiters.perIp.limit(clientIdentifier);
    if (perIp.reason === "timeout") {
      respond(res, 503, { error: "Contact service is temporarily unavailable" }, accept);
      return;
    }
    if (!perIp.success) {
      res.setHeader("Retry-After", String(retryAfterSeconds(perIp.reset, 600)));
      respond(res, 429, { error: "Too many requests" }, accept);
      return;
    }
    const global = await limiters.global.limit("all");
    if (global.reason === "timeout") {
      respond(res, 503, { error: "Contact service is temporarily unavailable" }, accept);
      return;
    }
    if (!global.success) {
      res.setHeader("Retry-After", String(retryAfterSeconds(global.reset, 3600)));
      respond(res, 429, { error: "Too many requests" }, accept);
      return;
    }
  } catch {
    // Fail closed: never send mail if the shared limiter cannot verify this request.
    respond(res, 503, { error: "Contact service is temporarily unavailable" }, accept);
    return;
  }

  const subject = `Portfolio contact: ${allowedTopics.get(topic)}`;
  const text = [
    "New portfolio contact request",
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${allowedTopics.get(topic)}`,
    "",
    message,
  ].join("\n");
  const html = `<h2>New portfolio contact request</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Topic:</strong> ${escapeHtml(allowedTopics.get(topic) ?? "Other")}</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: sender, to: [recipient], reply_to: email, subject, text, html }),
    });
    if (!result.ok) {
      respond(res, 502, { error: "Message delivery failed" }, accept);
      return;
    }
    respond(res, 200, { ok: true }, accept);
  } catch {
    respond(res, 502, { error: "Message delivery failed" }, accept);
  }
}
