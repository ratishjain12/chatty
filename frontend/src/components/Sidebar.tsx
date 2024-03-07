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

const Sidebar = () => {
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
        <ChatItem />
      </div>
    </div>
  );
};
export default Sidebar;
