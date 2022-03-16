import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const callAboutPage = async () =>{
        try{
            const res = await fetch('/about', {
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
            console.log(userData.role);
            console.log("data",data.role);
            
            if (!res === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
            navigate('/Login');
        }
    }
    useEffect(() =>{
        callAboutPage();
    }, []);

    return (
        <>

            <div className="row row-cols-2 ms-4">
                
                <div class="col h3 fw-bold mt-2">First Name</div>
                <div class="col h3 fw-bold mt-2">{userData.fname}</div>
                <div class="col h3 fw-bold mt-2">Last Name</div>
                <div class="col h3 fw-bold mt-2">{userData.lname} </div>
                <div class="col h3 fw-bold mt-2">Email Address</div>
                <div class="col h3 fw-bold mt-2">{userData.email}</div>
                <div class="col h3 fw-bold mt-2">Role</div>
                <div class="col h3 fw-bold mt-2">{userData.role}</div>
            </div>

        </>
    )
}

export default UserProfile