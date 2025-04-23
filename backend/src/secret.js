require("dotenv").config();

const port = process.env.PORT;
const mongodbURL = process.env.MONGODB_URL;

module.exports = {
  port,
  mongodbURL,
};
