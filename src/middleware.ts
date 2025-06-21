import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { withAuth } from "next-auth/middleware";

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

// Create the auth middleware for admin routes
const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Combine both middlewares
export default function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // Check if the path is an admin route
  if (pathname.startsWith("/admin")) {
    return authMiddleware(req, req.nextUrl);
  }

  // For non-admin routes, just use the intl middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
