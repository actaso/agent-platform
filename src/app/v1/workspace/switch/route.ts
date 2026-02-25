import { NextRequest, NextResponse } from "next/server";
import {
  extractBearerToken,
  handleRouteError,
  invalidRequest,
} from "@/lib/milestone1/http";
import { switchWorkspace } from "@/lib/milestone1/store";

export async function POST(request: NextRequest) {
  try {
    const accessToken = extractBearerToken(request);
    const body = await request.json().catch(() => null);
    const workspaceId = body?.workspaceId;

    if (typeof workspaceId !== "string" || workspaceId.trim().length === 0) {
      return invalidRequest("`workspaceId` is required.");
    }

    return NextResponse.json(switchWorkspace(accessToken, workspaceId), { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
