import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./styles.css";
import { IconButton } from "@mui/material";
import {
  AddCircle,
  ChatSharp,
  GroupAdd,
  LightMode,
  Logout,
  Nightlight,
  PersonAdd,
} from "@mui/icons-material";
import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import { chatType } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { toggle } from "../redux/slices/themeSlice";
import Cookies from "js-cookie";
import axios from "axios";

const Sidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const [chats, setChats] = useState([]);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("id");
    dispatch(toggle());
    navigate("/");
  };

  const fetchChats = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/chat/`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setChats(response.data);
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="sidebar">
      <div className={"sb-header " + (theme ? "dark" : "")}>
        <div>
          <IconButton>
            <AccountCircleIcon className={theme ? "dark" : ""} />
          </IconButton>
        </div>
        <div className="icons">
          <IconButton
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAdd className={theme ? "dark" : ""} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("groups");
            }}
          >
            <GroupAdd className={theme ? "dark" : ""} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-group");
            }}
          >
            <AddCircle className={theme ? "dark" : ""} />
          </IconButton>

          <IconButton
            className="chatbubble"
            onClick={() => {
              navigate("");
            }}
          >
            <ChatSharp className={theme ? "dark" : ""} />
          </IconButton>
          <IconButton onClick={() => dispatch(toggle())}>
            {!theme && <Nightlight />}
            {theme && <LightMode className={theme ? "dark" : ""} />}
          </IconButton>
          <IconButton
            onClick={() => {
              handleLogout();
            }}
          >
            <Logout className={theme ? "dark" : ""} />
          </IconButton>
        </div>
      </div>

      <div className={"sb-conversations " + (theme ? "dark" : "")}>
        {chats?.map((chat: chatType) => {
          return (
            <ChatItem
              key={chat._id}
              id={chat._id}
              lastMessage={chat.lastMessage ? chat.lastMessage.content : ""}
              createdAt={chat.lastMessage ? chat.lastMessage.createdAt : ""}
              chatName={
                chat.chatName == "sender"
                  ? chat.users.find((user) => user._id != userId)?.username
                  : chat.chatName
              }
              isGroupChat={chat.isGroupChat}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
