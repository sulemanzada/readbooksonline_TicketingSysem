import React from 'react'
import { NavLink } from "react-router-dom";
const Login = () => {
    return (
        <>

            <section style={{ backgroundColor: "#b3e5fc" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5" style={{ backgroundColor: "#eeee" }}>

                                    <div className="row justify-content-center" >

                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 mt-5" >


                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 ">


                                            <form className="mx-1 mx-md-4" id="login-form">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">LogIn</p>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <label htmlFor="lname">
                                                        <i class="zmdi zmdi-email"></i>
                                                    </label>
                                                    <input type="text" name="email" id="email" className="form-control" autoComplete="off"
                                                        placeholder="Your Email" />

                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <label htmlFor="lname">
                                                        <i class="zmdi zmdi-lock"></i>
                                                    </label>
                                                    <input type="password" name="password" id="password" className="form-control" autoComplete="off"
                                                        placeholder="Password" />

                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg">Login</button>
                                                </div>

                                            </form>

                                        </div>
                                        <p className="text-center text-muted mt-2 mb-5">Create an Account <NavLink to={"/signup"} className="fw-bold text-body"><u>Sign Up</u></NavLink></p>
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

export default Login