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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <Col size="md-9">
      <Link  className="navbar-brand" to="/" >
      <img height="40%" width="40%" src="/images/logo.PNG"/>
      </Link>
      
      <div>
        <ul className="navbar-nav">
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
        </ul>
      </div>
  </Col>
          
      <Col size="md-3">
        <div className="float-right" id="logout">
        {greeting} - <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
        </div>
      </Col>
    </nav>

  )
};

export default Nav;
