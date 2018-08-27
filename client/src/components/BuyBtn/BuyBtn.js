import React from "react";
import "./BuyBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const BuyBtn = props => {
  return(
  <div className="buy-btn" {...props}>
    Buy
  </div>
)};

export default BuyBtn;
