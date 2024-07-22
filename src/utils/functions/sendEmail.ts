import { Handler } from 'aws-lambda';
import nodemailer from 'nodemailer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  career: string;
}

export const handler: Handler = async (event) => {
  const { name, email, phone, career }: FormData = JSON.parse(event.body as string);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'elissafirstborn@gmail.com',
      pass: 'qiti rcjt pdtf amlt',
    },
  });

  const mailOptions = {
    from: email,
    to: 'elissafirstborn@gmail.com',
    subject: 'New Consultancy Request',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCareer: ${career}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error }),
    };
  }
};
