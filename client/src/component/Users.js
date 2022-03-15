import React from 'react';

const Users = (props) => {
    return (
        <li>{props._id} {props.fname} {props.lname} {props.email} {props.role}</li>
    );
}

export default Users;