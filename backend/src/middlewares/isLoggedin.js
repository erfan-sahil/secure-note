const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const isLoggedin = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(401, "No token, access denied"));
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!decoded) {
      return next(createError(401, "Invalid token"));
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createError(401, "Token has expired");
    }
    next(error);
  }
};

module.exports = {
  isLoggedin,
};
