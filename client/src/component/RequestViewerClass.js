import React, { Component } from 'react';
import Requests from './Requests';
// import { useNavigate } from "react-router-dom";

// const callAboutPage = async () =>{
    
// }

class RequestViewerClass extends Component {
    
   constructor(props) {
       super(props);
       this.state = {
           requests: [],
           error: null
       }
   } 

   
   render() {
    //    console.log(this.state.requests);
       let data = this.state.requests || {};
    //    let uRes = this.state.requests || {};
    //    let uemail = this.state.requests  || {};
    //    console.log("data",data);
       return (
           <div>
               <ul>
           <div className="row row-cols-6">

               
                 <div>ISBN</div>
                 <div>BOOK NAME</div>
                 <div>AUTH NAME</div>
                 <div>PRICE</div>
                 <div>STATUS</div>
                 <div>SUBMITTER</div>
            
             </div>
             </ul>

             
               <ul>
                   {/* {console.log("udata", uData)} */}
                   {data}
               </ul>
               
               </div>
       );
   }

    componentDidMount() {
        let uEmail ={};
        // let uRes = {};
        fetch('/about')
        .then(uData => uData.json())
        .then(uRes =>{
            if (uRes.Error) {
                this.setState({error: uRes.message});
            }
            // console.log("uRes: ", uRes);
            // uemail = uRes.i
            uEmail = uRes.email;
            // console.log("uResEmail: ", uRes.email);
        });
        fetch('/requestlist')
        .then(data => data.json())
        .then(res => {
            if (res.error)
                this.setState({ error: res.message });

            let temp = [];
            res.forEach(item => {
                // console.log("uEmail: ",uEmail );
                // console.log("item.submitter:",item.submitter );
                if (uEmail === item.submitter) {
                    
                    temp.push(
                        <Requests 
                            key = {item._id}
                            _id = {item._id}
                            isbn = {item.isbn}
                            bookname = {item.bookname}
                            authname = {item.authname}
                            price = {item.price}
                            bookStatus = {item.bookStatus}
                            submitter = {item.submitter}
                        />
                    );
                }
                
            });
            // console.log("t", temp);
            this.setState( {requests: temp} );
            
        });
            
    }
}

export default RequestViewerClass;