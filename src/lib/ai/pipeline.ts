import { OpenAIProvider } from "./providers/openai";
import { AnthropicProvider } from "./providers/anthropic";
import { BaseProvider, type CompletionRequest, type CompletionResponse } from "./providers/base";
import { AGENTS } from "@/lib/constants";
import type { AgentId, Message } from "@/types";

const providers: Record<string, BaseProvider> = {
  openai: new OpenAIProvider(),
  anthropic: new AnthropicProvider(),
};

export async function runAgent(agentId: AgentId, messages: Message[]): Promise<CompletionResponse> {
  const config = AGENTS[agentId];
  const provider = providers[config.provider];
  return provider.complete({
    messages,
    systemPrompt: getSystemPrompt(agentId),
    model: config.model,
    maxTokens: 2048,
    temperature: 0.7,
  });
}

export async function* streamAgent(agentId: AgentId, messages: Message[]): AsyncGenerator<string> {
  const config = AGENTS[agentId];
  const provider = providers[config.provider];
  yield* provider.stream({
    messages,
    systemPrompt: getSystemPrompt(agentId),
    model: config.model,
    maxTokens: 2048,
    temperature: 0.7,
  });
}

export function buildSSEStream(generator: AsyncGenerator<string>): ReadableStream {
  return new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of generator) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: chunk })}\n\n`));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });
}

function getSystemPrompt(agentId: AgentId): string {
  const prompts: Record<AgentId, string> = {
    helix: `You are Helix, a versatile general-purpose AI assistant built by VANE. You excel at reasoning, writing, analysis, coding, mathematics, and creative tasks. Be concise, accurate, and helpful. Format your responses clearly.`,
    omen: `You are Omen, an investigative reasoning engine built by VANE. You specialize in deep analysis, pattern recognition, deductive reasoning, and strategic insight. Approach problems systematically and surface non-obvious connections. Be thorough but precise.`,
    forge: `You are Forge, a software engineering assistant built by VANE. You specialize in code generation, debugging, architecture design, and technical problem solving. Always provide production-quality code with clear explanations.`,
    atlas: `You are Atlas, a knowledge and memory system built by VANE. You specialize in synthesizing information, building structured knowledge, and retrieving relevant context. Be comprehensive and well-organized.`,
  };
  return prompts[agentId];
}
