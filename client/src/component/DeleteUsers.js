import React, { useEffect, useState } from "react";
import ItemList from "./UiElements/ItemList";
// import ErrorModal from '//ErrorModal'; /ui element add later
// import LoadingSpinner from '/LoadingSpinner'; /ui element add later
import { useHttpRequest } from "./custom-hook/httpRequest";
function DeleteUsers() {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest("/user/userlist");
        setLoadedUsers(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && (
        <div className="center">
          <h2>Loading...</h2>
        </div>
      )}
      {!isLoading && loadedUsers && <ItemList items={loadedUsers} />}
    </>
  );
}

export default DeleteUsers;
