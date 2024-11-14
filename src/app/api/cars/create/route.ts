import { NextRequest, NextResponse } from "next/server";
import { backendApiService } from "@/app/services/backend.service";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const token = request.cookies.get("token")?.value;

        const response = await backendApiService.post('/cars', reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 201) {
            return NextResponse.json(
                { message: 'Car created successfully', car: response.data },
                { status: 201 }
            );
        }

    } catch (error) {
        console.error('Error creating car:', error);
        return NextResponse.json(
            { message: "An error occurred while creating the car" },
            { status: 500 }
        );
    }
} 