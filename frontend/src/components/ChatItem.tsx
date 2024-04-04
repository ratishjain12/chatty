import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ChatItem = ({
  id,
  chatName,
  lastMessage,
  createdAt,
}: {
  id: string;
  chatName?: string;
  lastMessage?: string;
  createdAt?: string;
}) => {
  const navigate = useNavigate();

  function getTimeDifferenceFromNow(createdAt: string): string {
    const createdAtDate = new Date(createdAt);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdAtDate.getTime();
    const secondsDifference = timeDifference / 1000;

    if (secondsDifference < 24 * 60 * 60) {
      // Calculate hours passed
      const hoursPassed = Math.floor(secondsDifference / (60 * 60));
      if (hoursPassed > 0) {
        return `${hoursPassed} hour${hoursPassed > 1 ? "s" : ""} ago`;
      }

      const minutesPassed = Math.floor(secondsDifference / 60);
      if (minutesPassed > 0) {
        return `${minutesPassed} minute${minutesPassed > 1 ? "s" : ""} ago`;
      }

      return `${Math.floor(secondsDifference)} second${
        secondsDifference > 1 ? "s" : ""
      } ago`;
    } else if (secondsDifference < 24 * 60 * 60 * 2) {
      // If 24 hours or more have passed, display "Yesterday"
      return "Yesterday";
    } else {
      // If more than 24 hours have passed, display the date
      return createdAtDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }
  return (
    <div
      className="sb-chatitem"
      onClick={() => {
        navigate(`chat/${id}`, {
          state: {
            name: chatName,
          },
        });
      }}
    >
      <Avatar> {chatName![0]}</Avatar>
      <div className="chatItem-container">
        <div>
          <p className="sb-name">{chatName}</p>
        </div>
        <div className="chatItem-bottom">
          <p className="sb-lastmessage">{lastMessage}</p>
          <p className="sb-timestamp">
            {createdAt ? getTimeDifferenceFromNow(createdAt).toString() : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChatItem;
