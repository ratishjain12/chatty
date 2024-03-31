const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
async function sendMessageController(req, res) {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "username email name");

    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      lastMessage: message,
    });
    res.json(message);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function allMessages(req, res) {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "username email name")
    .populate("chat");
  res.status(200).json(messages);
}

module.exports = { sendMessageController, allMessages };
