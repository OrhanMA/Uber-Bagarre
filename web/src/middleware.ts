import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const route = url.pathname;
  // console.log(route);

  if (route === "/logout") {
    const response = NextResponse.redirect(new URL("/signin", url.clone()));
    response.cookies.delete("jwtToken");
    response.cookies.delete("user_id");
    return response;
  }

  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-hello-from-middleware1", "hello");

  const jwtToken = request.cookies.get("jwtToken");

  console.log("MIDDLEWARE JWT token is: ", jwtToken);

  if (!jwtToken) {
    // NextRequest.js depuis la v12.1 recommande de cloner l'url
    // https://nextjs.org/docs/messages/middleware-relative-urls
    const urlClone = url.clone();
    urlClone.pathname = "/signin";
    // console.log(urlClone);

    return NextResponse.redirect(urlClone);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - J'ai ajouté les routes publiques suivantes: signup, signin, about, rules et "/" qui est $ dans le pattern en dessous
     */
    "/((?!api|_next/static|_next/image|favicon.ico|signup|signin|about|rules|$).*)",
  ],
};
