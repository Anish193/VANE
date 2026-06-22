import { extractBearerToken, verifyAccessToken, type JWTPayload } from "@/lib/auth/jwt";
import { unauthorized } from "@/lib/api/response";
import type { NextRequest } from "next/server";

type RouteContext = { params: Promise<Record<string, string>> };
type Handler = (req: NextRequest, ctx: { user: JWTPayload; params?: Record<string, string> }) => Promise<Response>;

export function withAuth(handler: Handler) {
  return async (req: NextRequest, ctx?: RouteContext): Promise<Response> => {
    const token = extractBearerToken(req.headers.get("Authorization"));
    if (!token) return unauthorized();
    const user = await verifyAccessToken(token);
    if (!user) return unauthorized("Token expired or invalid");
    const params = ctx?.params ? await ctx.params : undefined;
    return handler(req, { user, params });
  };
}

export function withRole(roles: string[], handler: Handler) {
  return withAuth(async (req, ctx) => {
    if (!roles.includes(ctx.user.role)) return unauthorized("Insufficient permissions");
    return handler(req, ctx);
  });
}
