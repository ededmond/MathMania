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

// import API from "../../utils/API";
// import { Link } from "react-router-dom";
// import DeleteBtn from "../../components/AlperComponents/DeleteBtn";
// import { render } from "react-dom"; 
// import { List, ListItem } from "../../components/AlperComponents/List";
// import { Input, TextArea, FormBtn } from "../../components/AlperComponents/Form";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { studentName: "name", title: "Student Name" },
        { timeSpent: "time", title: "Hours Spent" },
        {
          questionCategory: "questionCategory",
          title: "Question Category"
        },
        {
          numberQuestionsAnswered: "numQuestAns",
          title: "Number of Questions Answered"
        },
        {
          numberQuestionsCorrect: "numCorrect",
          title: "Number of Questions Correct"
        },
        {
          numberQuestionsWrong: "numWrong",
          title: "Number of Questions Wrong"
        }
      ],
      rows: [
        //   time: "2 hours",
        //   name: "Jackie",
        //   questionCategory: "fractions",
        //   numQuestAns: "20",
        //   numCorrect: "15",
        //   numWrong: "5"
        // },
        // {
        //   time: "4 hours",
        //   name: "Lauren",
        //   Category: "fractions",
        //   numQuestAns: "50",
        //   numCorrect: "30",
        //   numWrong: "20"
        // },
        // {
        //   time: "10 hours",
        //   name: "Emma",
        //   Category: "fractions",
        //   numQuestAns: "100",
        //   numCorrect: "90",
        //   numWrong: "10"
        // },
        // {
        //   time: "5 hours",
        //   name: "Spencer",
        //   questionCategory: "fractions",
        //   numQuestAns: "30",
        //   numCorrect: "15",
        //   numWrong: "15"
        // }
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
            <Jumbotron>
              <h1>Student Data</h1>
            </Jumbotron>
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

export default Dashboard;
