import { NextRequest, NextResponse } from "next/server";
import { extractBearerToken, handleRouteError } from "@/lib/milestone1/http";
import { whoAmI } from "@/lib/milestone1/store";

export function GET(request: NextRequest) {
  try {
    const accessToken = extractBearerToken(request);
    return NextResponse.json(whoAmI(accessToken), { status: 200 });
  } catch (error) {
    return handleRouteError(error);
  }
}
