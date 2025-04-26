const { data } = require("../fakeData");
const { userModel } = require("../models/user.model");
const seedUser = async (req, res, next) => {
  try {
    const seedUser = await userModel.insertMany(data.users);
    console.log("seed user---------", seedUser);
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
