import ChatHeader from "./ChatHeader";
import SendIcon from "@mui/icons-material/Send";
import "./styles.css";
import { IconButton } from "@mui/material";
import RecievedMessage from "./RecievedMessage";
import { SelfMessage } from "./SelfMessage";
import { useRef, useEffect, useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { messageType } from "../types";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const endpoint = import.meta.env.VITE_BACKEND_URL;
let socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  selectedChatCompare: string;
const ChatArea = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const { state } = useLocation();
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth", // Use "auto" or "smooth" as per your preference
    });
  }, [chatContainerRef, messages]);

  const fetchMessages = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/message/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setMessages(response.data);
  };

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const newMessage = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/message`,
      {
        chatId: id,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setContent("");

    socket.emit("new message", newMessage.data);
    setMessages([...messages, newMessage.data]);
  };
  useEffect(() => {
    fetchMessages();

    selectedChatCompare = state.id;
  }, [id]);

  useEffect(() => {
    socket = io(endpoint, {
      reconnection: true,
      reconnectionAttempts: 5,
    });
    socket.on("connect", function () {
      socket.emit("setup", userId);
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: messageType) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageRecieved.chat._id
      ) {
        return;
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <div className="chatArea-container">
      <div className={"ca-header " + (theme ? "dark" : "")}>
        <ChatHeader
          id={state.id}
          name={state.name}
          isGroupChat={state.isGroupChat}
        />
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
      <form>
        <div className={"ca-text " + (theme ? "dark" : "")}>
          <input
            placeholder="type a message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={theme ? "dark" : ""}
          />
          <IconButton onClick={sendMessage} type="submit">
            <SendIcon className={theme ? "dark" : ""} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};
export default ChatArea;
