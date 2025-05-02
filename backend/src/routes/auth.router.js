const { userLogin } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", userLogin);

module.exports = {
  authRouter,
};
