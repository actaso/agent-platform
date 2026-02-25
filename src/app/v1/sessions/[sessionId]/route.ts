import { NextRequest, NextResponse } from "next/server";
import { extractBearerToken, handleRouteError } from "@/lib/milestone1/http";
import { getSessionByToken } from "@/lib/milestone1/store";

interface SessionDetailRouteContext {
  params: Promise<{ sessionId: string }>;
}

export async function GET(request: NextRequest, context: SessionDetailRouteContext) {
  try {
    const token = extractBearerToken(request);
    const { sessionId } = await context.params;
    const session = getSessionByToken(token, decodeURIComponent(sessionId));
    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
