import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;
    const pathname = req.nextUrl.pathname;


    const userPages = ["/tour", "/cart", "/history", "/profile",];
    const adminPages = ["/dashboard"];

    // Chưa login
    if (!token && [...userPages, ...adminPages].some(p => pathname.startsWith(p))) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // User cố vào admin
    if (pathname.startsWith("/dashboard") && role !== "admin") {
        console.log('user')
        return NextResponse.redirect(new URL("/tour", req.url));
    }

    // Admin cố vào user
    if (userPages.some(p => pathname.startsWith(p)) && role !== "user") {
        console.log('adminnn')
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/tour/:path*",
        "/cart/:path*",
        "/history/:path*",
        "/profile/:path*",
    ],
};
