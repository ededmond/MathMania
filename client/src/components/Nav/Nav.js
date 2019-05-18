import React, { Fragment } from "react";
import { NavLink, Link } from 'react-router-dom';
import './Nav.css';

const Nav = (props) => {
  let greeting;
  console.log('PROPS ', props)
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
    <nav className="navbar navbar-expand-lg navbar-dark" id= "nav">
        <a className="navbar-brand" href="/">
          <div id="logo">
            <img height="40%" width="40%" src="images/transparent-logo.png" alt="math-mania-logo" />
          </div>
        </a>

        <ul className="nav navbar-nav" id="nav-items">

        <li id= "play"className="nav-item">
            <Link to="/"
              className={window.location.pathname === "/" || window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
                  }>
              Let's Play
            </Link>
          </li> 

          {/* if you don't have a teacher code then you're the teacher */}
          {!props.user.teacherCode && 
          <React.Fragment>
          <li id= "progress" className="nav-item">
            <Link to="/classProgress"
              className={window.location.pathname === "/classProgress" ? "nav-link active" : "nav-link"}>
              Class Progress
            </Link>
          </li>

          <li id= "mgmt" className="nav-item">
            <Link to="/students"
              className={window.location.pathname === "/students" ? "nav-link active" : "nav-link"}>
              Class Management
            </Link>
          </li>
          </React.Fragment>
          }

          <li id="logout" className="nav-item">
            <NavLink to="/signin" 
              className="nav-link logout" 
              onClick={props.logout}>
              {greeting} - Logout
            </NavLink>
          </li>

        </ul>
        
    </nav>
  )
};

export default Nav;
