const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SkillSwap API is running",
  });
});

module.exports = app;