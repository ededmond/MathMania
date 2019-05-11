import React from "react"
import "./card.css";

export const Card = (props) => (
  <div className="card">
    <div className="card-header bg-primary" style={{color: '#fff'}}>
      <h5>{props.title}</h5>
      <img class="card-img-top" src="/images/logo.PNG" alt="Card image cap"></img>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
