import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  
  // Marking the cookie retrieval as asynchronous
  const token = await request.cookies.get('token')?.value || "";

  console.log(`Path: ${path}, Token: ${token}`);

  if (isPublicPath && token) {
    console.log('Redirecting to home');
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    console.log('Redirecting to login');
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next(); // Ensure middleware passes control to the next handler if no conditions match
}

export const config = {
  matcher: [
    "/dashboard",
    "/login",
    "/signup",
    "/password",
  ],
};
