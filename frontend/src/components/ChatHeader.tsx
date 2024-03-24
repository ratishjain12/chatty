import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const ChatHeader = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  return (
    <div className={"ch-container "}>
      <div className="left-header">
        <Avatar>U</Avatar>
        <div>
          <p>User</p>
          <p className="ch-status">Online</p>
        </div>
      </div>
      <IconButton>
        <DeleteIcon className={theme ? "dark" : ""} />
      </IconButton>
    </div>
  );
};
export default ChatHeader;
