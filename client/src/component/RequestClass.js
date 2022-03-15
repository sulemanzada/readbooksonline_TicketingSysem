import React, { Component } from 'react';
import Requests from './Requests';

class RequestClass extends Component {
   constructor(props) {
       super(props);
       this.state = {
           requests: [],
           error: null
       }
   } 

   render() {
       console.log(this.state.requests);
       let data = this.state.requests || {};
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
                   {data}
               </ul>
               
               </div>
       );
   }

    componentDidMount() {
        fetch('/requestlist')
        .then(data => data.json())
        .then(res => {
            if (res.error)
                this.setState({ error: res.message });

            let temp = [];
            res.forEach(item => {
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
            });
            // console.log("t", temp);
            this.setState( {requests: temp} );
        });
    }
}

export default RequestClass;