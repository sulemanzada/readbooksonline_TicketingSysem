import React, { useState, useContext } from "react";
// import  { Redirect } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Card from "./UiElements/Card";
import Input from "./formsElements/Input";
import Button from "./formsElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./validators";

import { useForm } from "./custom-hook/formValidation";
import { useHttpRequest } from "./custom-hook/httpRequest";
import { AuthContext } from "./auth-context";
import "./UserFormPage.css";

const UserFormPage = (props) => {
  let navigate = useNavigate();
  const auth = useContext(AuthContext);
  const mode = props.loginMode;
  const [isLoginMode, setIsLoginMode] = useState(mode);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [role, setRole] = useState("CLIENT");
  // console.log(props.createEmployee);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          fname: undefined,
          lname: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
      // <Redirect to='/login'  />
      navigate("/login");
    } else {
      setFormData(
        {
          ...formState.inputs,
          fname: {
            value: "",
            isValid: false,
          },
          lname: {
            value: "",
            isValid: false,
          },
        },
        false
      );
      navigate("/signup");
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "/user/signin",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.user.id,
          responseData.token,
          responseData.user.role,
          new Date(new Date().getTime() + 1000 * 60 * 60)
        );
        navigate("/");
      } catch (err) {}
    } else if (props.createEmployee) {
      try {
        const responseData = await sendRequest(
          "/user/createUser",
          "POST",
          JSON.stringify({
            fname: formState.inputs.fname.value,
            lname: formState.inputs.lname.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            role: role,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          "/user/register",
          "POST",
          JSON.stringify({
            fname: formState.inputs.fname.value,
            lname: formState.inputs.lname.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(
          responseData.user.id,
          responseData.token,
          responseData.user.role,
          new Date(new Date().getTime() + 1000 * 60 * 60)
        );
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleChange = (e) => {
    setRole(e.target.value);
  };
  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <Card className="authentication">
        {/* {isLoading && <LoadingSpinner asOverlay />} */}
        {isLoginMode && <h2>Login Required</h2>}
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <React.Fragment>
              {props.createEmployee ? (
                <h2>Create Employee </h2>
              ) : (
                <h2>Sgin-Up</h2>
              )}
              <Input
                element="input"
                id="fname"
                type="text"
                placeholder="Your First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="lname"
                type="text"
                placeholder="Your Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
            </React.Fragment>
          )}
          <Input
            element="input"
            id="email"
            type="email"
            placeholder="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            placeholder="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          {!isLoginMode && props.createEmployee && (
            <div className="map-container">
              <select defaultValue={"CLIENT"} onChange={handleChange}>
                <option value="ADMIN">ADMIN</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="CLIENT">CLIENT</option>
              </select>
            </div>
          )}
          {!auth.isLoggedIn && (
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          )}
          {auth.role === "ADMIN" && !isLoading && (
            <Button type="submit" disabled={!formState.isValid}>
              Create
            </Button>
          )}
        </form>
        {!auth.isLoggedIn && (
          <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        )}
      </Card>
    </React.Fragment>
  );
};

export default UserFormPage;
