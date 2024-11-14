import { NextRequest, NextResponse } from "next/server";

import { backendApiService } from "@/app/services/backend.service";

export async function POST(request:NextRequest) {

    try{
        const reqBody = await request.json()

        const {username,email, password} = reqBody;

        console.log(reqBody);

        const response = await backendApiService.post('/auth/signup', {

            username,

            email,

            password

        });



        if (response.status === 201) {

            // Create the response

            const resp = NextResponse.json(

                { message: 'User created successfully' },

                { status: 201 }

            )
            return resp;

        } else {

            return NextResponse.json({ message: 'Failed to create user' }, { status: response.status });

        }





    } catch (error) {

        console.error(error);

        return NextResponse.error();

    }

}
