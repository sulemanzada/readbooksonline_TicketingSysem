import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useHttpRequest } from "../custom-hook/httpRequest";
import Button from "../formsElements/Button";
import { AuthContext } from "../auth-context";
import { useContext } from "react";
import Ticket from "../Ticket";
// import Modal from "../UiElements/Modal";

const ManageRequestPage = () => {
  const bookId = useParams().bookId;
  const auth = useContext(AuthContext);
  const [bookData, setBookData] = useState();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const responseData = await sendRequest(`/ticket/${bookId}`);
        setBookData(responseData.book);
      } catch (err) {}
    };
    fetchBookData();
  }, [sendRequest, bookId]);

  // console.log(bookData);
  // async

  const changeStatus = async (bookStatus) => {
    console.log(bookStatus);

    try {
      await sendRequest(
        `/book/update/${bookId}`,
        "PATCH",
        JSON.stringify({
          bookStatus: bookStatus,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate("/RequestList");
    } catch (err) {
      console.log(err);
    }
  };

  const editBook = () => {
    console.log("ah");
    return <Ticket />;
  };

  if (!isLoading && isEditMode && bookData) {
    return (
      <Ticket
        Name={bookData.bookname}
        ISBN={bookData.isbn}
        Genre={bookData.genre}
        Price={bookData.price}
        AuthName={bookData.authname}
      />
    );
  }
  return (
    <>
      {isLoading && (
        <div className="center">
          <h2>Loading...</h2>
        </div>
      )}
      {!isLoading && bookData && (
        <div>
          <h4>Name {bookData.bookname}</h4>
          <h4>ISBN {bookData.isbn}</h4>
          <h4>Genre {bookData.genre}</h4>
          <h4>Price {bookData.price}</h4>
          <h4>Status {bookData.bookStatus}</h4>
          <div>
            <Button inverse onClick={() => changeStatus("DECLINED")}>
              {"DECLINE"}
            </Button>
            <Button inverse onClick={() => changeStatus("APPROVED")}>
              {"APPROVE"}
            </Button>
            {auth.userId === bookData.submitter && (
              <React.Fragment>
                <Button inverse onClick={() => changeStatus("CANCEL")}>
                  {"CANCEL"}
                </Button>

                <Button
                  inverse
                  onClick={() => {
                    setIsEditMode(true);
                  }}
                >
                  {"Edit"}
                </Button>

                {/* <NavLink to={"/Ticket"} className={"button"}>
                  {"EDIT"}
                </NavLink> */}
              </React.Fragment>
            )}
          </div>
        </div>
      )}
      {/* {!isLoading && bookData && auth.userId === bookData.submitter && (
        <Button inverse onClick={() => changeStatus("APPROVED")}>
          {"APPROVE"}
        </Button>
      )} */}
    </>
  );
};

export default ManageRequestPage;
