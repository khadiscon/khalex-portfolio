import express from 'express';
import { Resend } from 'resend';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  const { from_name, from_email, project_type, message } = req.body;

  if (!from_name || !from_email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      // ⚠️ PRODUCTION REQUIRED: Replace 'onboarding@resend.dev' with a verified sender domain
      // e.g. 'noreply@yourdomain.com'. The sandbox address only delivers to your own Resend account email.
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: 'khadisconkhadiscon@gmail.com',
      replyTo: from_email,
      subject: `New Project Inquiry: ${project_type || 'General'}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${from_name}</p>
        <p><strong>Email:</strong> ${from_email}</p>
        <p><strong>Project Type:</strong> ${project_type || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
