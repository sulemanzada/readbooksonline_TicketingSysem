import React,  { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import UserAuthenticate from './UserAuthenticate';
import './signup.css'

const Ticket = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    
    useEffect(() =>{
        const callAboutPage = async () =>{
            try{
                const res = await fetch('/checkuserauth', {
                    method:"GET",
                    headers:{
                        Accept: "Application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const data = await res.json();
                console.log(data);
                setUserData(data);
                if (!res === 200) {
                    const error = new Error(res.error);
                    throw error;
                }
            }catch(err){
                console.log(err);
                navigate('/Login');
            }
        }
        callAboutPage();
    }, []);
    
    
    
    const [book , setBook] = useState({
        isbn : "",
        bookname: "",
        authname : "",
        genre : "",
        price: "",
        submitter:""
    })
    
    let name, value; 
    // const [records, setRecords] = useState([]);
    const handleInput = (e) =>{
        
        name = e.target.name;
        value = e.target.value;
        console.log(name, value);
        setBook({...book, [name]:value});
    }

    const PostData = async (e) =>{
        e.preventDefault();
        
        var {isbn , bookname, authname , genre, price, submitter } =  book;
        submitter = userData.email;
        const res = await fetch("/bookticket", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                isbn , bookname, authname , genre, price, submitter
            })

        });
        // console.log("submitter", submitter);
        const data = await res.json();
        // console.log("error status:", data);f
        // console.log(data.status);
        if (data.status === 422 || !data) {
            window.alert("Please Provide the complete details");
            console.log("Please Provide the complete details");
            
        }
        else if (data.status === 412) {
            window.alert("Book or ticket for the book already Exist");
            console.log("Book or ticket for the book already Exist");
        }
        else{
            window.alert("Ticket submitted successfully");
            console.log("Ticket submitted successfully");
            
            
        }
        navigate("/");
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

                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" >

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">Submit a Ticket</p>

                                        <form method="POST"  id="bookticketform" >

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <label htmlFor="isbn">
                                                   
                                                </label>
                                                <input type="text" name="isbn" id="isbn" className="form-control" autoComplete="off"
                                                    value = {book.name}
                                                    onChange={handleInput}
                                                    placeholder="Book ISBN*" />
                                                    {/* <p> {userData.email}</p> */}
                                                    {/* {console.log("from form", userData)} */}

                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <label htmlFor="bookname">
                                                   
                                                </label>
                                                <input type="text" name="bookname" id="bookname" className="form-control" autoComplete="off"
                                                    value = {book.name}
                                                    onChange={handleInput}
                                                    placeholder="Book Name" />

                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <label htmlFor="authname">
                                                   
                                                </label>
                                                <input type="text" name="authname" id="authname" className="form-control" autoComplete="off"
                                                    value = {book.name}
                                                    onChange={handleInput}
                                                    placeholder="Author Name" />

                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <label htmlFor="genre">
                                                   
                                                </label>
                                                <input type="text" name="genre" id="genre" className="form-control" autoComplete="off"
                                                    value = {book.name}
                                                    onChange={handleInput}
                                                    placeholder="Topic/Genre" />

                                            </div>
                                            
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <label htmlFor="price">
                                                   
                                                </label>
                                                <input type="text" name="price" id="price" className="form-control" autoComplete="off"
                                                    value = {book.name}
                                                    onChange={handleInput}
                                                    placeholder="Price of the book" />

                                            </div>
                                            
                                            
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={PostData}> Submit Ticket</button>
                                            </div>

                                        </form>

                                    </div>
                                    
                                    
                                </div>

                            </div>
                        </div>
                        {/* <div>

                            <h1>

                                {userData}
                            </h1>
                        </div> */}
                    </div>
                </div>
            </div>
            
        </section>  

    </>
  )
}

export default Ticket