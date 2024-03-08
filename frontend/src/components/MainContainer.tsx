import ChatArea from "./ChatArea";
import Sidebar from "./Sidebar";
// import Workarea from "./Workarea";
import "./styles.css";
const MainContainer = () => {
  return (
    <div className="main-container">
      <Sidebar />
      {/* <Workarea /> */}
      <ChatArea />
    </div>
  );
};
export default MainContainer;
