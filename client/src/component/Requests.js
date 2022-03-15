import React from 'react';

const Requests = (props) => {
    return (
        
            <div className="row row-cols-6">
                <div class="col">{props.isbn}
                
                </div>
                <div class="col">{props.bookname}</div>
                <div class="col">{props.authname}</div>
                <div class="col">{props.price}</div>
                <div class="col">{props.bookStatus}</div>
                <div class="col">{props.submitter}</div>
            </div>
            
    );
}

export default Requests;