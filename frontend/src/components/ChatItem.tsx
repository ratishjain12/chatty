import { Avatar } from "@mui/material";
import { chatType } from "../types";
import "./styles.css";

const ChatItem = ({ name, lastMessage, timestamp }: chatType) => {
  return (
    <div className="sb-chatitem">
      <Avatar> {name[0]}</Avatar>
      <div>
        <p className="sb-name">{name}</p>
        <p className="sb-lastmessage">{lastMessage}</p>
      </div>
      <p className="sb-timestamp">{timestamp}</p>
    </div>
  );
};
export default ChatItem;
