import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const ChatHeader = ({ name }: { name: string }) => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  return (
    <div className={"ch-container "}>
      <div className="left-header">
        <Avatar>{name[0].toUpperCase()}</Avatar>
        <div>
          <p>{name}</p>
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
