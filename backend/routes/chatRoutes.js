const express = require("express");
const authenticationMiddleware = require("../middlewares/authMiddleware");
const {
  listAllChats,
  accessChats,
  createGroupChat,
  renameGroupChat,
  groupAdd,
  exitGroupChat,
  fetchAllGroups,
} = require("../controllers/chatController");
const router = express.Router();

router.get("/", authenticationMiddleware, listAllChats);
router.post("/", authenticationMiddleware, accessChats);
router.post("/group", authenticationMiddleware, createGroupChat);
router.put("/rename", authenticationMiddleware, renameGroupChat);
router.post("/groupadd", authenticationMiddleware, groupAdd);
router.post("/groupexit", authenticationMiddleware, exitGroupChat);
router.get("/groups", authenticationMiddleware, fetchAllGroups);
module.exports = router;
