const createError = require("http-errors");
const { userModel } = require("../models/user.model");

const registerUser = (req, res, next) => {
  res.status(200).json({ msg: "register user" });
};
const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      return next(createError(404, "No users available"));
    }

    res.status(200).json({
      success: true,
      message: "Users found successfully",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return next(createError(404, "User not available"));
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return next(createError(404, "User not available"));
    } else {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        return next(createError(404, "Cannot delete user. Please try again"));
      }
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  getUsers,
  getSingleUser,
  deleteUser,
};
