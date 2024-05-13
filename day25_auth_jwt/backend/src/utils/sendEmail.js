import { google } from "googleapis"; // oauth and credentials
import nodemailer from "nodemailer"; // email senden
import dotenv from "dotenv";

dotenv.config();

const GMAIL_ADRESS = process.env.GMAIL_ADRESS;
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN; // OAUTH2 Refresh token

// oAuthClient erstellen mit credentials
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendEmail({ to, subject, text }) {
  try {
    // Step 0. get access token for sending email
    // get access Token based on oAuth2Clients credentials and refresh_token
    const accessToken = await oAuth2Client.getAccessToken(); // 1h gültig, wir verwenden ihn einfach nur 1 mal

    // 1. "email transporter"
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_ADRESS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken, // ändert sich bei jedem Versenden einer E-Mail
      },
    });

    // 2. send email
    const sentMessageInfo = await transporter.sendMail({
      from: "Ahmed from Todo.io",
      to, // geht auch mehr als eine person "email1@gmail.com, zwei@gmail.com, ..."
      subject,
      text,
      html: text.replaceAll("\n", "<br/>"),
    });

    const success = sentMessageInfo.accepted.includes(to); // wurde es and die "to"-Email verschickt?
    return success;
  } catch (error) {
    console.log(error);
    return false;
  }
}
