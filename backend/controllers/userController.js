const User = require("../models/userModel");
async function getAllUsers(req, res) {
  const users = await User.find({ _id: { $ne: req.user.id } });
  res.status(200).json(users);
}

module.exports = { getAllUsers };
