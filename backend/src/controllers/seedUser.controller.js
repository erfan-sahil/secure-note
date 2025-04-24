const { userModel } = require("../models/user.model");
const users = require("../fakeData.js");
const seedUser = async (req, res, next) => {
  console.log(users);
  try {
    const seedUser = await userModel.insertMany(users);
    if (!seedUser) {
      return console.log("Cannot seed any user");
    }
    res.status(200).json({
      success: true,
      message: "Seeded users successfully",
      payload: seedUser,
    });
  } catch (error) {
    console.log("Cannot seed any user", error);
  }
};

module.exports = {
  seedUser,
};
