import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.value);
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/chat.png" />
      </div>
      <div className={"login-box " + (theme ? "dark" : "")}>
        <h3>Register</h3>
        <input placeholder="Enter username" required />
        <input placeholder="Enter email" type="email" required />
        <input placeholder="Enter password" type="password" required />
        <button className="login-btn" type="submit">
          Register
        </button>
        <p
          style={{ cursor: "pointer", color: "#7FFFD4" }}
          onClick={() => navigate("/")}
        >
          Already have an account?{" "}
          <span style={{ color: "white", textDecoration: "underline" }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
export default Register;
