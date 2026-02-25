import { NextResponse } from "next/server";
import { handleRouteError } from "@/lib/milestone1/http";
import { startDeviceAuth } from "@/lib/milestone1/store";

export function POST() {
  try {
    return NextResponse.json(startDeviceAuth(), { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
