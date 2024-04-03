const express = require("express");
const authenticationMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  searchUsers,
  searchGroups,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", authenticationMiddleware, getAllUsers);
router.get("/search", authenticationMiddleware, searchUsers);
router.get("/groupsearch", authenticationMiddleware, searchGroups);
module.exports = router;
