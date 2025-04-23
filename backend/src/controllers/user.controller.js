const registerUser = (req, res, next) => {
  res.status(200).json({ msg: "register user" });
};

module.exports = {
  registerUser,
};
