const UserModel = require("../../models/UserModel");

const UserActive = async (req, res, next) => {
  const { user_id } = req.params;
//   console.log("user_id : ", user_id);
  const isUser = await UserModel.findById(user_id);
    // console.log("isUser:", isUser);
  if (isUser) {
    next();
  } else {
    return res
      .status(401)
      .json({ status: "failure", message: "User Not Found" });
  }
};

module.exports = UserActive;
