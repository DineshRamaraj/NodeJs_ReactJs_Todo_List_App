const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // console.log("level 1");
    const existUser = await UserModel.findOne({ email_id: email });

    // console.log("level 2");

    if (!existUser) {
      return res
        .status(404)
        .json({ status: "failure", message: "User Not Found" });
    }

    // console.log("level 3");

    const checkPassword = await bcrypt.compare(password, existUser.password);
    // console.log(checkPassword);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ status: "failure", message: "Invalid Password" });
    }
    
    // console.log("level 4");
    const payload = {
      user_id: existUser._id,
      username: existUser.name,
    };
    
    // console.log("level 5");

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });


    // console.log("level 6");
    return res.status(200).json({
      status: "success",
      message: "Login Success",
      jwt_token: jwtToken,
      user_id: existUser._id,
      user_name: existUser.name
    });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
};

module.exports = LoginUser;
