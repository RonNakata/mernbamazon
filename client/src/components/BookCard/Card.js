import React from "react";
import "./BookCard.css";


export const Card = props => {
  return (
    <div className="col-auto mb-6">
      <div className="card mb-4">
        <img className="card-img-top img-fluid w-100" src={props.pic} alt={props.name}></img>
        <div className="card-body">
          <h5 className="card-title">{props.children}</h5>
        </div>
      </div>
    </div>
  )
};