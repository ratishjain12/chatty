import { RootState } from "../redux/store";
import "./styles.css";
import { useSelector } from "react-redux";
const Welcome = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <img className="welcome-logo" src="/chat.png" />
        <p className={"welcome-title" + (theme ? "-dark" : "")}>
          Welcome to Chatty!
        </p>
        <p className={"welcome-slogan" + (theme ? "-dark" : "")}>
          View and text directly with the people in the chat room
        </p>
      </div>
    </div>
  );
};
export default Welcome;
