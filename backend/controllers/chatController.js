const Chat = require("../models/chatModel");
const User = require("../models/userModel");
async function listAllChats(req, res) {
  const user = req.user;
  try {
    let chats = await Chat.find({ users: { $elemMatch: { $eq: user.id } } })
      .populate("users groupAdmin", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "lastMessage.sender",
      select: "username email name",
    });

    res.status(200).send(chats);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function accessChats(req, res) {
  const { userId } = req.body;

  //check if chat already exists and fetch the chat details along with users as
  //well as both users with the latest message along with sender of latest message
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("lastMessage");

  isChat = await User.populate(isChat, {
    path: "lastMessage.sender",
    select: "username email name",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // else create the chat with the user
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

async function createGroupChat(req, res) {
  const { name, users } = req.body;
  if (!name || !users) {
    return res.status(400).send({ message: "Please fill all the details" });
  }
  var usersArr = JSON.parse(users);
  if (usersArr.length < 2) {
    return res
      .status(400)
      .send({ message: "More than 2 users are required to make a group" });
  }

  usersArr.push(req.user.id);
  try {
    const groupChat = await Chat.create({
      chatName: name,
      isGroupChat: true,
      users: usersArr,
      groupAdmin: req.user.id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function exitGroupChat(req, res) {
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(400);
    throw new Error("Group Chat Not Found!!");
  } else {
    res.status(200).send(removed);
  }
}

async function renameGroupChat(req, res) {
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName) {
    res.status(400).send({ message: "missing details!!" });
  }

  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateChat) {
    res.status(400);
    throw new Error("Group Chat Not Found!!");
  } else {
    res.status(200).send(updateChat);
  }
}

async function groupAdd(req, res) {
  const { chatId, userId } = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(400);
    throw new Error("Group Chat Not Found!!");
  } else {
    res.status(200).send(added);
  }
}

module.exports = {
  listAllChats,
  accessChats,
  createGroupChat,
  exitGroupChat,
  renameGroupChat,
  groupAdd,
};
