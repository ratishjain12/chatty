const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
    },
    isGroupChat: {
      type: Boolean,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
chatSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // Remove message associated with the chat
      if (this.message) {
        await mongoose.model("Message").findByIdAndDelete(this.message);
      }
      // Remove lastMessage associated with the chat
      if (this.lastMessage) {
        await mongoose.model("Message").findByIdAndDelete(this.lastMessage);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);
const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
