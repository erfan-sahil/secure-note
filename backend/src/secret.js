require("dotenv").config();

const port = process.env.PORT;
const mongodbURL = process.env.MONGODB_URL;

const accessSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

const baseURL = process.env.BASE_URL;

const smtpName = process.env.SMTP_NAME;
const smtpPassword = process.env.SMTP_PASSWORD;

module.exports = {
  port,
  mongodbURL,
  accessSecretKey,
  smtpName,
  smtpPassword,
  baseURL,
};
