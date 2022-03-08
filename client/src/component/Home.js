import React from 'react'
import { NavLink } from "react-router-dom";
const Home = () => {
    return (
        <>
            <div className="vh-100 rainbow-gradient d-flex flex-column align-items-center justify-content-center" style={{  backgroundColor: "darkcyan"}}>          
            {/* background-image: linear-gradient(to bottom right, red, yellow); */}
            <div style={{}}>
            <h2>Welcome to</h2>
            <h1>Read Books Online</h1>
            <div className="d-flex justify-content-center mx-4 mt-5 mb-3 mb-lg-4">

            <button type="button" className="btn btn-primary btn-lg " style={{backgroundColor: "#0f0"}}> 
            <NavLink to={"/login"} style={{ textDecoration: "none" }}> <span style={{color: "#ffffff"}}>Sign In</span></NavLink></button>
            </div>
            </div>
            </div>
        </>
    )
}

export default Home