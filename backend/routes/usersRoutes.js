const express = require("express");
const authenticationMiddleware = require("../middlewares/authMiddleware");
const { getAllUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/", authenticationMiddleware, getAllUsers);
module.exports = router;
