import React, { Component } from "react";
import { Col, Row, Container } from "../../components/AlperComponents/Grid";
import FractionContainer from "../../components/Fraction/Fraction-Container";
import QuestionGenerator from '../../components/QuestionGenerator';

class Game extends Component {
  render() {
    return (
      <Container fluid>
        <Row >
          <Col size="md-12">
            </Col>
            </Row>
            <Row id="content-div">   
          <Col size="md-6" >
              <FractionContainer user= {this.props.user} />
          </Col>
          <Col size="md-6">
          <QuestionGenerator user= {this.props.user}/>
          </Col>
           
        </Row>
       
      </Container>
    );
  }
}

export default Game;
