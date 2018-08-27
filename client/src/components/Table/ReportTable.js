import React from "react";
import "./Table.css";

export const ReportTable = (props) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Department Name</th>
          <th scope="col">Overhead Costs</th>
          <th scope="col">Product Sales</th>
          <th scope="col">Total Profit</th>
          {/* <th style={{width:'6%'}} scope="col">Price</th>
          <th id="quantity" style={{width:'6%'}} scope="col" onClick={props.onClick}>Quantity</th>
          <th style={{width:'8%'}} scope="col">Sales</th>
          <th style={{width:'20%'}} scope="col">Picture</th> */}
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
  );
};
