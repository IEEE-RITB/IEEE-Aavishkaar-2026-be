import nodemailer from 'nodemailer';
import { RegistrationType } from '../schemas/registration.schema';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Use App Password here
  },
});

const getRetroHtml = (leadName: string, teamName: string) => `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    /* Dark Mode specific overrides */
    @media (prefers-color-scheme: dark) {
      .body-wrap { background-color: #1a0f0a !important; }
      .container { background-color: #f97316 !important; border-color: #ffffff !important; }
      .header { background-color: #ffffff !important; color: #f97316 !important; }
      .content, .footer { color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF7ED;">
  <div class="body-wrap" style="background-color: #FFF7ED; padding: 30px; font-family: 'Courier New', Courier, monospace;">
    <div class="container" style="max-width: 550px; margin: 0 auto; background-color: #FB923C; border: 6px solid #431407; box-shadow: 14px 14px 0px #431407; padding: 30px;">
      
      <div class="header" style="background-color: #431407; color: #FFFFFF; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
        REGISTRATION LOGGED
      </div>

      <div class="content" style="color: #000000; line-height: 1.6; margin-top: 25px;">
        <p style="font-size: 20px; margin-bottom: 10px; font-weight: 900;">HOLA, ${leadName.toUpperCase()}!</p>
        <p style="font-weight: bold;">We’ve received your registration. Your squad is officially in the bracket:</p>
        
        <div style="background-color: #000000; color: #FB923C; padding: 12px; margin: 20px 0; font-weight: 900; text-align: center; border: 2px solid #FFFFFF;">
          TEAM: ${teamName.toUpperCase()}
        </div>
        
        <p style="font-weight: bold;">Stay tuned for the next signal. Keep your gear ready and your spirits high.</p>
      </div>
    </div>
    
    <div class="footer" style="text-align: center; margin-top: 30px; font-size: 12px; color: #431407; font-weight: bold; letter-spacing: 1px;">
      // 2026 TECHFEST RITB //
    </div>
  </div>
</body>
</html>
`;

export const sendWelcomeEmail = async (data: RegistrationType) => {
  try {
    const info = await transporter.sendMail({
      from: `"IEEE RITB" <${process.env.SMTP_USER}>`,
      to: data.leadEmail,
      subject: `Registration Confirmed: ${data.teamName}`,
      html: getRetroHtml(data.leadName, data.teamName),
    });
    return info;
  } catch (error) {
    console.log(error);
    return null;
  }
};