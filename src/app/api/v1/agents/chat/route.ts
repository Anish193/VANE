import { withAuth } from "@/lib/api/auth-middleware";
import { streamAgent, buildSSEStream } from "@/lib/ai/pipeline";
import { z } from "zod";
import { err } from "@/lib/api/response";
import type { NextRequest } from "next/server";
import type { AgentId } from "@/types";

const chatSchema = z.object({
  agentId: z.enum(["helix", "omen", "forge", "atlas"]),
  messages: z.array(z.object({ id: z.string(), role: z.enum(["user", "assistant", "system"]), content: z.string(), timestamp: z.string() })),
});

export const POST = withAuth(async (req: NextRequest) => {
  let body: unknown;
  try { body = await req.json(); } catch { return err("Invalid JSON"); }

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) return err(parsed.error.issues[0]?.message ?? "Validation error");

  const { agentId, messages } = parsed.data;
  const generator = streamAgent(agentId as AgentId, messages);
  const stream = buildSSEStream(generator);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
});
