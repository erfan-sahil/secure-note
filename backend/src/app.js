const express = require("express");
const app = express();
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);
app.use(helmet());
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("Test Secure note app");
  console.log("Test Secure note app");
});

module.exports = {
  app,
};
