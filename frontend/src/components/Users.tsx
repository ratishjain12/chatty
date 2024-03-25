import { Avatar, IconButton } from "@mui/material";
import "./styles.css";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Users = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);

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
        {Array(12)
          .fill(0)
          .map((i) => {
            return (
              <div key={i} className={"list-tile " + (theme ? "dark" : "")}>
                <Avatar>T</Avatar>
                Test User
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Users;
