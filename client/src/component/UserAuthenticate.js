import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

// export const [userData, setUserData] = useState();
// export const UserDataContext = React.createContext();
const UserAuthenticate = () => {
    // const [userData, setUserData] = useState();

    const navigate = useNavigate();
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
            // console.log(data);
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
    <div></div>
  )
}

export default UserAuthenticate;
// export {UserDataContext};