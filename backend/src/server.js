const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectionDB = require("./config/database");
// const router = require("./routes/MainRoutes");
const TodoRouter = require("./routes/TodoRouter");
const UserRouter = require("./routes/UserRouter");
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
ConnectionDB();

app.use(cors());
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("Client IP:", req.ip); // Logs the client's IP
//   console.log("X-Forwarded-For:", req.headers["x-forwarded-for"]); // Logs the forwarded IPs
//   next();
// });

app.use((req, res, next) => {
  async () => {
    if (mongoose.Types.ObjectId.isValid(req.user_id || req.todo_id)) {
      const user = await User.findById(id); // Mongoose handles the conversion
      console.log("User:", user);
    } else {
      console.error("Invalid ObjectId:", id);
    }
  };
  next();
});

app.use("/api", TodoRouter);
app.use("/api", UserRouter);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally log `reason.stack` if it's an error
});

app.use(function (req, res) {
  res.status(404).json({ status: "failure", message: "Not Found Any Route" });
});

app.listen(PORT, function () {
  console.log(`Server is listening at ${PORT}`);
});
