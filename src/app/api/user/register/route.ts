import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import bcryptjs from "bcryptjs";
connect();



export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const { name, email, password, role } = await req.json();

    try {
        const isUserAlreadyExist = await User.findOne({ email })
        if (isUserAlreadyExist) {
            return NextResponse.json({
                success: false,
                message: "user already exists! use another mail for register "
            })
        } else {
            const hashPassword = await bcryptjs.hash(password, 12);
            const newUser = await User.create({
                name, email, password: hashPassword, role
            })
            if (newUser) {
                return NextResponse.json({
                    success: true,
                    message: "Account created Successfully"
                })
            }
        }

    } catch (error: any) {
        return NextResponse.json({
            error: error,
            success: false,
            message: "error in creating new user"
        })
    }

}


