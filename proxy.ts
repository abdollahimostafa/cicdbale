import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /app routes
  if (pathname.startsWith("/bale")) {
    const isBale = req.cookies.get("isBale")?.value;

    if (!isBale) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // All other routes (like /not-allowed, _next, favicon) bypass middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/bale/:path*"], // only middleware runs for /app and its subpaths
};
