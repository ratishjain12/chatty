import "./styles.css";
const Login = () => {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/chat.png" />
      </div>
      <div className="login-box">
        <h3>Login with your account</h3>
        <input placeholder="Enter username" />
        <input placeholder="Enter password" type="password" />
        <button className="login-btn">Login</button>
      </div>
    </div>
  );
};
export default Login;
