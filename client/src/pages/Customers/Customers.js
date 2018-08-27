import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import BuyBtn from "../../components/BuyBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Card, CardContainer } from "../../components/BookCard";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import { Input, FormBtn } from "../../components/Form";
import Modal from 'react-modal';

// Modal style
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Books extends Component {

  constructor() {
    super();

    this.state = {
      // buy modal values
      modalIsOpen: false,
      openTitle: "",
      openAuthor: "",
      openStockquantity: 0,
      openID: "",
      buyQuantity: "",
      bought: false,
      openprice: 0,
      // db info
      books: [],
      title: "",
      author: "",
      synopsis: "",
      stockquantity: "",
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(book) {
    this.setState({
      modalIsOpen: true,
      openTitle: book.title,
      openStockquantity: book.stockquantity,
      openID: book._id,
      openAuthor: book.author,
      openPrice: book.price,
      bought: false
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ 
      modalIsOpen: false,
      buyQuantity: ""
    });
  }

  componentDidMount() {
    this.loadBooks();
  }

  componentWillMount() {
    Modal.setAppElement('body');
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

  handleBuyFormSubmit = event => {
    event.preventDefault();
    let newQuant = (this.state.openStockquantity - this.state.buyQuantity);
    API.UpdateBook(this.state.openID, {
      stockquantity: newQuant,
      productsales: (this.state.buyQuantity * this.state.openPrice)
    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
    this.setState({
      bought: true
    });

  };


  render() {
    return (
      <Container fluid>
        <Row>
          {/* <Col size="md-3">
            <Jumbotron>
              <h1>Sidebar</h1>
            </Jumbotron>

          </Col> */}
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Books:</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <CardContainer>
                {this.state.books.map(book => (
                  <Card key={book._id} pic={book.picture} name={book.title}>
                    <Link to={"/customers/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <p className="card-text">Price: ${(book.price / 100).toFixed(2)}</p>
                    <BuyBtn onClick={() => this.openModal({ ...book })} />
                  </Card>
                ))}
              </CardContainer>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>

        {/* This is the modal for making a purchase */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Buy Modal"
        >

          {!this.state.bought ? (
            <div>
              <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.openTitle} by {this.state.openAuthor}</h2>
              {this.state.openStockquantity} copies available for purchase at ${(this.state.openPrice/ 100).toFixed(2)} each.
          <form>
                How many copies of this title you would like to purchase?
              <Input
                  value={this.state.buyQuantity}
                  onChange={this.handleInputChange}
                  name="buyQuantity"
                  placeholder="Quantity"
                />
                <FormBtn
                  disabled={(this.state.buyQuantity < 1) || (this.state.buyQuantity > this.state.openStockquantity)}

                  onClick={this.handleBuyFormSubmit}
                >
                  Buy
              </FormBtn>
              </form>
            </div>
          ) :
            (
              <div>
                <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.openTitle} by {this.state.openAuthor}</h2>
                Thank you for your purchase of {this.state.buyQuantity} copies at a total cost of ${((this.state.buyQuantity * this.state.openPrice) / 100).toFixed(2) }
              </div>)}
        </Modal>

      </Container>
    );
  }
}


export default Books;
