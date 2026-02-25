import { NextRequest, NextResponse } from "next/server";
import { ControlPlaneError } from "@/lib/milestone1/store";
import type { ApiErrorPayload } from "@/lib/milestone1/types";

function internalErrorPayload(): ApiErrorPayload {
  return {
    code: "INTERNAL_ERROR",
    message: "Unexpected server error.",
    retryable: false,
  };
}

export function extractBearerToken(request: NextRequest): string {
  const header = request.headers.get("authorization");
  if (!header) {
    throw new ControlPlaneError(401, {
      code: "AUTH_REQUIRED",
      message: "Missing Authorization header. Run `oc login`.",
      retryable: false,
    });
  }

  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    throw new ControlPlaneError(401, {
      code: "AUTH_REQUIRED",
      message: "Invalid Authorization header. Expected 'Bearer <token>'.",
      retryable: false,
    });
  }

  return token;
}

export function invalidRequest(message: string, details?: Record<string, unknown>) {
  return NextResponse.json(
    {
      error: {
        code: "INVALID_REQUEST",
        message,
        retryable: false,
        details,
      } satisfies ApiErrorPayload,
    },
    { status: 400 }
  );
}

export function handleRouteError(error: unknown) {
  if (error instanceof ControlPlaneError) {
    return NextResponse.json({ error: error.payload }, { status: error.status });
  }

  return NextResponse.json({ error: internalErrorPayload() }, { status: 500 });
}
