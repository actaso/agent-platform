import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  issueAccessTokenForDefaultUser,
} from "@/lib/milestone1/store";
import type { CreateSessionRequest } from "@/lib/milestone1/types";

function parsePositiveInt(raw: FormDataEntryValue | null): number | undefined {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return undefined;
  }

  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.floor(value);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const agent = String(formData.get("agent") ?? "").trim();
  const task = String(formData.get("task") ?? "").trim();
  const workspaceId = String(formData.get("workspaceId") ?? "").trim();
  const costLimitCents = parsePositiveInt(formData.get("costLimitCents"));
  const durationLimitSeconds = parsePositiveInt(formData.get("durationLimitSeconds"));
  const actionLimit = parsePositiveInt(formData.get("actionLimit"));

  if (agent.length === 0) {
    return NextResponse.redirect(new URL("/platform/session?error=missing-agent", request.url));
  }

  const payload: CreateSessionRequest = {
    agent,
    workspaceId: workspaceId.length > 0 ? workspaceId : undefined,
    task: task.length > 0 ? { description: task } : undefined,
    budget:
      costLimitCents || durationLimitSeconds || actionLimit
        ? {
            costLimitCents,
            durationLimitSeconds,
            actionLimit,
          }
        : undefined,
  };

  try {
    const accessToken = issueAccessTokenForDefaultUser();
    createSession(accessToken, payload);

    return NextResponse.redirect(new URL("/platform/session?created=1", request.url));
  } catch {
    return NextResponse.redirect(new URL("/platform/session?error=spawn-failed", request.url));
  }
}
