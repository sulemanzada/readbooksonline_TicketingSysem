import React, { useContext, useState } from 'react'
import { NavLink, useNavigate} from "react-router-dom";
import { UserContext } from '../App';


const Login = () => {
    const {dispatch} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();
    

    const loginUser = async (e) =>{
        e.preventDefault();

        const res = await fetch('/user/signin', {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password
            })

        });
        
        const data = res.json();

        if(res.status === 400 || !data){
            window.alert("Invalid Credentials");
        }else{
            if (res.status === 200) {
                dispatch({type:"USER", payload:"ADMIN"});
                console.log("ADMIN");
            }
           else if (res.status === 201){
            dispatch({type:"USER", payload:"EMPLOYEE"});
            console.log("EMPLOYEE");
           }
           else{
            dispatch({type:"USER", payload:"CLIENT"});
            console.log("CLIENT");
           }
            window.alert("Login Successfull");
            navigate("/");
        }
    }

    return (
        <>

            <section style={{ backgroundColor: "#b3e5fc" }}>
                <div className="container vh-100">
                    <div className="row d-flex justify-content-center align-items-center vh-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5" style={{ backgroundColor: "#eeee" }}>

                                    <div className="row justify-content-center" >

                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 mt-5" >


                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Login" />

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 ">


                                            <form method="POST" className="mx-1 mx-md-4" id="login-form">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">LogIn</p>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <label htmlFor="lname">
                                                        <i className="zmdi zmdi-email"></i>
                                                    </label>
                                                    <input type="text" name="email" id="email" className="form-control" autoComplete="off"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Your Email" />

                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <label htmlFor="lname">
                                                        <i className="zmdi zmdi-lock"></i>
                                                    </label>
                                                    <input type="password" name="password" id="password" className="form-control" autoComplete="off"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Password" />

                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg" onClick={loginUser}>Login</button>
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