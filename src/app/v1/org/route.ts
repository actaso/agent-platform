import { NextRequest, NextResponse } from "next/server";
import { extractBearerToken, handleRouteError } from "@/lib/milestone1/http";
import { getOrg } from "@/lib/milestone1/store";

export function GET(request: NextRequest) {
  try {
    const accessToken = extractBearerToken(request);
    return NextResponse.json(getOrg(accessToken), { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
