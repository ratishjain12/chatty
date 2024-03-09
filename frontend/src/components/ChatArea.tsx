import ChatHeader from "./ChatHeader";
import SendIcon from "@mui/icons-material/Send";
import "./styles.css";
import { IconButton } from "@mui/material";
import RecievedMessage from "./RecievedMessage";
import { SelfMessage } from "./SelfMessage";
import { useRef, useEffect } from "react";
const ChatArea = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth", // Use "auto" or "smooth" as per your preference
    });
  }, [chatContainerRef]);

  return (
    <div className="chatArea-container">
      <div className="ca-header">
        <ChatHeader />
      </div>

      <div className="ca-messages" ref={chatContainerRef}>
        <div className="ca-message-container">
          <RecievedMessage />
          <SelfMessage />
          <RecievedMessage />
          <SelfMessage />
          <RecievedMessage />
          <SelfMessage />
          <SelfMessage />
          <RecievedMessage />
          <SelfMessage />
        </div>
      </div>

      <div className="ca-text">
        <input placeholder="type a message" />
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default ChatArea;
