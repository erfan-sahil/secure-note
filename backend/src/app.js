const express = require("express");
const app = express();
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const createError = require("http-errors");
const { errorResponse } = require("./helper/response");
const { userRouter } = require("./routes/user.route");
const { seedRouter } = require("./routes/seedUser.route");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(express.json());
app.use(express.urlencoded());
app.use(limiter);
app.use(helmet());
app.use(morgan("dev"));

//routers
app.use("/api/v1/seed", seedRouter);
app.use("/api/v1/user", userRouter);

app.get("/test", (req, res) => {
  res.send("Test Secure note app");
  console.log("Test Secure note app");
});

//client error
app.use((req, res, next) => {
  createError(404, "Route not found");
  next();
});
//server error
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    errorMessage: err.message,
  });
});
module.exports = {
  app,
};
