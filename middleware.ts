import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, orgId } = await auth();

  // protect and redirect non-authenticated users from protected routes
  if (!userId && !isPublicRoute(req)){
    // let the user to sign in and return here after signed in
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // redirect authenticated users out of public routes
  if (userId && isPublicRoute(req)){
    // if organization not selected, redirect to organization selection
    let path = "/select-org";

    // if organization is selected, redirect to organization page
    if (orgId){
      let path = "/organization/${orgId}";
    }

    const orgRedirect = new URL(path, req.url);
    return NextResponse.redirect(orgRedirect);
  }

  // redirect authenticated users without an organization yet to select organization page
  // to force organization selection
  if (userId && !orgId && req.nextUrl.pathname !== '/select-org'){
    return NextResponse.redirect(new URL('/select-org', req.url));
  }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};