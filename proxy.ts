import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;



  // All other routes (like /not-allowed, _next, favicon) bypass middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // only middleware runs for /app and its subpaths
};
