import "./styles.css";
const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <img className="welcome-logo" src="/chat.png" />
        <p className="welcome-title">Welcome to Chatty!</p>
        <p className="welcome-slogan">
          View and text directly with the people in the chat room
        </p>
      </div>
    </div>
  );
};
export default Welcome;
