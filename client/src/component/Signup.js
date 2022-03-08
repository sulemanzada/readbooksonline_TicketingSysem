import React,  { useState } from "react";

import { NavLink } from "react-router-dom";
// import Login from './component/Login';
import './signup.css'

const Signup = () => {
    
    const [user , setUser] = useState({
        fname : "",
        lname: "",
        email : "",
        password : "",
        cpassword : ""
    });
    
    let name, value; 
    const [records, setRecords] = useState([]);
    const handleInput = (e) =>{
        
        name = e.target.name;
        value = e.target.value;
        console.log(name, value);
        setUser({...user, [name]:value});
    }
    // const handleSubmit = (e) =>{
    //     e.preventDefault();
    //     const newRecord = { ...user, id:new Date().getTime().toString()}
    //     console.log(records);
    //     setRecords([...records, newRecord]);
    //     console.log(records);
    //     setUser({fname:"", lname:"", email:"", password:"", cpassword: ""});
    // }

    const PostData = async (e) =>{
        e.preventDefault();
        const {fname , lname, email , password , cpassword } =  user;

        const res = await fetch("/register");

    }
    return (
        // React Fragment short form Syntactic sugar
        <>
            <section style={{ backgroundColor: "#b3e5fc" }}>
                <div className="container vh-100">
                    <div className="row d-flex justify-content-center align-items-center vh-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5" style={{ backgroundColor: "#eeee" }}>

                                    <div className="row justify-content-center" >

                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" >

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">Sign up</p>

                                            <form method="POST" className="mx-1 mx-md-4" id="registration-form" >

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <label htmlFor="fname">
                                                        <i className="zmdi zmdi-account"></i>
                                                    </label>
                                                    <input type="text" name="fname" id="fname" className="form-control" autoComplete="off"
                                                        value = {user.name}
                                                        onChange={handleInput}
                                                        placeholder="First Name" />

                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <label htmlFor="lname">
                                                        <i className="zmdi zmdi-account"></i>
                                                    </label>
                                                    <input type="text" name="lname" id="lname" className="form-control" autoComplete="off"
                                                        value = {user.name}
                                                        onChange={handleInput}
                                                        placeholder="Last Name" />

                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <label htmlFor="lname">
                                                        <i className="zmdi zmdi-email"></i>
                                                    </label>
                                                    <input type="text" name="email" id="email" className="form-control" autoComplete="off"
                                                        value = {user.name}
                                                        onChange={handleInput}
                                                        placeholder="Your Email" />

                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <label htmlFor="lname">
                                                        <i className="zmdi zmdi-lock"></i>
                                                    </label>
                                                    <input type="password" name="password" id="password" className="form-control" autoComplete="off"
                                                        value = {user.name}
                                                        onChange={handleInput}
                                                        placeholder="Password" />

                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <label htmlFor="lname">
                                                        <i className="zmdi zmdi-lock-outline"></i>
                                                    </label>
                                                    <input type="password" name="cpassword" id="cpassword" className="form-control" autoComplete="off"
                                                        value = {user.name}
                                                        onChange={handleInput}
                                                        placeholder="Repeat your password" />

                                                </div>


                                                <div className="form-check d-flex justify-content-center mb-3">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        value=""
                                                        id="form2Example3c"
                                                    />
                                                    {/* for="form2Example3" */}
                                                    <label className="form-check-label" >
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                {/* <input type="submit" name="signup" id="signup" value={'Register'} onClick={handleSubmit}/> */}
                                                    <button type="button" className="btn btn-primary btn-lg" onClick={PostData}> Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex flex-column align-items-center order-1 order-lg-2">
                                            <div className="mt-5"></div>
                                            <div className="mt-5"></div>
                                            <div>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="The signup" />
                                            </div>
                                            <div>
                                                <p className="text-center text-muted mt-4 mb-3">Have already an account? <NavLink to={"/login"} className="fw-bold text-body"><u>Login here</u></NavLink></p>
                                            </div>
                                        </div>
                                        {/* <p className="text-center text-muted mt-2 mb-0">Have already an account? <NavLink to={"/login"} className="fw-bold text-body"><u>Login here</u></NavLink></p> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>

            {/* <div>
                {

                    records.map((currentElem) => {
                        const {id, fname, lname, email, password, cpassword} = currentElem;//object de-structuring
                        return(
                            <div className="showDataStyle" key = {id}>
                                <p>{fname}</p>
                                <p>{lname}</p>
                                <p>{email}</p>
                                <p>{password}</p>
                                <p>{cpassword}</p>
                            </div>
                        )
                    })
                }
            </div> */}

        </>
    )
}

export default Signup

