import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { AuthContext } from "./auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const RenderMenu = () => {
    if (auth.isLoggedIn) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <h6>Home</h6>
            </NavLink>
            {/* aria-current="page"  put this after van-link if needed*/}
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/UserProfile">
              <h6>Profile</h6>
            </NavLink>
            {/* aria-current="page" */}
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              <h6>Logout</h6>
            </NavLink>
            {/* aria-current="page" */}
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/ChatPage">
              <h6>ChatPage</h6>
            </NavLink>
            {/* aria-current="page" */}
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <h6>Home</h6>
            </NavLink>
            {/* aria-current="page"  put this after van-link if needed*/}
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              <h6>Login</h6>
            </NavLink>
            {/* aria-current="page" */}
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">
              <h6>Signup</h6>
            </NavLink>
            {/* aria-current="page" */}
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Aboutus">
              <h6>About Us</h6>
            </NavLink>
            {/* aria-current="page" */}
          </li>
        </>
      );
    }
  };

  return (
    <>
      {/* style={{ background: '#1a8cff' }} */}
      <nav className="navbar navbar-expand-lg navbar-light nav-rainbow-gradient">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <h5>ReadBooksOnline</h5>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
