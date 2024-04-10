import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ExitToApp } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ChatHeader = ({
  id,
  name,
  isGroupChat,
}: {
  id: string;
  name: string;
  isGroupChat: boolean;
}) => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const exitGroupChat = async (id: string) => {
    const valid = confirm("Are you sure you want to to exit from the group?");
    if (valid) {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/groupexit`,
        {
          chatId: id,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("exited from the group");
        navigate("/app");
        location.reload();
      }
    }
  };
  const deleteChat = async (id: string) => {
    const valid = confirm("Are you sure you want to delete this chat?");
    if (valid) {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/deletechat`,
        {
          chatId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("chat deleted");
        navigate("/app");
        location.reload();
      }
    }
  };
  return (
    <div className={"ch-container "}>
      <div className="left-header">
        <Avatar>{name[0].toUpperCase()}</Avatar>
        <div>
          <p>{name}</p>
          <p className="ch-status">Online</p>
        </div>
      </div>
      {isGroupChat == true ? (
        <IconButton onClick={() => exitGroupChat(id)}>
          <ExitToApp className={theme ? "dark" : ""} />
        </IconButton>
      ) : (
        <IconButton onClick={() => deleteChat(id)}>
          <DeleteIcon className={theme ? "dark" : ""} />
        </IconButton>
      )}
    </div>
  );
};
export default ChatHeader;
