import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const protectedRoutes = ["/tasks", "/dashboard"];

export function middleware(request: NextRequest) {
  // Middleware disabled - using client-side auth check instead
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
