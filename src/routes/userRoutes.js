const express = require("express");

const {
  signUp,
  signIn,
  verifyToken,
  getToken,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", (request, response, next) => {
  response.send("Route public is running");
});

router.post("/signUp", signUp);

router.post("/signIn", signIn);

router.get("/user", verifyToken, getToken);

module.exports = router;
