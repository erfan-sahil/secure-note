const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const isLoggedout = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (decoded) {
      return next(createError(403, "Your are already logged in"));
    }
  } catch (error) {
    return ext(error);
  }
};

module.exports = {
  isLoggedout,
};
