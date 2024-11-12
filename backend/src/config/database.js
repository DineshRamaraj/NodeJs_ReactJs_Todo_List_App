const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_USER, DB_PASSWORD } = process.env;
// console.log("Env", process.env);

const ConnectionDB = () => {
  const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gfla9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  mongoose
    .connect(DB_URL)
    .then(function (connection) {
      console.log("DB Connected Successfully....");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectionDB;
