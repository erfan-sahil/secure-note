const mongoose = require("mongoose");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 character"],
      maxlenght: [30, "Name should be less than 30 character"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          return emailRegex.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [6, "Name must be at least 6 character"],
      validate: {
        validator: function (v) {
          return passwordRegex.test(v);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      },
      set: (v) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(v, salt);
      },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
