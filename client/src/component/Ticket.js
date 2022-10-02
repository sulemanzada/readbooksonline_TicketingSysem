import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./formsElements/Input";
import Button from "./formsElements/Button";
import { VALIDATOR_REQUIRE } from "./validators";
import { useForm } from "./custom-hook/formValidation";
import { useHttpRequest } from "./custom-hook/httpRequest";
import { AuthContext } from "./auth-context";
// import UserAuthenticate from './UserAuthenticate';
// 197 lines of code.
// import './signup.css'
// background-color: #0d6efd;
// border-color: #0d6efd;
const Ticket = (props) => {
  // console.log(props);
  // if (props) {
  //   console.log(props.Name);
  //   console.log(props.ISBN);
  //   console.log(props.Genre);
  //   console.log(props.Price);
  //   console.log(props.AuthName);
  // }
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [formState, inputHandler] = useForm(
    {
      isbn: {
        value: props.ISBN ? props.ISBN : "",
        isValid: props.ISBN ? true : false,
      },
      bookname: {
        value: "",
        isValid: true,
      },
      authname: {
        value: "",
        isValid: true,
      },
      genre: {
        value: "",
        isValid: true,
      },
      price: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  const bookSubmitHandler = async (event) => {
    event.preventDefault();
    const httpMethod = props.ISBN ? "PATCH" : "POST";
    try {
      await sendRequest(
        "/bookticket",
        httpMethod,
        JSON.stringify({
          isbn: formState.inputs.isbn.value,
          bookname: formState.inputs.bookname.value,
          authname: formState.inputs.authname.value,
          genre: formState.inputs.genre.value,
          price: formState.inputs.price.value,
          submitter: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      navigate("/");
    } catch (err) {}
  };

  const [book, setBook] = useState({
    isbn: props.ISBN ? props.ISBN : "",
    bookname: props.Name ? props.Name : "",
    authname: props.AuthName ? props.AuthName : "",
    genre: props.Genre ? props.Genre : "",
    price: props.Price ? props.Price : "",
    submitter: "",
  });

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <form className="place-form" onSubmit={bookSubmitHandler}>
        {/* {isLoading && <LoadingSpinner asOverlay />} */}
        <Input
          element="input"
          id="isbn"
          type="text"
          placeholder="Enter ISBN"
          validators={[VALIDATOR_REQUIRE()]}
          initialValue={props.ISBN ? props.ISBN : ""}
          initialValid={props.ISBN ? true : false}
          errorText="Please enter an ISBN."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="bookname"
          type="text"
          placeholder="Enter book name"
          validators={[]}
          initialValue={props.Name ? props.Name : ""}
          initialValid={true}
          errorText="Please book name"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="authname"
          type="text"
          placeholder="Enter author's name"
          validators={[]}
          initialValue={props.AuthName ? props.AuthName : ""}
          initialValid={true}
          errorText="Please enter an author name."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="genre"
          type="text"
          placeholder="Book Genre"
          validators={[]}
          initialValue={props.Genre ? props.Genre : ""}
          initialValid={true}
          errorText="Please enter genre of the book."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="price"
          type="text"
          placeholder="Book's price"
          validators={[]}
          initialValue={props.Price ? props.Price : ""}
          initialValid={true}
          errorText="Please enter price of the book"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          {props.ISBN ? "UPDATE" : "ADD PLACE"}
        </Button>
      </form>
    </>
  );
};

export default Ticket;
