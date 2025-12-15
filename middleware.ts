import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get locale from cookie or default to 'es'
  const locale = request.cookies.get("locale")?.value || "es";

  // Clone the response and continue
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
