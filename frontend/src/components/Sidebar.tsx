import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./styles.css";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
import { useState } from "react";
import { chatType } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { toggle } from "../redux/slices/themeSlice";
import Cookies from "js-cookie";

const Sidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const [chats, setChats] = useState<chatType[]>([
    {
      name: "Test1",
      lastMessage: "last message 1",
      timestamp: "today",
    },
    {
      name: "Test2",
      lastMessage: "last message 2",
      timestamp: "today",
    },
    {
      name: "Test2",
      lastMessage: "last message 2",
      timestamp: "today",
    },
  ]);

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };
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
      <div className={"sb-search " + (theme ? "dark" : "")}>
        <IconButton>
          <SearchIcon className={theme ? "dark" : ""} />
        </IconButton>
        <input
          placeholder="search"
          className={"searchbox " + (theme ? "dark" : "")}
        />
      </div>
      <div className={"sb-conversations " + (theme ? "dark" : "")}>
        {chats.map((chat, i) => {
          return <ChatItem key={i} {...chat} />;
        })}
      </div>
    </div>
  );
};
export default Sidebar;
