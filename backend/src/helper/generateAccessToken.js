const { accessSecretKey } = require("../secret");
const jwt = require("jsonwebtoken");
const generateAccessToken = (userData) => {
  try {
    const accessToken = jwt.sign(userData, accessSecretKey, {
      expiresIn: "1h",
    });
    if (!accessToken) {
      throw Error("Invalid secret key");
    }
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateAccessToken,
};
