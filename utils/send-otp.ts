import nodemailer  from "nodemailer"

export const sendOtp = async(email: string, otp: string) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "samigullayevlutfulla@gmail.com",
                pass: process.env.APP_PASS
            }
        })
        await transport.sendMail({
            from: "samigullayevlutfulla@gmail.com",
            to:email,
            subject: "Exclusive",
            text: "Verification code from exclusive",
            html: `<p style="font-size: 24px">Verify code: <strong style="color: green">${otp}</strong></p>`
        })
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Unknown error occurred");
    }
}