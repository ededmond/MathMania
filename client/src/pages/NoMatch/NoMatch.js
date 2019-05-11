import React from "react";
import { Col, Row, Container } from "../../components/AlperComponents/Grid";
import Jumbotron from "../../components/AlperComponents/Jumbotron";
import axios from "axios";

const NoMatch = () => {

  // const postClick = () => {(
  //   axios.post("/auth/grades",{
  //     difficulty: "beginner",
  //     correct: true
  //   }).then(response=> {
  //     console.log(response);
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // )};

  return (<Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
              {/* <button onClick = {postClick}>post to grades</button> */}
            </span>
          </h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>)
};

export default NoMatch;
