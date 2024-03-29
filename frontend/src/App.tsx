import "./App.css";
import Login from "./components/auth/Login";
import MainContainer from "./components/MainContainer";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import ChatArea from "./components/ChatArea";
import UsersGroups from "./components/UsersGroups";
import CreateGroups from "./components/CreateGroups";
import Users from "./components/Users";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Register from "./components/auth/Register";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./PrivateRoutes";
function App() {
  const theme = useSelector((state: RootState) => state.themeReducer.value);

  return (
    <>
      <div className={"App" + (theme ? "-dark" : "")}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/app" element={<MainContainer />}>
              <Route index element={<Welcome />} />
              <Route path="chat" element={<ChatArea />} />
              <Route path="groups" element={<UsersGroups />} />
              <Route path="create-group" element={<CreateGroups />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default App;
