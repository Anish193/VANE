import type { Message, ProviderName } from "@/types";

export interface CompletionRequest {
  messages: Message[];
  systemPrompt?: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface CompletionResponse {
  content: string;
  tokens: { prompt: number; completion: number; total: number };
  model: string;
  provider: ProviderName;
}

export abstract class BaseProvider {
  abstract readonly name: ProviderName;
  abstract complete(req: CompletionRequest): Promise<CompletionResponse>;
  abstract stream(req: CompletionRequest): AsyncGenerator<string>;
}
