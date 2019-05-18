import React from "react";
import "@devexpress/dx-react-grid"; 
import {
  Grid, 
  Table, 
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4"; 
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import { Col, Row} from "../../components/AlperComponents/Grid";
import AUTH from "../../utils/AUTH";
import Acrylic from 'react-acrylic'; 
import Jumbotron from "../../components/AlperComponents/Jumbotron";
import './progress.css'

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
          name: "beginner",
          title: "Beginner Score",
          getCellValue: (row,columnName) => {
            console.log(row.grades.beginner.correct +
              "/" +
              row.grades.beginner.total);
            return (
              row.grades.beginner.correct +
              "/" +
              row.grades.beginner.total
            );
          }
        },
        {
          name: "intermediate",
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
          name: "advanced",
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
          backgroundColor="rgba(275, 275, 275, .65); "
          backdropFilter="blur(10px)"


          // position='absolute'
          top='25%'
          left='10%'
          width='1200px'
          height='600px'
          align="center"

          blur={40}
          borderRadius='2px'
        >
  
        <Row id="title-div">
            <Col size="md-12">
              <h1 id="title">Student Data</h1>
            </Col>
        </Row>
      

        {/* <Row>
          <Col size="md-6" />
        </Row> */}
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
