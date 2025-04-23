const { mongodbURL } = require("../secret");
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongodbURL);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(`Could connect to the database Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
