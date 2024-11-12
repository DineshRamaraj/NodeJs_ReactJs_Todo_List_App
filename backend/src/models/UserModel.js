const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_number: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    required: true,
  }
},{timestamps: true});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
