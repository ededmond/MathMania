import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Col } from '../AlperComponents/Grid';
import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username} </strong>
			</Fragment>
		)
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id= "nav">
        <a class="navbar-brand" href="/">
          <div id="logo">
            <img height="40%" width="40%" src="images/transparent-logo.png"/>
          </div>
        </a>
        

    

        <ul class="nav navbar-nav" id="nav-items">

        <li id= "play"className="nav-item">
            <Link to="/"
              className={window.location.pathname === "/" || window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
                  }>
              Let's Play
            </Link>
          </li>

          <li id= "progress" className="nav-item">
            <Link to="/"
              className={window.location.pathname === "/students" ? "nav-link active" : "nav-link"}>
              Class Progress
            </Link>
          </li>

          <li id= "mgmt" className="nav-item">
            <Link to="/"
              className={window.location.pathname === "/students" ? "nav-link active" : "nav-link"}>
              Class Management
            </Link>
          </li>

          <li id="logout" className="nav-item">
            <Link to="#" 
              className="nav-link logout" 
              onClick={props.logout}>
              {greeting} - Logout
            </Link>
          </li>

        </ul>
        





  {/* <Col size="md-9"> */}
      {/* <Link  className="navbar-brand" to="/" >
      
      </Link> */}
      
      {/* <div>
        <ul className="navbar-nav">
        <li className="nav-item">
        <img height="40%" width="40%" src="/images/logo.PNG"/>
        </li>
          <li className="nav-item">
            <Link to="/"
              className={window.location.pathname === "/" || window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }>
              Class Progress
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/"
              className={window.location.pathname === "/students" ? "nav-link active" : "nav-link"}>
              Class Management
            </Link>
          </li>
        </ul> */}
      {/* </div> */}
  {/* </Col> */}
          

    </nav>

  )
};

export default Nav;
