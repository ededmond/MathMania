import React from "react";
import "@devexpress/dx-react-grid"; 
import {
  Grid, 
  Table, 
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4"; 
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
//import Jumbotron from "../../components/AlperComponents/Jumbotron";
import { Col, Row, Container } from "../../components/AlperComponents/Grid";
import AUTH from "../../utils/AUTH";
import Acrylic from 'react-acrylic'; 

class ClassProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "firstName", title: "Student Name",
        getCellValue:(row,columnName) => {
        return (
          row.firstName + " " + row.lastName
        ); 
      } 
    },
        {
          name: "grades",
          title: "Beginner Score",
          getCellValue: (row,columnName) => {
            return (
              row.grades.beginner.correct +
              "/" +
              row.grades.beginner.total
            );
          }
        },
        {
          name: "grades",
          title: "Intermediate Score", 
          getCellValue: (row,columnName) => {
            return (
              row.grades.intermediate.correct + 
              "/" + 
              row.grades.intermediate.total
            );
          }
        },
        {
          name: "grades",
          title: "Advanced Score", 
          getCellValue: (row, columnName) => {
            return (
              row.grades.advanced.correct + 
              "/" + 
              row.grades.advanced.total
            );
          }
        }
      ],
      rows: [
        
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
        <Acrylic
          colorOverlay='#eee'
          opacity='0.4'

          position='absolute'
          top='100px'
          left='100px'
          width='1000px'
          height='600px'

          blur={40}
          borderRadius='2px'
          borderRadius='2px'
        >
        <Row>
            <Col size="md-12">
              <h1 id="title">Student Data</h1>
            </Col>
        </Row>
        <Row>
          <Col size="md-6" />
        </Row>
        <Row>
          <Grid className="grid" rows={rows} columns={columns}>
            <Table />
            <TableHeaderRow />
          </Grid>
        </Row>
        </Acrylic>
    );
  }
}

export default ClassProgress;
