import ChatHeader from "./ChatHeader";
import SendIcon from "@mui/icons-material/Send";
import "./styles.css";
import { IconButton } from "@mui/material";
const ChatArea = () => {
  return (
    <div className="chatArea-container">
      <div className="ca-header">
        <ChatHeader />
      </div>
      <div className="ca-messages">Chat Messages</div>
      <div className="ca-text">
        <input placeholder="type..." />
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default ChatArea;
