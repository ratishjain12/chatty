import ChatHeader from "./ChatHeader";
import SendIcon from "@mui/icons-material/Send";
import "./styles.css";
import { IconButton } from "@mui/material";
import RecievedMessage from "./RecievedMessage";
import { SelfMessage } from "./SelfMessage";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const ChatArea = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth", // Use "auto" or "smooth" as per your preference
    });
  }, [chatContainerRef]);

  return (
    <div className="chatArea-container">
      <div className={"ca-header " + (theme ? "dark" : "")}>
        <ChatHeader />
      </div>

      <div
        className={"ca-messages " + (theme ? "dark" : "")}
        ref={chatContainerRef}
      >
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

      <div className={"ca-text " + (theme ? "dark" : "")}>
        <input placeholder="type a message" className={theme ? "dark" : ""} />
        <IconButton>
          <SendIcon className={theme ? "dark" : ""} />
        </IconButton>
      </div>
    </div>
  );
};
export default ChatArea;
