import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const navigate = useNavigate();
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
        <p
          style={{ cursor: "pointer", color: "#7FFFD4" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account?{" "}
          <span style={{ color: "white", textDecoration: "underline" }}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
