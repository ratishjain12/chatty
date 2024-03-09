import "./styles.css";
export const SelfMessage = () => {
  const prop1 = { name: "You", message: "this is a sample message" };
  return (
    <div className="selfMessage-container">
      <div className="sm-content">
        <p>{prop1.message}</p>
        <p className="sm-timestamp">12:00 am</p>
      </div>
    </div>
  );
};
