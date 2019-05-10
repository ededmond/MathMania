import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/AlperComponents/Grid";
import Jumbotron from "../../components/AlperComponents/Jumbotron";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
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
        <Row>
          <Col size="md-10 md-offset-1">
            {this.state.students.map(student => {
              return(<article key={student._id}>
                <h1>{student.firstName} {student.lastName}</h1>
              </article>)
            })}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClassManagement;
