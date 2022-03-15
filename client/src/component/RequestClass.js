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
       console.log("data",data);
       return (
           <div>
           <div className='container'>
               <table className="table">  
               <tr>  
                 {/* <th>ID</th>   */}
                 <th>ISBN</th>
                 <th>BOOK NAME</th>
                 <th>AUTH NAME</th>
                 <th>PRICE</th>
                 <th>STATUS</th>
                 <th>SUBMITTER</th>
             </tr>
             </table>
             </div>


             <div>
               <ul>
                   {data}
               </ul>
               </div>
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