import { NextRequest, NextResponse } from "next/server";
import { backendApiService } from "@/app/services/backend.service";



export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Authentication required" },
                { status: 401 }
            );
        }

        const response = await backendApiService.get('/cars', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return NextResponse.json(
                { 
                    message: "Cars fetched successfully",
                    cars: response.data 
                },
                { status: 200 }
            );
        }

        throw new Error('Failed to fetch cars');

    } catch (error: unknown) {
        console.error('Error fetching cars:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "An error occurred while fetching cars" },
            { status: 500 }
        );
    }
} 