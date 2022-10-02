import React, { useState, useEffect } from "react";
import TicketItemList from "../UiElements/TicketItemList";

import { useHttpRequest } from "../custom-hook/httpRequest";

const ShowTicketList = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest("/requestlist");
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
      {!isLoading && loadedUsers && <TicketItemList items={loadedUsers} />}
    </>
  );
};

export default ShowTicketList;
