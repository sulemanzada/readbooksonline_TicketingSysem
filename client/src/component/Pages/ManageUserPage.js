import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpRequest } from "../custom-hook/httpRequest";
import Button from "../formsElements/Button";
import { AuthContext } from "../auth-context";
import { useContext } from "react";
import Modal from "../UiElements/Modal";

const ManageUserPage = () => {
  const userId = useParams().userId;
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [role, setRole] = useState("Select Role");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseData = await sendRequest(`/users/${userId}`);
        setUserData(responseData.user);
      } catch (err) {}
    };
    fetchUserData();
  }, [sendRequest, userId]);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const deleteUser = async () => {
    try {
      await sendRequest(`/user/delete/${userId}`, "DELETE", null, {
        Authorization: "Bearer " + auth.token,
      });
      navigate("/DeleteUsers");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setRole(e.target.value);
  };

  //Function to send the changed role to the backend
  const changeUserRoleHandler = async (e) => {
    setShowModal(false);
    userData.role = role;
    console.log(role);
    try {
      await sendRequest(
        `/user/update/${userId}`,
        "PATCH",
        JSON.stringify({
          role: role,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/DeleteUsers");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isLoading && (
        <div className="center">
          <h2>Loading...</h2>
        </div>
      )}
      {!isLoading && userData && (
        <div>
          <h4>
            Name {userData.fname} {userData.lname}{" "}
          </h4>
          <h4>Email {userData.email}</h4>
          <h4>Role {userData.role}</h4>
          <Button
            inverse
            onClick={() => {
              setShowModal(true);
            }}
          >
            {"Change Role"}
          </Button>
          <Button danger onClick={deleteUser}>
            {"DELETE"}
          </Button>
          {showModal && (
            <Modal
              show={showModal}
              onCancel={closeModalHandler}
              header={"Change User Role"}
              contentClass="place-item__modal-content"
              footerClass="place-item__modal-actions"
              footer={
                <React.Fragment>
                  <Button onClick={changeUserRoleHandler}>Change</Button>
                  <Button onClick={closeModalHandler}>Cancel</Button>
                </React.Fragment>
              }
            >
              <div className="map-container">
                <select defaultValue={userData.role} onChange={handleChange}>
                  <option value="ADMIN">ADMIN</option>
                  <option value="EMPLOYEE">EMPLOYEE</option>
                  <option value="CLIENT">CLIENT</option>
                </select>
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default ManageUserPage;
