import { NextRequest, NextResponse } from "next/server";
import { backendApiService } from "@/app/services/backend.service";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const response = await backendApiService.post('/auth/login', {
            email,
            password
        });

        console.log(response.data);
        const token = response.data.token;

        const responseWithCookie = NextResponse.json({ message: "Successfully logged in" });
        responseWithCookie.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 3600, // 1 hour in seconds
        });

        return responseWithCookie;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred during login" }, { status: 500 });
    }
}
