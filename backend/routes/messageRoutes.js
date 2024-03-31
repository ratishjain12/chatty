const express = require("express");
const authenticationMiddleware = require("../middlewares/authMiddleware");
const {
  sendMessageController,
  allMessages,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/", authenticationMiddleware, sendMessageController);
router.get("/:chatId", authenticationMiddleware, allMessages);

module.exports = router;
