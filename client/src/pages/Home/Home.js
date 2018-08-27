import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
// import BuyBtn from "../../components/BuyBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { Card, CardContainer } from "../../components/BookCard";
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

class Home extends Component {

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
      stockquantity: newQuant
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

          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Welcome to Bamazon</h1>
            </Jumbotron>
          </Col>
          <Col size="md-12 sm-12">
            <h3>Customers, check out our book inventory <Link to={"/customers"}>
              <strong> here</strong>
            </Link>
              .</h3>
          </Col>
          <Col size="md-12 sm-12">
            <h3>Managers, view and edit book inventory<Link to={"/manager"}>
              <strong> here</strong>
            </Link>
              .</h3>
          </Col>
          <Col size="md-12 sm-12">
            <h3>Supervisors, view department profit and create new departments <Link to={"/supervisor"}>
              <strong> here</strong>
            </Link>
              .</h3>
          </Col>

          <Col size="md-12 sm-12">
            <a href="/auth/google" className="button">
              <div>
                <span className="svgIcon t-popup-svg">
                  <svg
                    className="svgIcon-use"
                    width="25"
                    height="37"
                    viewBox="0 0 25 25"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                        fill="#34A853"
                      />
                      <path
                        d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                        fill="#EA4335"
                      />
                    </g>
                  </svg>
                </span>
                <span className="button-label">Sign in with Google</span>
              </div>
            </a>
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
              {this.state.openStockquantity} copies available for purchase at ${(this.state.openPrice / 100).toFixed(2)} each.
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
                Thank you for your purchase of {this.state.buyQuantity} copies at a total cost of ${((this.state.buyQuantity * this.state.openPrice) / 100).toFixed(2)}
              </div>)}
        </Modal>

      </Container>
    );
  }
}


export default Home;
