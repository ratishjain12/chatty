const {
  loginController,
  registerController,
} = require("../controllers/authControllers");

const express = require("express");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
