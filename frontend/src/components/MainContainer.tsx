import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "../redux/store";
const MainContainer = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  return (
    <div className={"main-container" + (theme ? "-dark" : "")}>
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default MainContainer;
