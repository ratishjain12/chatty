import { Avatar, IconButton } from "@mui/material";
import "./styles.css";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const UsersGroups = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
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
          className={"searchbox " + (theme ? "dark" : "")}
        />
      </div>
      <div className="list-wrapper">
        {Array(12)
          .fill(0)
          .map((i, index) => {
            return (
              <div key={index} className={"list-tile " + (theme ? "dark" : "")}>
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
