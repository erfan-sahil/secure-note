const express = require("express");
const {
  registerUser,
  getUsers,
  getSingleUser,
  deleteUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getSingleUser);
userRouter.delete("/:id", deleteUser);

module.exports = {
  userRouter,
};
