
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username, email, password} = await request.json()
        const exisistingUserVerifiedByUsername= await UserModel.findOne({
            username,
            isVerified: true
        })
        if(exisistingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "Username is already taken",
            }, {status: 400})
        }
        const exisistingUserByEmail = await UserModel.findOne({
            email
        })
        const verifyCode = Math.floor(100000+ Math.random()*900000).toString()
        if(exisistingUserByEmail){
            if(exisistingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exsist with this email"
                }, {status: 400})
            }else{
                const hasedPassword = await bcrypt.hash(password, 10)
                exisistingUserByEmail.password = hasedPassword
                exisistingUserByEmail.verifyCode = verifyCode
                exisistingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await exisistingUserByEmail.save()
            }
        }else{
            const hasedPassword = await bcrypt.hash(password, 10)
            const expirydate = new Date()
            expirydate.setHours(expirydate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: expirydate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()
        }

        //send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }

        return Response.json({
            success: true,
            message: "User registered sussessfully. Please verify your email"
        }, {status: 201})

    } catch (error) {
        console.error("Error registering user", error)
        return Response.json({
            success: false,
            message: "Error registering user"
        },{
            status: 500
        })
    }
}