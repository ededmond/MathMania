import React, { Component } from "react";
import DeleteBtn from "../../components/AlperComponents/DeleteBtn";
import Jumbotron from "../../components/AlperComponents/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/AlperComponents/Grid";
import { List, ListItem } from "../../components/AlperComponents/List";
import { Input, TextArea, FormBtn } from "../../components/AlperComponents/Form";

import FractionContainer from "../../components/Fraction/Fraction-Container";
import QuestionGenerator from '../../components/QuestionGenerator';

class Game extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row >
          <Col size="md-12">
            {/* <Jumbotron>
              {/* <h1>Fractions are Fun!</h1> */}
            {/* </Jumbotron> */} */}
            </Col>
            </Row>
            <Row id="content-div">   
              {/* <Col size="md-6"> */}
            {/* <form> */}
              {/* <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              /> */}
              {/* <Input
                value={this.state.author} 
                onChange={this.handleInputChange}
                name="author"
                placeholder="Question"
              /> */}
              {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="multiple choice or enter anwser"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form> */}
          {/* </Col> */}
          <Col size="md-6" >
            {/* <Jumbotron>
              <h1></h1>
            </Jumbotron> */}
            {/* {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List> */}
            {/* ) : (
              // <h3>No Results to Display</h3> */}
              <FractionContainer />
            {/* )} */}
          </Col>

          <Col size="md-6">
          <QuestionGenerator/>
          </Col>
           
        </Row>
       
      </Container>
    );
  }
}

export default Game;
