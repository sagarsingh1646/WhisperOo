import VerificationEmail from "../../emails/verificationEmail";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'WhisperOo Verification Code',
            react: VerificationEmail({username, otp: verifyCode})
        })
        return {success:true, message: 'Verification email send successfully'}
    } catch (emailError){
        console.log("Error sending verfication email", emailError)
        return {success:false, message: 'Failed to send verifcation email'}
    }
}