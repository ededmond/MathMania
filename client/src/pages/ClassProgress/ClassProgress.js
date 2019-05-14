import React from "react";
import "@devexpress/dx-react-grid"; 
import {
  Grid, 
  Table, 
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4"; 
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import Jumbotron from "../../components/AlperComponents/Jumbotron";
import { Col, Row, Container } from "../../components/AlperComponents/Grid";
import AUTH from "../../utils/AUTH";

class ClassProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { studentName: "name", title: "Student Name" },
        { timeSpent: "time", title: "Hours Spent" },
        {
          level: "grades",
          title: "Student Level"
        },
        {
          numberQuestionsAnswered: "numQuestAns",
          title: "Questions Answered"
        },
        {
          numberQuestionsCorrect: "numCorrect",
          title: "Answered Correct"
        },
        {
          numberQuestionsWrong: "numWrong",
          title: "Answered Incorrect"
        }
      ],
      rows: [
        {
          
        }

      ]
    };
  }

  componentDidMount = () => {
    AUTH.getStudents()
      .then(response => {
        console.log("students: ", response.data);
        this.setState({
          rows: response.data
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { rows, columns } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <h1>Student Data</h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-6" />
        </Row>
        <Row>
          <Grid rows={rows} columns={columns}>
            <Table />
            <TableHeaderRow />
          </Grid>
        </Row>
      </Container>
    );
  }
}

export default ClassProgress;
