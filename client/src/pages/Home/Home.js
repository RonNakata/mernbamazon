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
// import { Input, FormBtn } from "../../components/Form";
import Modal from 'react-modal';



class Home extends Component {

  constructor(props) {
    super(props);

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
            <h5 style={{ "textAlign": "center" }}>
              <Jumbotron>

                <p>Bamazon is an ecommerce demo.. it has some neat features, some broken features, and many unimplemented features.</p>
              </Jumbotron>

              {!this.props.loggedIn ?
                <p>First, please signup and then login by going <Link to={"/signup"}><strong> here</strong></Link>.</p>
                :
                <p>Thanks for logging in</p>
              }


              <p>Customers, check out our book inventory <Link to={"/customers"}><strong> here</strong></Link>.</p>
              <p>Managers, view and edit book inventory<Link to={"/manager"}><strong> here</strong></Link>.</p>
              <p>Supervisors, view department profit and create new departments <Link to={"/supervisor"}><strong> here</strong></Link>.</p>
            </h5>
          </Col>
        </Row>



      </Container>
    );
  }
}


export default Home;
