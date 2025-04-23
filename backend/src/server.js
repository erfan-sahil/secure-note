const createError = require("http-errors");
const { app } = require("./app");
const { connectDB } = require("./config/db");
const { port } = require("./secret");

app.listen(port, async (req, res, next) => {
  try {
    await connectDB();
    console.log(`Server is running on port : ${port}`);
  } catch (error) {
    console.error(400, `Failed to start the server Error : ${error.message}`);
  }
});
