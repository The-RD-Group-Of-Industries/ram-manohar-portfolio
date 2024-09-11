/**
 * Handles POST requests to the /api/send-email endpoint.
 * Sends an email using the provided form data.
 *
 * @param request - The NextRequest object containing the form data.
 * @returns A NextResponse with a success or error message.
 */
import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer';

// Handles POST requests to /api/send-email
export async function POST(request: NextRequest) {
    const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: password
        }
    });

    try {
        const formData = await request.formData();
        const fname = formData.get('fname');
        const lname = formData.get('lname');
        const email = formData.get('email');
        const phoneno = formData.get('phoneno');
        const message = formData.get('message');

        const mailOptions:any = {
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `Protfolio Someone  Contact you `,
            html: `
                <p>Mr./Mrs/Miss  ${fname} ${lname}</p>
                <p>Email  : ${email}</p>
                <p>Phone Number: ${phoneno}</p>
                <p>Message: ${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Success: email was sent" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
    }
}
