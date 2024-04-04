import { Avatar, IconButton } from "@mui/material";
import "./styles.css";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types";
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Users;
