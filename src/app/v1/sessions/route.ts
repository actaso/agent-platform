import { NextRequest, NextResponse } from "next/server";
import {
  extractBearerToken,
  handleRouteError,
  invalidRequest,
} from "@/lib/milestone1/http";
import { createSession, listSessions } from "@/lib/milestone1/store";
import type { CreateSessionRequest } from "@/lib/milestone1/types";

export function GET(request: NextRequest) {
  try {
    const accessToken = extractBearerToken(request);
    const workspaceId = request.nextUrl.searchParams.get("workspaceId") ?? undefined;
    const sessions = listSessions(accessToken, workspaceId);
    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = extractBearerToken(request);
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return invalidRequest("A JSON request body is required.");
    }

    const payload = body as CreateSessionRequest;
    if (typeof payload.agent !== "string" || payload.agent.trim().length === 0) {
      return invalidRequest("`agent` is required.");
    }

    const created = createSession(accessToken, payload);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
