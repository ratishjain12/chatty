import { Avatar, IconButton } from "@mui/material";
import "./styles.css";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
const Users = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const [users, setUsers] = useState([]);
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
  console.log(users);
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
          className={"searchbox " + (theme ? "dark" : "")}
        />
      </div>
      <div className="list-wrapper">
        {users.map((i: any) => {
          return (
            <div key={i._id} className={"list-tile " + (theme ? "dark" : "")}>
              <Avatar>{i.username[0].toUpperCase()}</Avatar>
              {i.username}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Users;
