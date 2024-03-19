import { NextRequest, NextResponse } from "next/server";
import { analytics } from "./utils/analytics";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    // track analytics event
    try {
      // analytics.track("pageview", {
      //     page: '/',
      //     country: req.geo?.country
      // })
    } catch (err) {
      // fail silently
      console.error(err);
    }
  }
  return NextResponse.next();
}

export const matcher = {
  matcher: ["/"],
};
