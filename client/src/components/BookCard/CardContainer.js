import React from "react";
import "./BookCard.css";

export const CardContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="card-deck">
        {children}
      </div>
    </div>
  );
};
