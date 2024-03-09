import { Avatar } from "@mui/material";
import "./styles.css";
const RecievedMessage = () => {
  const prop2 = { name: "Random", message: "this is a recieved message" };
  return (
    <div className="recievedMessage-container">
      <Avatar>{prop2.name[0]}</Avatar>
      <div className="rm-box">
        <p className="rm-title">{prop2.name}</p>
        <p className="rm-message">{prop2.message}</p>
        <p className="rm-timestamp">10:00 am</p>
      </div>
    </div>
  );
};
export default RecievedMessage;
