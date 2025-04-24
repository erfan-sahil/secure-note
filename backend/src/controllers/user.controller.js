const registerUser = (req, res, next) => {
  res.status(200).json({ msg: "register user" });
};
const getUsers = (req, res, next) => {
  res.status(200).json({ msg: "get user" });
};

module.exports = {
  registerUser,
  getUsers,
};
