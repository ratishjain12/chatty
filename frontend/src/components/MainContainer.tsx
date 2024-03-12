import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./styles.css";
const MainContainer = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default MainContainer;
