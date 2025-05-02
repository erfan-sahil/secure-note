const { userLogin, userLogout } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);

module.exports = {
  authRouter,
};
