const User = require("../models/userModel");
const Chat = require("../models/chatModel");
async function getAllUsers(req, res) {
  const users = await User.find({ _id: { $ne: req.user.id } });
  res.status(200).json(users);
}

async function searchUsers(req, res) {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Please provide username" });
  }

  try {
    // Use regex to search for usernames that match the query
    const regex = new RegExp(username, "i");
    const matchedUsers = await User.find({
      username: regex,
      _id: { $ne: req.user.id },
    });
    res.json(matchedUsers);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function searchGroups(req, res) {
  const { groupName } = req.query;
  if (!groupName) {
    return res.status(400).json({ error: "Please provide group name" });
  }

  try {
    // Use regex to search for usernames that match the query
    const regex = new RegExp(groupName, "i");
    const matchedUsers = await Chat.find({
      chatName: regex,
      isGroupChat: true,
    });
    res.json(matchedUsers);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { getAllUsers, searchUsers, searchGroups };
