import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";

const Logout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    auth.logout();
    navigate("/");
  });
  return <div>LogoutPage</div>;
};

export default Logout;
