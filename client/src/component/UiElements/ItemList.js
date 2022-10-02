import React from "react";

import Item from "./Item";
import Card from "./Card";
import "./ItemList.css";

const ItemList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Nothing found.</h2>
        </Card>
      </div>
    );
  }
  // console.log(props.items);
  return (
    <ul className="item-list">
      {props.items.map((item) => (
        <Item
          key={item._id}
          id={item._id}
          name={item.fname + " " + item.lname}
          email={item.email}
          bookCount={item.bookticket.length}
        />
      ))}
    </ul>
  );
};

export default ItemList;
