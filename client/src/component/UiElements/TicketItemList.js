import React from "react";

import TicketItem from "./TicketItem";
import Card from "./Card";
import "./ItemList.css";

const TicketItemList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Nothing found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="item-list">
      {props.items.map((item) => (
        <TicketItem
          key={item._id}
          id={item._id}
          isbn={item.isbn}
          bookname={item.bookname}
        />
      ))}
    </ul>
  );
};

export default TicketItemList;
