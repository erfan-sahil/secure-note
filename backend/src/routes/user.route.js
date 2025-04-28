const express = require("express");
const {
  registerUser,
  getUsers,
  getSingleUser,
  deleteUser,
  verifyUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify", verifyUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getSingleUser);
userRouter.delete("/:id", deleteUser);

module.exports = {
  userRouter,
};
