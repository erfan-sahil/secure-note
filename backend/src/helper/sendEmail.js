// utils/sendEmail.js
const nodemailer = require("nodemailer");
const { smtpName, smtpPassword } = require("../secret");
const createHttpError = require("http-errors");

const sendEmail = async (emailForm, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: smtpName,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: smtpName,
      to: emailForm.to,
      subject: emailForm.subject,
      text: emailForm.text,
    });
  } catch (err) {
    return next(createHttpError(400, `Failed to send email, ${err}`));
  }
};

module.exports = sendEmail;
