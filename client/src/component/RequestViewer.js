import React,  { useState} from "react";
import { useNavigate } from "react-router-dom";
import RequestViewerClass from './RequestViewerClass';
import './styles.css';
import { bstates } from "../bookConstants";


function RequestViewer() {

    const navigate = useNavigate();
    const [isbn , setISBN] = useState();

    const PutData = async (e) =>{
        e.preventDefault();
        
        var bookStatus = bstates.cancel;
        const res = await fetch("/book/cancel", {
        method: "PUT",  
        headers:{
            
              "Content-Type" : "application/json"
          },
          body: JSON.stringify({
              isbn , bookStatus
          })
        
        });
        const data = await res.json();
        if (data.status === 422 || !data) {
          window.alert("Please the correct Provide the ISBN");
          console.log("Please the correct Provide the ISBN");
          
        }
        else if (data.status === 201){
          window.alert("Book Status updated");
          console.log("Book Status updated");
        }
        else{
        window.alert("Book Status can not be changed");
        console.log("Book Status can not be changed");
        }
        console.log(data.status);
        navigate("/");
        }
  

  return (
    <div className="vh-100" style={{ backgroundColor: "#eece" }}>
      

      <RequestViewerClass />
      <p className="text-center h3 fw-bold mb-3 mx-1 mx-md-4 mt-5">
                To Cancel a request Please Enter the ISBN
              </p>
      <div className="container mt-5">
        

        <form method="PUT"  id="req-accept-form" className="row row-cols-3 mt-4">
          
            
            <div>
              
                {/* <label htmlFor="lname">
                </label> */}
                <input type="text" name="isbn" id="isbn" className="form-control" autoComplete="off"
                    value={isbn}
                    onChange={(e) => setISBN(e.target.value)}
                    placeholder="Enter the ISBN" />
            </div>
            <div>
              
                <button type="button" className="btn btn-primary btn-lg" style={{backgroundColor:"red"}} onClick={PutData} >Cancel Request</button>
            </div>
           
        </form>

    </div>
    </div>
  );
}

export default RequestViewer;