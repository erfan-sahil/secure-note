require("dotenv").config();

const port = process.env.PORT;
const mongodbURL = process.env.MONGODB_URL;

const accessSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

module.exports = {
  port,
  mongodbURL,
  accessSecretKey,
};
