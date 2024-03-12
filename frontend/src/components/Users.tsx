import { Avatar, IconButton } from "@mui/material";
import "./styles.css";
import { Search } from "@mui/icons-material";
const Users = () => {
  return (
    <div className="list-container">
      <div className="list-header">
        <img src="/icon.png" alt="logo" />
        Online Users
      </div>
      <div className="list-search">
        <IconButton>
          <Search />
        </IconButton>
        <input placeholder="search" className="searchbox" />
      </div>
      <div className="list-wrapper">
        {Array(12)
          .fill(0)
          .map((i) => {
            return (
              <div key={i} className="list-tile">
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
