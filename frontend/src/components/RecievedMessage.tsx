import { Avatar } from "@mui/material";
import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const RecievedMessage = ({
  name,
  message,
  time,
}: {
  name: string;
  message: string;
  time: string;
}) => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  return (
    <div className="recievedMessage-container">
      <Avatar>{name[0].toUpperCase()}</Avatar>
      <div className={"rm-box" + (theme ? "-dark" : "")}>
        <p className="rm-title">{name}</p>
        <p className="rm-message">{message}</p>
        <p className="rm-timestamp">
          {" "}
          {new Date(time).toLocaleTimeString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};
export default RecievedMessage;
