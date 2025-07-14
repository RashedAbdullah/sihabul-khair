import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request) {
  const session = await auth();
  // console.log("Middleware ", session.user.email);
  const { pathname } = request.nextUrl;

  // Public route exception (e.g., login)
  const publicPaths = ["/signin"];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Block unauthenticated users
  if (!session?.user) {
    const loginUrl = new URL("/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Restrict /dashboard or /admin to only admin users
  if (pathname.startsWith("/dashboard")) {
    if (session.user.email !== "maarashed40@gmail.com") {
      const homeUrl = new URL("/", request.url);
      return NextResponse.redirect(homeUrl); // or show 403 page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|signin).*)"],
};
