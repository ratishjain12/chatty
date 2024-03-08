import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./styles.css";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  AddCircle,
  GroupAdd,
  Nightlight,
  PersonAdd,
} from "@mui/icons-material";
import ChatItem from "./ChatItem";
import { useState } from "react";
import { chatType } from "../types";

const Sidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  return (
    <div className="sidebar">
      <div className="sb-header">
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <PersonAdd />
          </IconButton>
          <IconButton>
            <GroupAdd />
          </IconButton>
          <IconButton>
            <AddCircle />
          </IconButton>
          <IconButton>
            <Nightlight />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="search" className="searchbox" />
      </div>
      <div className="sb-conversations">
        {chats.map((chat, i) => {
          return <ChatItem key={i} {...chat} />;
        })}
      </div>
    </div>
  );
};
export default Sidebar;
