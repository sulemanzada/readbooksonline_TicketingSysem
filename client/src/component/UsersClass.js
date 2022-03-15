import React, { Component } from 'react';
import Users from './Users';

class UsersClass extends Component {
   constructor(props) {
       super(props);
       this.state = {
           users: [],
           error: null
       }
   } 

   render() {
       console.log(this.state.users);
       let data = this.state.users || {};
       console.log("data",data);
       return (
           <div>
               <p>Here are the users</p>
               <ul>
                   {data}
               </ul>
           </div>
       );
   }

    componentDidMount() {
        fetch('/userlist')
        .then(data => data.json())
        .then(res => {
            if (res.error)
                this.setState({ error: res.message });

            let temp = [];
            res.forEach(item => {
                temp.push(
                    <Users 
                        key = {item._id}
                        _id = {item._id}
                        fname = {item.fname}
                        lname = {item.lname}
                        email = {item.email}
                        role = {item.role}
                    />
                );
            });
            console.log("t", temp);
            this.setState( {users: temp} );
        });
    }
}

export default UsersClass;