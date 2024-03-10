// import ChatArea from "./ChatArea";
import CreateGroups from "./CreateGroups";
import Sidebar from "./Sidebar";
// import Welcome from "./Welcome";
// import Workarea from "./Workarea";
import "./styles.css";
const MainContainer = () => {
  return (
    <div className="main-container">
      <Sidebar />
      {/* <Workarea /> */}
      {/* <ChatArea /> */}
      {/* <Welcome /> */}
      <CreateGroups />
    </div>
  );
};
export default MainContainer;
