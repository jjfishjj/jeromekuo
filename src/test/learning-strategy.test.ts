import { describe, expect, it } from "vitest";
import { learningInputSchema, readStrategyStream } from "@/lib/learningStrategy";

describe("learning strategy validation", () => {
  const input = { challenge: "I keep forgetting the vocabulary I study.", goal: "Have a conversation", minutes: 20, language: "en" };
  it("accepts a visitor challenge without requiring an account", () => {
    expect(learningInputSchema.parse(input)).toEqual(input);
  });
  it("rejects empty descriptions", () => {
    expect(learningInputSchema.safeParse({ ...input, challenge: "   " }).success).toBe(false);
  });
  it("rejects unsupported response languages", () => {
    expect(learningInputSchema.safeParse({ ...input, language: "unsupported" }).success).toBe(false);
  });
});

describe("learning strategy stream", () => {
  const response = (chunks: string[]) => new Response(new ReadableStream({ start(controller) {
    chunks.forEach((chunk) => controller.enqueue(new TextEncoder().encode(chunk)));
    controller.close();
  } }));
  it("assembles a real strategy across chunk boundaries", async () => {
    let output = "";
    await readStrategyStream(response(['{"type":"text","text":"Use active ', 'recall."}\n{"type":"done"}\n']), (text) => { output += text; });
    expect(output).toBe("Use active recall.");
  });
  it("surfaces a safe upstream failure instead of fake strategy output", async () => {
    await expect(readStrategyStream(response(['{"type":"error","status":402,"message":"Please add AI credits"}\n']), () => {})).rejects.toThrow("Please add AI credits");
  });
  it("rejects interrupted output without a completion event", async () => {
    await expect(readStrategyStream(response(['{"type":"text","text":"Partial"}\n']), () => {})).rejects.toThrow("interrupted");
  });
});