import React,  { useState} from "react";
import { useNavigate } from "react-router-dom";
import RequestClass from './RequestClass';
import './styles.css';




function RequestList() {
  const navigate = useNavigate();
  const [book , setBook] = useState({
    isbn : "",
    bookStatus: "",
  })

  let name, value; 
// const [records, setRecords] = useState([]);
const handleInput = (e) =>{
  
  name = e.target.name;
  value = e.target.value;
  console.log(name, value);
  setBook({...book, [name]:value});
}

const PutData = async (e) =>{
  e.preventDefault();
  
  var {isbn ,  bookStatus } =  book;
  bookStatus = bookStatus.toUpperCase();
  const res = await fetch("/bookstatusUpdate", {
    method: "PUT",  
    headers:{
        
          "Content-Type" : "application/json"
      },
      body: JSON.stringify({
          isbn , bookStatus
      })

  });
  // console.log("submitter", submitter);
  const data = await res.json();
  // console.log("error status:", data);f
  // console.log(data.status);
  if (data.status === 422 || !data) {
      window.alert("Please Provide the ISBN");
      console.log("Please Provide the ISBN");
      
  }
  // if (data.status === 412)
  else if (data.status === 201){
      window.alert("Book Status updated");
      console.log("Book Status updated");
  }
  else{
    window.alert("Book Status update Failed");
    console.log("Book Status update Failed");
  }
  // console.log(data.status);
  navigate("/");
}
  return (
    <div className="vh-100" style={{ backgroundColor: "#eece" }} >
      

      <RequestClass />

      <div className="container mt-5">
        

        <form method="PUT"  id="req-accept-form" className="row row-cols-3 mt-4">

            
            <div>
              
                {/* <label htmlFor="lname">
                </label> */}
                <input type="text" name="isbn" id="isbn" className="form-control" autoComplete="off"
                    value={book.name}
                    onChange={handleInput}
                    placeholder="Enter the ISBN to approve or Decline" />
            </div>
            <div>
              {/* <select name="bookStatus" id="booksSatus">
            <option defaultValue={"PENDING"}>PENDING</option>
            <option value={"APPROVED"}>APPROVED</option>
            <option value={"DECLINED"}>DECLINED</option>
            </select> */}

                <input type="text" name="bookStatus" id="bookStatus" className="form-control" autoComplete="off"
                    value={book.name}
                    onChange={handleInput}
                    placeholder="Please type APPROVED OR DECLINED" />

            </div>
            <div>
                <button type="button" className="btn btn-primary btn-lg" onClick={PutData} >Done</button>
            </div>
           
        </form>

    </div>
    </div>
  );
}

export default RequestList;