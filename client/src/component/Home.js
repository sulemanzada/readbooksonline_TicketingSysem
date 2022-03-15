import React, {useContext} from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from '../App';

const Home = () => {
    const {state} = useContext(UserContext);

    const RenderHome = () => {
        if (state){
            return(
                <>
                <div className="vh-100 rainbow-gradient d-flex flex-column align-items-center justify-content-center" style={{  backgroundColor: "darkcyan"}}>          
            {/* background-image: linear-gradient(to bottom right, red, yellow); */}
            <div style={{}}>
            
            <h1>Welcome Dear User</h1>
            
            <div className="d-flex justify-content-center mx-4 mt-2 mb-3 mb-lg-4">

            <NavLink to={"/Ticket"} style={{ textDecoration: "none" }}> <span style={{color: "#ffffff"}}>Submit a Ticket</span></NavLink>
            </div>
            <div className="d-flex justify-content-center mx-4 mt-2 mb-3 mb-lg-4">

            <NavLink to={"/DeleteUsers"} style={{ textDecoration: "none" }}> <span style={{color: "#ffffff"}}>Manage Users</span></NavLink>
            </div>
            <div className="d-flex justify-content-center mx-4 mt-2 mb-3 mb-lg-4">

            <NavLink to={"/RequestList"} style={{ textDecoration: "none" }}> <span style={{color: "#ffffff"}}>Show Requests</span></NavLink>
            </div>
            </div>
            </div>
                </>
            )
        } else{
            return(
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
    }


    return (
        <>
           <RenderHome/> 
        </>
    )
}

export default Home