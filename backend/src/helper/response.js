const errorResponse = (res, { statusCode, errorMessage }) => {
  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};

module.exports = {
  errorResponse,
};
