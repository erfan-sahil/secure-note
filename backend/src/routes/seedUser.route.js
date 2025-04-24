const express = require("express");
const { seedUser } = require("../controllers/seedUser.controller");
const seedRouter = express.Router();

seedRouter.post("/", seedUser);

module.exports = {
  seedRouter,
};
