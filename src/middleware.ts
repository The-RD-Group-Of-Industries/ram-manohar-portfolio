/**
 * Middleware function that handles authentication and authorization for the application.
 *
 * - Allows access to the sign-in page for everyone.
 * - Redirects unauthenticated users to the sign-in page.
 * - Allows access to the dashboard page for authenticated users.
 * - Allows access to other routes if desired.
 *
 * @param request - The incoming Next.js request object.
 * @returns A Next.js response object that either allows access, redirects, or handles the request.
 */
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  console.log(`Pathname: ${request.nextUrl.pathname}, Token: ${token}`);

  // Allow access to the sign-in page for everyone
  if (request.nextUrl.pathname === "/sign-in") {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the sign-in page
  if (!token) {
    console.log(`Redirecting to /sign-in`);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect authenticated users if needed
  if (request.nextUrl.pathname === "/dashboard") {
    console.log(`Allowing access to /dashboard`);
    return NextResponse.next();
  }

  return NextResponse.next(); // Allow access to other routes if desired
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to /dashboard and all nested routes
};
