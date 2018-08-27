import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { Table, TableItem } from "../../components/Table";
import { Input, TextArea, FormBtn } from "../../components/Form";
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
      // sort click value
      sortClick: "ascending",
      // quantity click value
      quantityClick: false,
      newQuant: 0,
      // Add modal values
      modalIsOpen: false,
      openTitle: "",
      openAuthor: "",
      openStockquantity: 0,
      openID: "",
      addQuantity: "",
      invAdded: false,
      openprice: 0,
      // db info
      books: [],
      title: "",
      author: "",
      synopsis: "",
      stockquantity: "",
      departmentname: "",
      price: "",
      picture: ""
    };

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.loadBooksByQuantity = this.loadBooksByQuantity.bind(this);
    // this.quantitySelected = this.quantitySelected.bind(this);
  }

  openModal(book) {
    this.setState({
      modalIsOpen: true,
      openTitle: book.title,
      openStockquantity: book.stockquantity,
      openID: book._id,
      openAuthor: book.author,
      openPrice: book.price,
      invAdded: false
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      addQuantity: ""
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
        this.setState({ books: res.data, title: "", author: "", synopsis: "", departmentname: "", price: "", stockquantity: "", picture: "" })
      )
      .catch(err => console.log(err));
  };

  // loadBooksByQuantity = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({
  //         books: res.data.sort(
  //           (obj1, obj2) => obj1.stockquantity - obj2.stockquantity
  //         )
  //       })
  //     )
  //     .catch(err => console.log(err));
  // };

  booksAsc = () => {
    this.setState({
      books: this.state.books.sort(
        (obj1, obj2) => obj1.stockquantity - obj2.stockquantity),
      sortClick: "decending"
    })
  }

  booksDsc = () => {
    this.setState({
      books: this.state.books.sort(
        (obj1, obj2) => obj2.stockquantity - obj1.stockquantity),
      sortClick: "ascending"
    })
  }

  quantitySelected = () => {
    if (this.state.sortClick === "ascending") {
      return (this.booksAsc())
    }
    else {
      return (this.booksDsc())
    }
  }

  alertQuantity = () => {
    this.setState({
      quantityClick: true
    })
    alert("Quantity clicked!");
  }

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
        synopsis: this.state.synopsis,
        departmentname: this.state.departmentname,
        price: this.state.price,
        stockquantity: this.state.stockquantity,
        picture: this.state.picture || null
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  handleAddFormSubmit = event => {
    event.preventDefault();
    let newQuant = (this.state.openStockquantity + parseInt(this.state.addQuantity, 10));
    API.UpdateBook(this.state.openID, {
      stockquantity: newQuant
    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
    this.setState({
      invAdded: true,
      newQuant: newQuant
    });
  };

  render() {
    return (
      <Container fluid>
        <Row >
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Inventory</h1>
            </Jumbotron>
            {this.state.books.length ? (
              // <div style={{height: '300px', overflow: 'hidden', 'overflowY': 'scroll'}}>
              <Table onClick={this.quantitySelected}>
                {this.state.books.map(book => (
                  <TableItem key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.synopsis}</td>
                    <td>{book.departmentname}</td>
                    <td>${(book.price / 100).toFixed(2)}</td>
                    <td id="stockquant" onClick={() => this.openModal({ ...book })}>{book.stockquantity}</td>
                    <td>${(book.productsales / 100).toFixed(2)}</td>
                    <td>{book.picture}</td>
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                  </TableItem>
                ))}
              </Table>
              // </div>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Add to inventory</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <Input
                value={this.state.departmentname}
                onChange={this.handleInputChange}
                name="departmentname"
                placeholder="Department (required)"
              />
              <Input
                value={this.state.price}
                onChange={this.handleInputChange}
                name="price"
                placeholder="Price (no decimal - in cents - required)"
              />
              <Input
                value={this.state.stockquantity}
                onChange={this.handleInputChange}
                name="stockquantity"
                placeholder="Stock Quantity (required)"
              />
              <Input
                value={this.state.picture}
                onChange={this.handleInputChange}
                name="picture"
                placeholder="http://www.yourhost.com/yourpicture.jpg"
              />

              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>

        {/* This is the modal for modifying the inventory quantity */}
        <Modal
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Quantity Modal"
        >

          {!this.state.invAdded ? (
            <div>
              <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.openTitle} by {this.state.openAuthor}</h2>
              {this.state.openStockquantity} copies currently in the inventory.
          <form>
                How many additional copies are you adding?
              <Input
                  value={this.state.addQuantity}
                  onChange={this.handleInputChange}
                  name="addQuantity"
                  placeholder="Quantity"
                />
                <FormBtn
                  disabled={(this.state.addQuantity < 1)}
                  onClick={this.handleAddFormSubmit}
                >
                  Add
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
                {this.state.addQuantity} copies added, we now have {this.state.newQuant} copies in the inventory.
              </div>)}
        </Modal>

      </Container>
    );
  }
}

export default Books;
