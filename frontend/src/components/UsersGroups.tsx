import { Avatar, IconButton } from "@mui/material";
import "./styles.css";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { chatType } from "../types";
const UsersGroups = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const fetchGroups = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/chat/groups?groupName=${search}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setGroups(response.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search !== "") {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/groupsearch?groupName=${search}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setGroups(response.data);
      } else {
        fetchGroups();
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <div className="list-container">
      <div className={"list-header " + (theme ? "dark" : "")}>
        <img src="/icon.png" alt="logo" />
        Available Groups
      </div>
      <div className={"list-search " + (theme ? "dark" : "")}>
        <IconButton>
          <Search className={theme ? "dark" : ""} />
        </IconButton>
        <input
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={"searchbox " + (theme ? "dark" : "")}
        />
      </div>
      <div className="list-wrapper">
        {groups.map((i: chatType) => {
          return (
            <div
              key={i._id}
              className={"list-tile " + (theme ? "dark" : "")}
              style={{ cursor: "pointer" }}
            >
              <Avatar>{i.chatName[0].toUpperCase()}</Avatar>
              {i.chatName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UsersGroups;
