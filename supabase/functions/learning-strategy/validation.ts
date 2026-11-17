import { z } from "npm:zod@3";

export const strategyInput = z.object({
  challenge: z.string().trim().min(10).max(2000),
  goal: z.string().trim().max(300),
  minutes: z.number().int().min(5).max(120),
  language: z.enum(["zh", "en", "es", "he", "ko", "fr"]),
}).strict();