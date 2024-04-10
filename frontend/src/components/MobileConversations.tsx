import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { chatType } from "../types";
import ChatItem from "./ChatItem";
import axios from "axios";

const MobileConversations = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const [chats, setChats] = useState([]);
  const userId = localStorage.getItem("id");
  const fetchChats = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/chat/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setChats(response.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="mobile-conversation-container">
      <h2 className={"mobile-header " + (theme ? "dark" : "")}>Chats</h2>
      <div className={"mobile-conversation " + (theme ? "dark" : "")}>
        {chats?.map((chat: chatType) => {
          return (
            <ChatItem
              key={chat._id}
              id={chat._id}
              lastMessage={chat.lastMessage ? chat.lastMessage.content : ""}
              createdAt={chat.lastMessage ? chat.lastMessage.createdAt : ""}
              chatName={
                chat.chatName == "sender"
                  ? chat.users.find((user) => user._id != userId)?.username
                  : chat.chatName
              }
              isGroupChat={chat.isGroupChat}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MobileConversations;
