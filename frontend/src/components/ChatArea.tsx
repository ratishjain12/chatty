import ChatHeader from "./ChatHeader";
import SendIcon from "@mui/icons-material/Send";
import "./styles.css";
import { IconButton } from "@mui/material";
import RecievedMessage from "./RecievedMessage";
import { SelfMessage } from "./SelfMessage";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { messageType } from "../types";
const ChatArea = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const { state } = useLocation();
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth", // Use "auto" or "smooth" as per your preference
    });
  }, [chatContainerRef]);

  const fetchMessages = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/message/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    setMessages(response.data);
  };

  const sendMessage = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/message`,
      {
        chatId: id,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setContent("");
    fetchMessages();
  };
  useEffect(() => {
    fetchMessages();
  }, [id]);

  return (
    <div className="chatArea-container">
      <div className={"ca-header " + (theme ? "dark" : "")}>
        <ChatHeader name={state.name} />
      </div>

      <div
        className={"ca-messages " + (theme ? "dark" : "")}
        ref={chatContainerRef}
      >
        <div className="ca-message-container">
          {messages.map((message: messageType) => {
            return (
              <div key={message._id}>
                {message.sender._id === userId ? (
                  <SelfMessage
                    message={message.content}
                    time={message.createdAt}
                  />
                ) : (
                  <RecievedMessage
                    name={message.sender.username}
                    message={message.content}
                    time={message.createdAt}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={"ca-text " + (theme ? "dark" : "")}>
        <input
          placeholder="type a message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={theme ? "dark" : ""}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon className={theme ? "dark" : ""} />
        </IconButton>
      </div>
    </div>
  );
};
export default ChatArea;
