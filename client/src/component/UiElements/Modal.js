import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";
// external css is not working. I had to use styling here
const ModalStyle = {
  position: "fixed",
  top: "32vh",
  left: "10%",
  width: "80%",
  background: "#FFF",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
  borderRadius: "8px",
  color: "#000",
  zIndex: 1000,
};
const ModalOverlay = (props) => {
  const content = (
    <div style={ModalStyle}>
      <header className={"modal__header"}>
        <h2>{props.header}</h2>
      </header>
      {/* <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      > */}
      <div className={"modal__content"}>{props.children}</div>
      <footer className={"modal__footer"}>{props.footer}</footer>
      {/* </form> */}
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-portal")
  );
};
const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <ModalOverlay {...props} />
    </React.Fragment>
  );
};
export default Modal;
