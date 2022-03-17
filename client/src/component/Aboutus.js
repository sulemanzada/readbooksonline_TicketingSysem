import React from 'react'
// import {useNavigate} from "react-router-dom";

const Aboutus = () => {
    // const navigate = useNavigate();
    // const callAboutPage = async () =>{
    //     try{
    //         const res = await fetch('/about', {
    //             method:"GET",
    //             headers:{
    //                 Accept: "Application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             credentials: 'include'
    //         });
    //         const data = await res.json();
    //         console.log(data);
            
    //         if (!res === 200) {
    //             const error = new Error(res.error);
    //             throw error;
    //         }
    //     }catch(err){
    //         console.log(err);
    //         navigate('/Login');
    //     }
    // }
    // useEffect(() =>{
    //     callAboutPage();
    // }, []);

    return (
        <>
            <div className="vh-100 rainbow-gradient d-flex flex-column align-items-center justify-content-center" style={{  backgroundColor: "darkcyan"}}>          
           
                <h1 className="pt-5">About Us</h1>
                
                <p className="text-center h3 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                ReadBooks Online (RBO) went through a significant expansion in the past 10. We provide many services, like  request books and audiobooks.

                </p>
                <p className="text-center h3 fw-bold mb-4 mx-1 mx-md-4 mt-2">
                Although IT management is centralised in its head office, there are several other employees elsewhere
                </p>
            </div>
        </>
    )
}

export default Aboutus