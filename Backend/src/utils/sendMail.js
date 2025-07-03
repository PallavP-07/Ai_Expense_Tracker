import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_MAIL_KEY);
const senderMail = process.env.SENDER_MAIL_ID
export const sendWelcomeMail = async (name, email) => {
console.log(senderMail);
  return await resend.emails.send({
    from: `${senderMail}`,
    to: `${email}`,
    subject: "🎉 Welcome to Our Platform!",
    html: `<h1>Welcome, ${name}!</h1><p>Thanks for joining our platform.</p>`,
  });
};
