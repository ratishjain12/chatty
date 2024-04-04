import { Add, Close, DoneOutlineRounded, Search } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { User } from "../types";
import toast from "react-hot-toast";

const CreateGroups = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [userslist, setUsersList] = useState<string[]>([]);
  const [tabs, setTabs] = useState<User[]>([]);
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

  const addToUsersList = (id: string, user: User) => {
    const findEle = tabs.find((u: User) => u._id === id);
    console.log(findEle);
    if (findEle) {
      return;
    }
    setUsersList((prev: string[]) => {
      return [...prev, id];
    });
    setTabs((prev: User[]) => {
      return [...prev, user];
    });
  };

  const removeTab = (id: string) => {
    setUsersList((prev: string[]) => {
      return prev.filter((u: string) => u !== id);
    });

    setTabs((prev: User[]) => {
      return prev.filter((u: User) => u._id !== id);
    });
  };

  const createGroup = async () => {
    if (groupName === "") {
      toast.error("please Enter a group name");
      return;
    }
    if (userslist.length < 2) {
      toast.error("Group must have more than 2 members");
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/chat/group`,
      {
        name: groupName,
        users: JSON.stringify(userslist),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Group created!!");
    }
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
    <div className="cg-container">
      <div className="cg-box">
        <input
          placeholder="Enter name of the group"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <IconButton onClick={createGroup}>
          <DoneOutlineRounded />
        </IconButton>
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
      <div className="tab-list">
        {tabs.map((tab) => {
          return (
            <div className={"tooltip " + (theme ? "dark" : "")}>
              <p>{tab.username}</p>
              <IconButton>
                <Close
                  className={theme ? "dark" : ""}
                  onClick={() => removeTab(tab._id)}
                />
              </IconButton>
            </div>
          );
        })}
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

              <div>
                <IconButton onClick={() => addToUsersList(i._id, i)}>
                  <Add className={theme ? "dark" : ""} />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CreateGroups;
