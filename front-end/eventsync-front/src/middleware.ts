"use server";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const cookies = request.cookies.get("loginUser.token");
    const userType = request.cookies.get("userType");

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (!cookies) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (request.nextUrl.pathname === "/") {
        if (cookies && userType) {
            return NextResponse.redirect(new URL(`/dashboard/${userType.value}`, request.url));
        }
    }
}