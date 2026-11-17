import { z } from "zod";

export const learningInputSchema = z.object({
  challenge: z.string().trim().min(10).max(2000),
  goal: z.string().trim().max(300),
  minutes: z.number().int().min(5).max(120),
  language: z.enum(["zh", "en", "es", "he", "ko", "fr"]),
}).strict();

export async function readStrategyStream(response: Response, onText: (text: string) => void) {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("AI response is empty.");
  const decoder = new TextDecoder();
  let buffer = "";
  let complete = false;
  const process = (line: string) => {
    if (!line.trim()) return;
    const event = JSON.parse(line);
    if (event.type === "error") throw new Error(event.message);
    if (event.type === "text" && typeof event.text === "string") onText(event.text);
    if (event.type === "done") complete = true;
  };
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      lines.forEach(process);
    }
    buffer += decoder.decode();
    process(buffer);
    if (!complete) throw new Error("AI response interrupted. Please try again later.");
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
}