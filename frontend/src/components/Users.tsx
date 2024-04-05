import { Avatar, IconButton } from "@mui/material";
import "./styles.css";
import { Search, Send } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const fetchUsers = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search !== "") {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/search?username=${search}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setUsers(response.data);
      } else {
        fetchUsers();
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const navigate = useNavigate();
  const createChat = async (id: string) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/chat/`,
      {
        userId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (response.status === 200) {
      navigate(`/app/chat/${response.data._id}`, {
        state: {
          id: response.data._id,
          name:
            response.data.chatName == "sender"
              ? response.data.users.find((user: User) => user._id === id)
                  ?.username
              : response.data.chatName,
          isGroupChat: response.data.isGroupChat,
        },
      });
    }
  };

  return (
    <div className="list-container">
      <div className={"list-header " + (theme ? "dark" : "")}>
        <img src="/icon.png" alt="logo" />
        Online Users
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
        {users.map((i: User) => {
          return (
            <div key={i._id} className={"list-tile " + (theme ? "dark" : "")}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Avatar>{i.username[0].toUpperCase()}</Avatar>
                {i.username}
              </div>
              <IconButton onClick={() => createChat(i._id)}>
                <Send className={theme ? "dark" : ""} />
              </IconButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Users;
