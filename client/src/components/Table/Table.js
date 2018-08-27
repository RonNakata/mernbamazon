import React from "react";
import "./Table.css";

export const Table = (props) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th style={{width:'30%'}} scope="col">Synopsis</th>
          <th scope="col">Department</th>
          <th style={{width:'6%'}} scope="col">Price</th>
          <th id="quantity" style={{width:'6%'}} scope="col" onClick={props.onClick}>Quantity</th>
          <th style={{width:'8%'}} scope="col">Sales</th>
          <th style={{width:'20%'}} scope="col">Picture</th>
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
  );
};
