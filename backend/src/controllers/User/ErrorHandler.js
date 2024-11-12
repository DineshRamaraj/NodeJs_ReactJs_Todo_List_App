const ErrorHandler = async (req, res) => {
  res.status(404).json({
    status: "failure",
    message: "It is Not Correctly Working. I think that is Error",
  });
};

module.exports = ErrorHandler;
