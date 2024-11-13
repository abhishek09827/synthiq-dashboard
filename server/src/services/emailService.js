global.Headers = class Headers {};

import dotenv from 'dotenv';
dotenv.config();

/**
 * Sends an email through Resend
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 */
export const sendEmail = async (to, subject, html) => {
    try {
        if (!html) {
          throw new Error("Email content (HTML) is missing");
        }
        console.log(to);
        
        const response = await fetch(`https://api.resend.com/emails`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer re_SHJbtSwU_Ht6VSJNeFGwCNJx6oacxEDgC`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.SEND_MAIL_ID,  // Ensure this is a valid email or domain configured with Resend
            to,
            subject,
            html,
          }),
        });
        const data = await response.json();
        console.log(data);
        
        if (data.error) {
          throw new Error(data.error.message);
        }
    
        console.log('Email sent successfully:', data);
        return data;
      } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Throw the error so that the controller can handle it
      }
    
};
