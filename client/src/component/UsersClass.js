import React, { Component } from 'react';
// import Users from './Users';

const Users = (props) => {
    return (
        <div className="row row-cols-5">
                
                <div class="col">{props._id}</div>
                <div class="col">{props.fname}</div>
                <div class="col">{props.lname} </div>
                <div class="col">{props.email}</div>
                <div class="col">{props.role}</div>
            </div>
    
    );
}

class UsersClass extends Component {
    
   constructor(props) {
       super(props);
       this.state = {
           users: [],
           error: null
       }
   } 

   render() {
    //    console.log(this.state.users);
       let data = this.state.users || {};
    //    console.log("data",data);
       return (
           <div>
               <ul>
           <div className="row row-cols-5">

               
                 <div>ID</div>
                 <div>First Name</div>
                 <div>Last Name</div>
                 <div>Email</div>
                 <div>Role</div>
            
             </div>
             </ul>
               <ul>
                   {data}
               </ul>
           </div>
       );
   }

    componentDidMount() {
        fetch('/user/userlist')
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