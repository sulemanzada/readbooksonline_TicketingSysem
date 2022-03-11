import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";

const Aboutus = () => {
    const navigate = useNavigate();
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
            
            if (!res === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log("wargy");
            console.log(err);
            navigate('/Login');
        }
    }
    useEffect(() =>{
        callAboutPage();
    }, []);

    return (
        <>

            <h1 className="pt-5">About</h1>
            <p>About us</p>

        </>
    )
}

export default Aboutus