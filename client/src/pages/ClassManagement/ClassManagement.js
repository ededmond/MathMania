import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/AlperComponents/Grid";
import Jumbotron from "../../components/AlperComponents/Jumbotron";
import AUTH from "../../utils/AUTH";
import $ from "jquery";
import "./class.css";
class ClassManagement extends Component {
  state = {
    students: []
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount = () => {
    AUTH.getStudents().then(response => {
      console.log("students: ",response.data);
      this.setState({
        students: response.data
      })
      console.log(this.state);
    }).catch(err => {
      console.log(err);
    })
  }
  

  updateStudent = event => {
    AUTH.updateStudent(event.target.value,$("#"+event.target.value).val());
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h2>Your Teacher Code: </h2>
              <h1>
                {this.props.user._id}
              </h1>
              <p>(Give this to your students when they sign up)</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row id = "managment-row">
          <Col size="md-8 col-centered">
            {this.state.students.map((student,i) => {
              return(<article className ="row" key={student._id}>
                <div className = "col-6"><h1>{student.firstName} {student.lastName}</h1></div>
                <div className = "col-3">
                  <select className="btn btn-info dropdown-toggle" id = {student._id} defaultValue = {student.difficulty}>
                    <option value = "beginner">Beginner</option>
                    <option value = "intermediate">Intermediate</option>
                    <option value = "advanced">Advanced</option>
                  </select>
                </div>
                <div className = "col-3">
                  <button class="fraction-button btn btn-success" onClick = {this.updateStudent} value={student._id}>Update</button>
                </div>
              </article>)
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClassManagement;
