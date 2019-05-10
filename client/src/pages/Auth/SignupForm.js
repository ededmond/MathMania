import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/AlperComponents/Grid';
import { Card } from '../../components/AlperComponents/Card';
import { Input, FormBtn } from '../../components/AlperComponents/Form';
import AUTH from '../../utils/AUTH';

class SignupForm extends Component {

	constructor() {
    super();
    
		this.state = {
      firstName: '',
      lastName: '',
			username: '',
			password: '',
      confirmPassword: '',
      email: '',
      teacher: 'student',
      teacherCode: '',
			redirectTo: null
		};
  }
  
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
  }
  
	handleSubmit = (event) => {
		event.preventDefault();
		// TODO - validate!
		AUTH.signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
      email:this.state.email,
      teacher: this.state.teacher,
      teacherCode: this.state.teacherCode
    }).then(response => {
      console.log(response);
      if (!response.data.errmsg) {
        console.log('youre good');
        this.setState({
          redirectTo: '/'
        });
      } else {
        console.log('duplicate');
      }
    });
  }
  
	render() {
    console.log("got to signupform");
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    
		return (
      <Container>
        <Row>
          <Col size="md-3"></Col>
          <Col size="md-6">
            <Card title="Register for React Reading List">
              <form style={{marginTop: 10}}>
                <label htmlFor="username">First name: </label>
                <Input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <label htmlFor="username">Last name: </label>
                <Input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                <label htmlFor="username">Username: </label>
                <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <label htmlFor="email">Email: </label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password: </label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
                <label htmlFor="teacher">Are you a Teacher or a Student?: </label>
                <div className="form-group">
                  <select className="form-control" 
                    type="select" 
                    name="teacher"
                    value={this.state.teacher}
                    onChange={this.handleChange}
                    > 
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                {this.state.teacher==="student" && <div>
                <label htmlFor="teacherCode">Teacher Code:</label>
                <Input
                  type="password"
                  name="teacherCode"
                  value={this.state.teacherCode}
                  onChange={this.handleChange}
                />
                </div>}
                <Link to="/">Login</Link>
                <FormBtn onClick={this.handleSubmit}>Register</FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="md-3"></Col>
        </Row>
      </Container>
		)
	}
}

export default SignupForm;
