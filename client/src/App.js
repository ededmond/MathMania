import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Game from './pages/Game';
import ClassManagement from "./pages/ClassManagement";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import ClassProgress from './pages/ClassProgress'; 
import TeacherAlert from "./components/TeacherAlert";

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null
    };
  }
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}

	render() {
		return (
      <div className="App">
        {this.state.loggedIn && (
          <div>
            <Nav user={this.state.user} logout={this.logout} />
            <div className="main-view">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => <Game user={this.state.user} />}
                />
                <Route
                  exact
                  path="/game"
                  component={() => <Game user={this.state.user} />}
                />
                {<Route exact path="/classProgress" component={() => <ClassProgress user={this.state.user} />} />}
                <Route exact path="/students" component={() => <ClassManagement user={this.state.user} />} />
                 {<Route
                  exact
                  path="/classProgress"
                  component={() => <ClassProgress user={this.state.user} />}
                />}

                <Route component={NoMatch} />
              </Switch>
            </div>
            {!this.state.user.teacherCode && <TeacherAlert user = {this.state.user}/>}
          </div>
        )}
        {!this.state.loggedIn && (
          <div className="auth-wrapper" style={{ paddingTop: 40 }}>
            <Switch >
            <Route
              exact
              path="/"
              component={() => <LoginForm login={this.login} />}
            />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/signin" component={() => <LoginForm login={this.login} />} />
            <Route component={() => <LoginForm login={this.login} />} /> 
            </Switch>          
          </div>
        )}
      </div>
    );
	}
}

export default App;
