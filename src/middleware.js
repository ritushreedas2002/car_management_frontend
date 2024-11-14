import { NextResponse } from "next/server";

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const publicPaths = ['/','/Pages/login','/Pages/signup'];
    const token = request.cookies.get("token")?.value || '';
    
    console.log(token);

    if (publicPaths.includes(path) && token) {
        return NextResponse.redirect(new URL('/Pages/carlisting', request.nextUrl));
    }

    if (!publicPaths.includes(path) && !token) {
        return NextResponse.redirect(new URL('/Pages/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [               // Homepage
        '/Pages/login',    // Login page
        '/Pages/signup',   // Signup page
        '/Pages/carlisting' // Car listing page
    ]
};
