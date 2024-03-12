import { Avatar, IconButton } from "@mui/material";
import "./styles.css";
import { Search } from "@mui/icons-material";
const UsersGroups = () => {
  return (
    <div className="list-container">
      <div className="list-header">
        <img src="/icon.png" alt="logo" />
        Available Groups
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
          .map((i, index) => {
            return (
              <div key={index} className="list-tile">
                <Avatar>T</Avatar>
                Group #{index + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default UsersGroups;
