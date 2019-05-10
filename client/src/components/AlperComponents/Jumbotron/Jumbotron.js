import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center", backgroundImage: "url(" + "https://cdn.pixabay.com/photo/2018/01/22/11/09/abstract-3098692_960_720.jpg" + ")", backgroundSize: "cover" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
