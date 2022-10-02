import React from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import "./Item.css";

const TicketItem = (props) => {
  console.log(props);
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/RequestList/${props.id}`}>
          <div className="user-item__info">
            <h2>{props.bookname ? props.bookname : "No Name Provied"}</h2>
            <h3>{props.isbn}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default TicketItem;
