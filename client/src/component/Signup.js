import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const Signup = () => {
    const [records, setRecords] = useState([]);
    const [userRegistration, setuserRegistration] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);

        setuserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...userRegistration, id: new Date().getTime().toString() }
        console.log(records);
        setRecords([...records, newRecord]);
        console.log(records);

        setuserRegistration({ fname: "", lname: "", email: "", phone: "", password: "", cpassword: "" });
    }
    return (
        // React Fragment short form Syntactic sugar
        <>
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>

                        <NavLink to="/login">
                            <input type="submit" name="" value="Login" />
                            <br /></NavLink>
                        <p>Already Have Account</p>

                    </div>
                    <div className="col-md-9 register-right">


                        <h3 className="register-heading">Register as a Client</h3>

                        <from className="row register-form" action="" onSubmit={handleSubmit}>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" autoCapitalize="off" className="form-control" placeholder="First Name *" value={userRegistration.fname}
                                        onChange={handleInput} name="fname" id="fname" />
                                </div>
                                <div className="form-group">
                                    <input type="text" autoCapitalize="off" className="form-control" placeholder="Last Name *" value={userRegistration.lname}
                                        onChange={handleInput} name="lname" id="lname" />
                                </div>
                                <div className="form-group">
                                    <input type="password" autoCapitalize="off" className="form-control" placeholder="Password *" value={userRegistration.password}
                                        onChange={handleInput} name="password" id="password" />
                                </div>

                                <div className="form-group">
                                    <div className="maxl">
                                        <label className="radio inline">
                                            <input type="radio" name="gender" value="male" checked />
                                            <span> Male </span>
                                        </label>
                                        <label className="radio inline">
                                            <input type="radio" name="gender" value="female" />
                                            <span>Female </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="email" autoCapitalize="off" className="form-control" placeholder="Your Email *" value={userRegistration.email}
                                        onChange={handleInput} name="email" id="email" />
                                </div>

                                <div className="form-group">
                                    {/* minlength="10" maxlength="10" */}
                                    <input type="text" className="form-control" placeholder="Your Phone *" value={userRegistration.phone}
                                        onChange={handleInput} name="txtEmpPhone" id="txtEmpPhone" />
                                </div>

                                <div className="form-group">
                                    <input type="password" autoCapitalize="off" className="form-control" placeholder="Confirm Password *" value={userRegistration.cpassword}
                                        onChange={handleInput} name="cpassword" id="cpassword" />
                                </div>


                                <input type="submit" className="btnRegister" value="Register" />
                            </div>
                        </from>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Signup