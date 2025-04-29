const express = require("express");
const {
  registerUser,
  getUsers,
  getSingleUser,
  deleteUser,
  verifyUser,
  updateUser,
} = require("../controllers/user.controller");
const { isLoggedin } = require("../middlewares/isLoggedin");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify", verifyUser);
userRouter.get("/", isLoggedin, getUsers);
userRouter.get("/:id", isLoggedin, getSingleUser);
userRouter.delete("/:id", isLoggedin, deleteUser);
userRouter.put("/:id", isLoggedin, updateUser);

module.exports = {
  userRouter,
};
