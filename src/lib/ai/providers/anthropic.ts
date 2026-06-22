import { BaseProvider, type CompletionRequest, type CompletionResponse } from "./base";
import type { Message } from "@/types";

export class AnthropicProvider extends BaseProvider {
  readonly name = "anthropic" as const;
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    super();
    this.apiKey = process.env.ANTHROPIC_API_KEY || "";
    this.baseUrl = "https://api.anthropic.com/v1";
  }

  private toAnthropicMessages(messages: Message[]) {
    return messages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }));
  }

  async complete(req: CompletionRequest): Promise<CompletionResponse> {
    const res = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: req.model,
        system: req.systemPrompt,
        messages: this.toAnthropicMessages(req.messages),
        max_tokens: req.maxTokens ?? 2048,
        temperature: req.temperature ?? 0.7,
      }),
    });
    const data = await res.json();
    return {
      content: data.content[0].text,
      tokens: {
        prompt: data.usage.input_tokens,
        completion: data.usage.output_tokens,
        total: data.usage.input_tokens + data.usage.output_tokens,
      },
      model: req.model,
      provider: "anthropic",
    };
  }

  async *stream(req: CompletionRequest): AsyncGenerator<string> {
    const res = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: req.model,
        system: req.systemPrompt,
        messages: this.toAnthropicMessages(req.messages),
        max_tokens: req.maxTokens ?? 2048,
        stream: true,
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
        if (!line.startsWith("data: ")) continue;
        try {
          const event = JSON.parse(line.slice(6));
          if (event.type === "content_block_delta") yield event.delta.text;
        } catch {
          // malformed chunk
        }
      }
    }
  }
}
