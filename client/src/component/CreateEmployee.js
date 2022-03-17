import React,  { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
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
        email = email.toLowerCase();
        var role = 'EMPLOYEE';
        console.log(fname , lname, email , role, password , cpassword);
        const res = await fetch("/user/create", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                fname , lname, email , role , password , cpassword
            })

        });

        const data = await res.json();
        // console.log("error status:", data);f
        // console.log(data.status);
        if (data.status === 422 || !data) {
            window.alert("INVALID registration");
            console.log("Invalid registration");
            
        }
        else{
            window.alert("Registration Sucessfull");
            console.log("Registration Sucessfull");
            
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
                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">Employee Creation Form</p>
                                    <div className="row justify-content-center" >

                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" >

                                            

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
                                                        placeholder="Employee Email" />

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
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                {/* <input type="submit" name="signup" id="signup" value={'Register'} onClick={handleSubmit}/> */}
                                                    <button type="button" className="btn btn-primary btn-lg" onClick={PostData}> Register</button>
                                                </div>

                                            </form>

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

export default CreateEmployee