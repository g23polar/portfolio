import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
  const isApiPortfolioRoute = req.nextUrl.pathname.startsWith("/api/portfolio")

  if (isAdminRoute || isApiPortfolioRoute) {
    if (!req.auth) {
      // Not logged in - redirect to login
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (req.auth.user?.email !== process.env.ADMIN_EMAIL) {
      // Logged in but not admin - redirect to home with error
      return NextResponse.redirect(new URL("/?error=unauthorized", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*", "/api/portfolio/:path*"],
}
