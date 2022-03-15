import React from 'react';

const Requests = (props) => {
    return (
        
            <div className='container'>
            <table className="table">
            
            
            
            <th>

                 {props.isbn}
            </th>
            <th>
                {props.bookname}
            </th>
            <th>
                {props.authname}
            </th>
            <th>
             {props.price}
             </th>
             <th>
             {props.bookStatus}
             </th>
             <th>{props.submitter}
             </th>
            
            </table>
            </div>
            
    );
}

export default Requests;