import { Resend } from 'resend';
import { EMAIL_FROM, EMAIL_FROM_NAME, RESEND_API_KEY } from './env.js';
import { welcomeEmailTemplate } from '../email/welcomeEmailTemplate.js';

const resend = new Resend(RESEND_API_KEY);

const sendWelcomeEmail = async (email, name, clientUrl) => {
  try {
    const data = await resend.emails.send({
      from: `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
      to: email,
      subject: 'Welcome to NodeTalk',
      html: welcomeEmailTemplate(name, clientUrl),
    });

    console.log(`✅ Welcome email sent to ${email}`, data);

  } catch (error) {
    console.error(`❌ Failed to send welcome email to ${email}:`, error);
  }
};


export{sendWelcomeEmail}