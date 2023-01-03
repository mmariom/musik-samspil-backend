
const mailgun = require("mailgun-js");

export async function sendResetEmail({email, token}) {
  const mg = mailgun({apiKey: process.env.EMAIL_API_KEY, domain: process.env.EMAIL_URL});
    const link = `${process.env.BASE_URL}/updatePassword/${email}/${token.token}`;
    const msg = {
        to: email,
        from: process.env.FROM_EMAIL, // Change to your verified sender
        subject: 'Reset password link',
        text: `Hello,
        Below is the password reset link:
        
        ${link}`
      }

      try {
        await mg.messages().send(msg)
        console.log(`Reset email to ${email} is sent`)
      } catch (e) {
        console.error(e)
        throw e
      }
}