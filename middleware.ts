import { cookies } from "next/headers";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ApiKey = process.env.SECURE_API_KEY as string;

async function CheckUser(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieStore = await cookies();
  const token = cookieStore?.get("pb-cookie");

  // If there's no cookie at all
  if (!token) {
    return handleNotLoggedInUser(req, pathname);
  }

  // Check if the token is valid
  const response = await fetch(
    `${process.env.PB_URL}/api/collections/users/auth-refresh`,
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "X-POCKETBASE-API-KEY": ApiKey,
        Authorization: token.value,
        "PB-USER-IP": (await headers()).get("X-Forwarded-For") || "0.0.0.0",
      }),
    }
  );

  // If the token is invalid, treat the user as a guest
  if (response.status !== 200) {
    return handleNotLoggedInUser(req, pathname);
  }

  // If the token is valid, treat the user as logged in
  if (response.status === 200) {
    return handleLoggedInUser(req, pathname);
  }
}

export async function middleware(req: NextRequest, res: NextResponse) {
  return CheckUser(req);
}

// If the user is not logged in, redirect them to the login page
function handleNotLoggedInUser(req: NextRequest, pathname: string) {
  // Check if the user is trying to access a protected page
  if (pathname.startsWith("/protected")) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    if (req.cookies.get("pb-cookie")) {
      // If there is an invalid token, delete the cookie and redirect to login
      response.cookies.delete("pb-cookie");
    }
    return response;
  }
  return NextResponse.next();
}

function handleLoggedInUser(req: NextRequest, pathname: string) {
  // If the token is valid, no reason for the user to be on the login or Signup page
  if (["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/protected/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
