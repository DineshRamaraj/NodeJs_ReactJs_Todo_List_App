const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const RegisterUser = async (req, res) => {
  // console.log("Level1");
  // console.log(req.body);
  const { name, email, mobileNumber, password, confirmPassword } = req.body;
  // console.log(req.body);
  try {
    if (name.length < 3) {
      throw new Error("Name must be at least 3 characters long.");
    }
    if (password !== confirmPassword) {
      throw new Error("Password Mismatched");
    }
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,20}$/
      )
    ) {
      throw new Error(
        "Password must include uppercase, lowercase, a number, and a special character."
      );
    }
    if (mobileNumber.length !== 10) {
      throw new Error("Invalid mobile number. It should be 10 digits long.");
    }

    const existUser = await UserModel.findOne({ email_id: email });
    // console.log(existUser);

    // if(existUser){
    //     console.log("I am Comimg From Error");
    // }

    if (existUser) {
      return res
        .status(409)
        .json({ status: "failure", message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await UserModel.create({
      name,
      email_id: email,
      mobile_number: mobileNumber,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ status: "success", message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
};

module.exports = RegisterUser;
