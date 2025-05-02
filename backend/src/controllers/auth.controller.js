const userLogin = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User found successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
const userLogout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User found successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
  userLogout,
};
