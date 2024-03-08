import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
const ChatHeader = () => {
  return (
    <div className="ch-container">
      <div className="left-header">
        <Avatar>U</Avatar>
        <div>
          <p>User</p>
          <p className="ch-status">Online</p>
        </div>
      </div>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
export default ChatHeader;
