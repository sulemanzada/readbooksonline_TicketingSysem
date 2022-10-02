import React, { useState } from "react";



const MultipleInputs = () =>{
    const [records, setRecords] = useState([]);
    const [userRegistration , setuserRegistration] = useState({
        username : "",
        email : "",
        phone : "",
        password : ""
    }); 
    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        console.log(name , value);

        setuserRegistration({...userRegistration, [name]:value});
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const newRecord = { ...userRegistration, id:new Date().getTime().toString()}
        console.log(records);
        setRecords([...records, newRecord]);
        console.log(records);

        setuserRegistration({username:"", email:"", phone:"", password:""});
    }
    return(
        // React Fragment short form Syntactic sugar
        <> 
            <form  onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"> Fullname</label>
                    <input type= "text" autoCapitalize="off" 
                    value={userRegistration.username}
                    onChange = {handleInput}
                    name="username" id="username"/>
                </div>
                
                <div>
                    <label htmlFor="email"> email</label>
                    <input type= "text" autoCapitalize="off" 
                    value={userRegistration.email}
                    onChange = {handleInput}
                    name="email" id="email"/>
                </div>
                
                <div>
                    <label htmlFor="phone"> phone</label>
                    <input type= "text" autoCapitalize="off" 
                    value={userRegistration.phone}
                    onChange = {handleInput}
                    name="phone" id="phone"/>
                </div>

                <div>
                    <label htmlFor="password"> password</label>
                    <input type= "text" autoCapitalize="off" 
                    value={userRegistration.password}
                    onChange = {handleInput}
                    name="password" id="password"/>
                </div>

                <button type="submit"> Register</button>
                
            </form>

            <div>

                {

                    records.map((currentElem) => {
                        const {id, username, email, phone, password} = currentElem;//object de-structuring
                        return(
                            <div className="showDataStyle" key = {id}>
                                <p>{username}</p>
                                <p>{email}</p>
                                <p>{phone}</p>
                                <p>{password}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MultipleInputs


// <div className="container register">
// <div className="row">
//     <div className="col-md-3 register-left">
//         <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
//         <h3>Welcome</h3>


//         <NavLink to="/login">
//             <input type="submit" name="" value="Login" /><br />
//         </NavLink>
//         <span >Already Have Account</span>
//     </div>
//     <div className="col-md-9 register-right">


//         <h3 className="register-heading">Register as a Client</h3>

//         <from className="row register-form" action="" onSubmit={handleSubmit}>

//             <div className="col-md-6">
//                 <div className="form-group">
//                     <input type="text" autoCapitalize="off" className="form-control" placeholder="First Name *" value={userRegistration.fname}
//                         onChange={handleInput} />
//                 </div>
//                 <div className="form-group">
//                     <input type="text" autoCapitalize="off" className="form-control" placeholder="Last Name *" value={userRegistration.lname}
//                         onChange={handleInput} />
//                 </div>
//                 <div className="form-group">
//                     <input type="password" autoCapitalize="off" className="form-control" placeholder="Password *" value={userRegistration.password}
//                         onChange={handleInput} />
//                 </div>

//                 <div className="form-group">
//                     <div className="maxl">
//                         <label className="radio inline">
//                             <input type="radio" name="gender" value="male" checked />
//                             <span> Male </span>
//                         </label>
//                         <label className="radio inline">
//                             <input type="radio" name="gender" value="female" />
//                             <span>Female </span>
//                         </label>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-md-6">
//                 <div className="form-group">
//                     <input type="email" autoCapitalize="off" className="form-control" placeholder="Your Email *" value={userRegistration.email}
//                         onChange={handleInput} />
//                 </div>

//                 <div class="form-group">
//                     <input type="text" class="form-control" placeholder="Your Phone Number *" value={userRegistration.phone}
//                         onChange={handleInput} />
//                 </div>

//                 <div className="form-group">
//                     <input type="password" autoCapitalize="off" className="form-control" placeholder="Confirm Password *" value={userRegistration.cpassword}
//                         onChange={handleInput} />
//                 </div>
//                 <button type="submit"  >Register </button>

//             </div>
            
//         </from>
//     </div>
// </div>

// </div>

// <div>

// {

//     records.map((currentElem) => {
//         const { id, fname, lname, email, phone, password, cpassword } = currentElem;//object de-structuring
//         return (
//             <div className="showDataStyle" key={id}>

//                 <p>{fname}</p>
//                 <p>{lname}</p>
//                 <p>{email}</p>
//                 <p>{phone}</p>
//                 <p>{password}</p>
//                 <p>{cpassword}</p>
//             </div>
//         )
//     })
// }
// </div>