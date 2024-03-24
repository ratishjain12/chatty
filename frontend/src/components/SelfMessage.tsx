import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "../redux/store";
export const SelfMessage = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const prop1 = { name: "You", message: "this is a sample message" };
  return (
    <div className={"selfMessage-container" + (theme ? "-dark" : "")}>
      <div className="sm-content">
        <p>{prop1.message}</p>
        <p className="sm-timestamp">12:00 am</p>
      </div>
    </div>
  );
};
