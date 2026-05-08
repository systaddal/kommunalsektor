import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  if (pathname.includes(".")) return NextResponse.next();

  if (hostname.includes("selsengsystaddal")) {
    const url = request.nextUrl.clone();
    url.pathname = `/ss${pathname}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ["/((?!_next|api|studio|favicon\\.ico).*)"],
};
