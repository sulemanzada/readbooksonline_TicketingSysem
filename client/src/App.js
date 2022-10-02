import React, { createContext, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Signup from "./component/Signup";
import Aboutus from "./component/Aboutus";
import NoPage from "./component/NoPage";
import Logout from "./component/Logout";
import Ticket from "./component/Ticket";
import DeleteUsers from "./component/DeleteUsers";
import Requests from "./component/Requests";
import RequestClass from "./component/RequestClass";
import RequestList from "./component/RequestList";
import CreateEmployee from "./component/CreateEmployee";
import UserProfile from "./component/UserProfile";
import RequestViewer from "./component/RequestViewer";
import ChatPage from "./component/ChatPage";
import UserFormPage from "./component/UserFormPage";
import ManageUserPage from "./component/Pages/ManageUserPage";
import ShowTicketList from "./component/Pages/ShowTicketList";
import ManageRequestPage from "./component/Pages/ManageRequestPage";
import { initialState, reducer } from "./reducer/Usereducer";
import { useAuth } from "./component/custom-hook/auth-hook";
import { AuthContext } from "./component/auth-context";
//Conext API
const loginMode = true;
const signupMode = false;
export const UserContext = createContext();
const App = () => {
  // const loginMode = useState(true);
  const { token, login, logout, userId, role } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          role: role,
          login: login,
          logout: logout,
        }}
      >
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route
              path="login"
              element={<UserFormPage loginMode={loginMode} />}
            />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="Aboutus" element={<Aboutus />} />
            <Route path="signup" element={<Signup />} />
            {/* <Route path="signup" element={<UserFormPage loginMode={signupMode} />} /> */}

            <Route
              path="/DeleteUsers/users/:userId"
              element={<ManageUserPage />}
            />
            <Route path="RequestList/:bookId" element={<ManageRequestPage />} />

            <Route path="RequestList" element={<ShowTicketList />} />

            <Route path="logout" element={<Logout />} />
            <Route path="Ticket" element={<Ticket />} />
            <Route path="DeleteUsers" element={<DeleteUsers />} />
            <Route path="Requests" element={<Requests />} />
            <Route path="RequestClass" element={<RequestClass />} />
            {/* <Route path="RequestList" element={<RequestList />} /> */}
            <Route path="CreateEmployee" element={<CreateEmployee />} />
            <Route path="UserProfile" element={<UserProfile />} />
            <Route path="RequestViewer" element={<RequestViewer />} />
            <Route path="ChatPage" element={<ChatPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
};

export default App;
