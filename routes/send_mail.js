const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "nikitaugale8080@gmail.com",
    pass: "your_app_password_here", // use app password
  },
});

async function sendMail(to_mail, subject, message) {
  const info = await transporter.sendMail({
    from: '"Nikita Ugale" <nikitaugale8080@gmail.com>',
    to: to_mail,
    subject: subject,
    text: message,
    html: message,
  });
  console.log("Message sent:", info.messageId);
}

module.exports = sendMail;
