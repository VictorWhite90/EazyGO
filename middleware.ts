import { auth } from "@/lib/auth-handler"
import { NextResponse } from "next/server"

const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/error"]
const customerRoutes = ["/dashboard/customer"]
const artisanRoutes = ["/dashboard/artisan"]
const adminRoutes = ["/dashboard/admin"]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    const loginUrl = new URL("/auth/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (customerRoutes.some(route => pathname.startsWith(route)) && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  if (artisanRoutes.some(route => pathname.startsWith(route)) && userRole !== "ARTISAN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  if (adminRoutes.some(route => pathname.startsWith(route)) && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

// Use Node.js runtime instead of Edge runtime for bcryptjs compatibility
export const runtime = 'nodejs'
