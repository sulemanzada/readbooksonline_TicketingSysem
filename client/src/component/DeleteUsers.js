import React,  { useState} from "react";
import { useNavigate } from "react-router-dom";
import UsersClass from './UsersClass';
// import './App.css';

function DeleteUsers() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');


const DeleteData = async (e) =>{
  // e.preventDefault();
  // email.toLowerCase();
  var emailLow = email;
  emailLow = emailLow.toLowerCase();
  console.log(emailLow);
  const res = await fetch("/user/deleteOne", {
    method: "DELETE",  
    headers:{
        
          "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        emailLow
      })

  });
  // console.log("submitter", submitter);
  const data = await res.json();
  if (data.status === 422 || !data) {
      window.alert("Please Provide Email");
      console.log("Please Provide Email");
      
  }
  // if (data.status === 412)
  else if (data.status === 201){
      window.alert("Employee Deleted");
      console.log("Employee Deleted");
  }
  else{
    window.alert("Could not delete the employee maybe it doesnt exists");
    console.log("Could not delete the employee maybe it doesnt exists");
  }
  // console.log(data.status);
  navigate("/");
}
  return (
    <div >
      <UsersClass />

      <div className="container mt-5">
        
      <p className="text-center h3 fw-bold mb-3 mx-1 mx-md-4 mt-2">
        To Delete a Employee Enter the email of the Employee
        </p>
        <form method="DELETE"  id="req-accept-form" className="row row-cols-2 mt-4">

            
            <div>
             
                <input type="text" name="isbn" id="isbn" className="form-control" autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder= "Enter the email of the Employee" />
            </div>
            
            <div>
                <button type="button" className="btn btn-primary btn-lg" onClick={DeleteData} >Delete</button>
            </div>
           
        </form>

    </div>
    </div>
  );
}

export default DeleteUsers;
