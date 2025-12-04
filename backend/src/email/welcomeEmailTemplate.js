import escapeHtml from "../utils/escapeHtml.js";

function welcomeEmailTemplate(name, clientUrl) {

  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(clientUrl);

  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 25px; border-radius: 8px;">
        <h2 style="color: #138d00ff; text-align: center;">Welcome to NodeTalk 🎉</h2>

        <p>Hi ${safeName},</p>

        <p>
          Welcome to <strong>NodeTalk</strong> — your new place for fast, secure, and real-time conversations!
          We're excited to have you on board.
        </p>

        <p>
          You can start exploring your dashboard and begin chatting by clicking the button below:
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${safeUrl}" 
             style="background: #138d00ff; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 16px;">
            Go to NodeTalk
          </a>
        </div>

        <p>
          If you didn't sign up for this account, you can safely ignore this email.
        </p>

        <br>
        <p>Best regards,<br><strong>The NodeTalk Team</strong></p>

        <hr style="margin-top: 30px;">
        <p style="font-size: 12px; text-align: center; color: #888;">
          © ${new Date().getFullYear()} NodeTalk. All rights reserved.
        </p>
      </div>
    </body>
  </html>
  `;
}

export{welcomeEmailTemplate}
