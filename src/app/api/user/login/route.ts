import User from "@/models/UserModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import connect from "@/dbConfig/dbConfig";

connect()
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()
    try {
        const valid = await User.findOne({ email })
        console.log("message:",valid)
        if (valid) {
            const isValidated = await bcryptjs.compare(password, valid.password)
            if (!isValidated) {
                return NextResponse.json({
                    success: false,
                    message: 'Invalid Password'
                })
            }
            const token = jwt.sign({
                id: valid._id,
                email: valid?.email,
                role: valid?.role
            }, "thequicklittlefoxjumpsoverthelazydogs", { expiresIn: '1d' })
            const finalResult = {
                token,
                user: {
                    email: valid.email,
                    name: valid.name,
                    _id: valid.id,
                    role: valid.role
                }
            }
            console.log('login successful')
            return NextResponse.json({
                success: true,
                message: "login Successful",
                finalResult
            })

        }
        return NextResponse.json({
            success: false,
            message: "error in login with the given credentials"
        })




    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "error in login with the given credentials"
        })
    }
}