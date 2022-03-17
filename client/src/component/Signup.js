import React,  { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './signup.css'

const Signup = () => {
    const navigate = useNavigate();
    const [user , setUser] = useState({
        fname : "",
        lname: "",
        email : "",
        password : "",
        cpassword : ""
    })
    
    let name, value; 
    // const [records, setRecords] = useState([]);
    const handleInput = (e) =>{
        
        name = e.target.name;
        value = e.target.value;
        // console.log(name, value);
        setUser({...user, [name]:value});
    }

    const PostData = async (e) =>{
        e.preventDefault();
        var {fname , lname, email , password , cpassword } =  user;
        email = email.toLocaleLowerCase();
        console.log(fname , lname, email , password , cpassword);
        const res = await fetch("/user/register", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                fname , lname, email , password , cpassword
            })

        });

        const data = await res.json();
        // console.log("error status:", data);f
        // console.log(data.status);
        if (data.status === 422 || !data) {
            window.alert("INVALID registration");
            console.log("Invalid registration");
            
        }
        else if (data.status === 412 || !data) {
            window.alert("Passwords do not match");
            console.log("Passwords do not match");
            
        }
        else if (data.status === 402 || !data) {
            window.alert("Email Already Exists");
            console.log("Email Already Exists");
            
        }
        else{
            window.alert("Registration Sucessfull");
            console.log("Registration Sucessfull");
            
            navigate("/Login");
        }
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
                                                <p className="text-center text-muted mt-4 mb-3">Already have an account? <NavLink to={"/login"} className="fw-bold text-body"><u>Login here</u></NavLink></p>
                                            </div>
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>

        </>
    )
}

export default Signup
