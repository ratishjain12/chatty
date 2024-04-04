import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "../redux/store";
export const SelfMessage = ({
  message,
  time,
}: {
  message: string;
  time: string;
}) => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);

  return (
    <div className={"selfMessage-container" + (theme ? "-dark" : "")}>
      <div className="sm-content">
        <p>{message}</p>
        <p className="sm-timestamp">
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
