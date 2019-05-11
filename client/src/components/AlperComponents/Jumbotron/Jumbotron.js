import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ margin: 0, height: 300, clear: "both", paddingTop: 120, textAlign: "center", backgroundImage: "url(" + "https://backgroundcheckall.com/wp-content/uploads/2017/12/cartoon-background-art-3.png" + ")", backgroundSize: "cover" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
