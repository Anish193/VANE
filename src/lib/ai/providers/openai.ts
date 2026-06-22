import { BaseProvider, type CompletionRequest, type CompletionResponse } from "./base";
import type { Message } from "@/types";

export class OpenAIProvider extends BaseProvider {
  readonly name = "openai" as const;
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    super();
    this.apiKey = process.env.OPENAI_API_KEY || "";
    this.baseUrl = "https://api.openai.com/v1";
  }

  private toOpenAIMessages(messages: Message[], systemPrompt?: string) {
    const result: Array<{ role: string; content: string }> = [];
    if (systemPrompt) result.push({ role: "system", content: systemPrompt });
    for (const m of messages) {
      result.push({ role: m.role === "assistant" ? "assistant" : "user", content: m.content });
    }
    return result;
  }

  async complete(req: CompletionRequest): Promise<CompletionResponse> {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({
        model: req.model,
        messages: this.toOpenAIMessages(req.messages, req.systemPrompt),
        max_tokens: req.maxTokens ?? 2048,
        temperature: req.temperature ?? 0.7,
      }),
    });
    const data = await res.json();
    return {
      content: data.choices[0].message.content,
      tokens: {
        prompt: data.usage.prompt_tokens,
        completion: data.usage.completion_tokens,
        total: data.usage.total_tokens,
      },
      model: req.model,
      provider: "openai",
    };
  }

  async *stream(req: CompletionRequest): AsyncGenerator<string> {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({
        model: req.model,
        messages: this.toOpenAIMessages(req.messages, req.systemPrompt),
        stream: true,
        temperature: req.temperature ?? 0.7,
      }),
    });
    const reader = res.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
        try {
          const chunk = JSON.parse(line.slice(6));
          const delta = chunk.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
          // malformed chunk
        }
      }
    }
  }
}
