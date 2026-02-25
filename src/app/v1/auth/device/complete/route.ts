import { NextRequest, NextResponse } from "next/server";
import { handleRouteError, invalidRequest } from "@/lib/milestone1/http";
import { completeDeviceAuth } from "@/lib/milestone1/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const deviceCode = body?.device_code;

    if (typeof deviceCode !== "string" || deviceCode.trim().length === 0) {
      return invalidRequest("`device_code` is required.");
    }

    return NextResponse.json(completeDeviceAuth(deviceCode), { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
