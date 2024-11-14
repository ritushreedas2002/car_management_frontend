import { NextRequest, NextResponse } from "next/server";
import { backendApiService } from "@/app/services/backend.service";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Authentication required" },
                { status: 401 }
            );
        }

        const response = await backendApiService.patch(`/cars/${params.id}`, reqBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return NextResponse.json(
            { message: "Car updated successfully", car: response.data },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating car:', error);
        return NextResponse.json(
            { message: "An error occurred while updating the car" },
            { status: 500 }
        );
    }
} 






export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Authentication required" },
                { status: 401 }
            );
        }

        const response = await backendApiService.get(`/cars/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return NextResponse.json(
                { 
                    message: "Car details fetched successfully",
                    car: response.data 
                },
                { status: 200 }
            );
        }

        throw new Error('Failed to fetch car details');

    } catch (error: unknown) {
        console.error('Error fetching car details:', error);
        
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "An error occurred while fetching car details" },
            { status: 500 }
        );
    }
}



export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Authentication required" },
                { status: 401 }
            );
        }

        const response = await backendApiService.delete(`/cars/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return NextResponse.json(
            { message: response.data },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting car:', error);
        return NextResponse.json(
            { message: "An error occurred while deleting the car" },
            { status: 500 }
        );
    }
}