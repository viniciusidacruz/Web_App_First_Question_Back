require("dotenv").config();

const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [""],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/", router);

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.zki6u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT);
    console.log(`Connected with database Mongo DB`);
  })
  .catch((err) => console.log(err));
