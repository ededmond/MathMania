import React from "react"
import "./card.css";

export const Card = (props) => (
  <div className="card">
    <div className="card-header" style={{color: '#fff'}}>
      <h5>{props.title}</h5>
      <img class="card-img-top" src="/images/transparent-logo.PNG" alt="Card image cap" />
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
