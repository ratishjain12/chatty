import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "../../redux/store";
const Login = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/chat.png" />
      </div>
      <div className={"login-box " + (theme ? "dark" : "")}>
        <h3>Login with your account</h3>
        <input placeholder="Enter username" />
        <input placeholder="Enter password" type="password" />
        <button className="login-btn">Login</button>
      </div>
    </div>
  );
};
export default Login;
