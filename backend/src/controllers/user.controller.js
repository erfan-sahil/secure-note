const createError = require("http-errors");
const { userModel } = require("../models/user.model");
const { generateAccessToken } = require("../helper/generateAccessToken");
const sendEmail = require("../helper/sendEmail");
const { baseURL } = require("../secret");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userData = {
      name,
      email,
      password,
    };

    const existUser = await userModel.exists({ email });

    if (existUser) {
      return next(createError(400, "User is already exist. Please login"));
    }

    const accessToken = await generateAccessToken(userData);

    const verificationLink = `${baseURL}/auth/verify/${accessToken}`;

    const emailForm = {
      to: email,
      subject: "Verify Your Email",
      text: `Please verify your email by clicking this link: ${verificationLink}`,
    };

    await sendEmail(emailForm, next);

    res
      .status(200)
      .json({ msg: "User verification email send", payload: accessToken });
  } catch (error) {
    next(error);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      next(createError(400, "Invalid page or limit"));
    }

    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(sanitizedSearch, "i");
      query.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    const users = await userModel
      .find(query)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await userModel.countDocuments(query);

    if (users.length === 0) {
      return next(createError(404, "No users available"));
    }

    const totalPages = Math.ceil(total / limit);
    const previousPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    res.status(200).json({
      success: true,
      message: "Users found successfully",
      payload: {
        users,
        pagination: {
          currentPage: page,
          limit: limit,
          totalPages: totalPages,
          previousPage: previousPage,
          nextPage: nextPage,
        },
      },
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
