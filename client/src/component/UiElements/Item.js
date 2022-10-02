import React from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import "./Item.css";

const Item = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`users/${props.id}`}>
          {/*  It should be users or I guess it should be a dynamic vaiable*/}
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.bookCount} {props.bookCount === 1 ? "Book" : "Books"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default Item;
