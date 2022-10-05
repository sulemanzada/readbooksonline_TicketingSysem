import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { useHttpRequest } from "./custom-hook/httpRequest";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const responseData = await sendRequest(`/users/${auth.userId}`);
        setUserData(responseData.user);
      } catch (err) {
        console.log(err);
        navigate("/Login");
      }
    };
    fetchBookData();
  }, [sendRequest, auth.userId]);

  return (
    <div className="vh-100" style={{ backgroundColor: "#eece" }}>
      {!isLoading && userData && (
        <div className=" row row-cols-2 ms-4">
          <div className="col h3 fw-bold mt-2">First Name</div>
          <div className="col h3 fw-bold mt-2">{userData.fname}</div>
          <div className="col h3 fw-bold mt-2">Last Name</div>
          <div className="col h3 fw-bold mt-2">{userData.lname} </div>
          <div className="col h3 fw-bold mt-2">Email Address</div>
          <div className="col h3 fw-bold mt-2">{userData.email}</div>
          <div className="col h3 fw-bold mt-2">Role</div>
          <div className="col h3 fw-bold mt-2">{userData.role}</div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
