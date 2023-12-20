import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'aminul15-3832@diu.edu.bd',
      pass: 'dnxe eslk ijid ttyz',
    },
  });

  await transporter.sendMail({
    from: 'aminul15-3832@diu.edu.bd', // sender address
    to, // list of receivers
    subject:
      'PH-University Password Reset Link and Rewset your Password with in 10 minutes.', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
