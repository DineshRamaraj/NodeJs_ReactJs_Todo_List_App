const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectionDB = require("./config/database");
const router = require("./routes/MainRoutes");
const TodoRouter = require("./routes/TodoRouter");
const UserRouter = require("./routes/UserRouter");
dotenv.config();
const { PORT } = process.env;
const app = express();
ConnectionDB();

app.use(cors());
app.use(express.json());

app.use("/api", TodoRouter);
app.use("/api", UserRouter);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally log `reason.stack` if it's an error
});

app.use(function (req, res) {
  res.status(404).json({ status: "failure", message: "Not Found" });
});

app.listen(PORT, function () {
  console.log(`Server is listening at ${PORT}`);
});
