import { NextRequest, NextResponse } from "next/server";
import {
  issueAccessTokenForDefaultUser,
  switchWorkspace,
} from "@/lib/milestone1/store";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const workspaceId = String(formData.get("workspaceId") ?? "").trim();

  if (workspaceId.length === 0) {
    return NextResponse.redirect(new URL("/platform/session?error=missing-workspace", request.url));
  }

  try {
    const accessToken = issueAccessTokenForDefaultUser();
    switchWorkspace(accessToken, workspaceId);
    return NextResponse.redirect(new URL("/platform/session?workspace=updated", request.url));
  } catch {
    return NextResponse.redirect(new URL("/platform/session?error=workspace-failed", request.url));
  }
}
