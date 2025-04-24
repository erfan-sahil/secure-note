const createError = require("http-errors");
const { userModel } = require("../models/user.model");

const registerUser = (req, res, next) => {
  res.status(200).json({ msg: "register user" });
};
const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      return next(createError(404, "No users found"));
    }

    res.status(200).json({
      success: true,
      message: "Users found successfully",
      payload: users,
    });
  } catch (error) {
    next(createError(400, "Cannot get users"));
  }
};

module.exports = {
  registerUser,
  getUsers,
};
