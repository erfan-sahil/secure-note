const express = require("express");
const {
  registerUser,
  getUsers,
  getSingleUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getSingleUser);

module.exports = {
  userRouter,
  getUsers,
};
