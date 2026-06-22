import type { ApiResponse } from "@/types";

export function ok<T>(data: T, message?: string, status = 200): Response {
  const body: ApiResponse<T> = { success: true, data, message };
  return Response.json(body, { status });
}

export function created<T>(data: T, message?: string): Response {
  return ok(data, message, 201);
}

export function err(error: string, status = 400): Response {
  const body: ApiResponse = { success: false, error };
  return Response.json(body, { status });
}

export function unauthorized(message = "Unauthorized"): Response {
  return err(message, 401);
}

export function forbidden(message = "Forbidden"): Response {
  return err(message, 403);
}

export function notFound(message = "Not found"): Response {
  return err(message, 404);
}

export function serverError(message = "Internal server error"): Response {
  return err(message, 500);
}
