import "./App.css";
import Login from "./components/auth/Login";
import MainContainer from "./components/MainContainer";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import ChatArea from "./components/ChatArea";
import UsersGroups from "./components/UsersGroups";
import CreateGroups from "./components/CreateGroups";
import Users from "./components/Users";
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<MainContainer />}>
            <Route index element={<Welcome />} />
            <Route path="chat" element={<ChatArea />} />
            <Route path="groups" element={<UsersGroups />} />
            <Route path="create-group" element={<CreateGroups />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
