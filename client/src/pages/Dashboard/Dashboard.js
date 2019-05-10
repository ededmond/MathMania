import React, { Component } from "react";
import { render } from "react-dom"; 
import "@devexpress/dx-react-grid"; 
import {
  Grid, 
  Table, 
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4"; 
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

// import DeleteBtn from "../../components/AlperComponents/DeleteBtn";
import Jumbotron from "../../components/AlperComponents/Jumbotron";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/AlperComponents/Grid";
// import { List, ListItem } from "../../components/AlperComponents/List";
// import { Input, TextArea, FormBtn } from "../../components/AlperComponents/Form";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props); 
    this.state = {
      columns: [
        {studentName: "name", title: "Student Name"}, 
        {timeSpent: "time", timeSpent:"Hours Spent"},
        {questionCategory:"questionCategory", questionCategory: "Question Category"}, 
        {numberQuestionsAnswered: "numQuestAns", numberQuestionsAnswered: "Number of Questions Answered" }, 
        {numberQuestionsCorrect:"numCorrect", numberQuestionsCorrect: "Number of Questions Correct"}, 
        {numberQuestionsWrong:"numWrong", numberQuestionsWrong: "Number of Questions Wrong"}, 
      ], 
      rows: [
        {time: "2 hours", name: "Jackie", questionCategory:"fractions", numQuestAns:"20", numCorrect:"15", numWrong: "5"}, 
        {time: "4 hours", name: "Lauren", questionCategory:"fractions", numQuestAns:"50", numCorrect:"30", numWrong: "20"}, 
        {time: "10 hours", name: "Emma", questionCategory:"fractions", numQuestAns:"100", numCorrect:"90", numWrong: "10"}, 
        {time: "5 hours", name: "Spencer", questionCategory:"fractions", numQuestAns:"30", numCorrect:"15", numWrong: "15"}, 
      ]
    }
  }

  render() {
    const { rows, columns } = this.state; 

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
            <h1>Student Data</h1>
            </Jumbotron>
            </Col>
            </Row>
            <Row>
              <Col size="md-6">
            {/* <form>
              <Input
                value={this.state.author} 
                onChange={this.handleInputChange}
                name="author"
                placeholder="Question"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="multiple choice or enter anwser"
              />
            </form> */}
          </Col>
        </Row>
        <Grid rows={rows} columns={columns}>
          <Table />
          <TableHeaderRow />
        </Grid>
      </Container>
      
    );
  }
}

export default Dashboard;
