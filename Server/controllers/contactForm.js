import { normalizeText, normalizeEmail } from "../utils/inputFields.js";
import transporter from "../config/nodemailer.js";

const submitContactForm = async (request, response) => {
    try {
        const username = normalizeText(request.body.name);
        const email = normalizeEmail(request.body.email);
        const message = normalizeText(request.body.message);

        if (!username || !email || !message) {
            return response.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const emailTemplate = {
            from: `"Portfolio Contact" <${process.env.SENDER_EMAIL}>`,
            to: process.env.RECIPIENT_EMAIL,
            replyTo: email,
            subject: `Portfolio Contact: Message from ${username}`,
            html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #111;">
          <h2>New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${username}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #000;">
            ${message}
          </blockquote>
        </div>
      `,
        };

        await transporter.sendMail(emailTemplate);

        return response.status(200).json({
            success: true,
            message: "Contact form submitted successfully",
        });
    } catch (error) {
        console.error("Error in contact form:", error);
        return response.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export default submitContactForm;