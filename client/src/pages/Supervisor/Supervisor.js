import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
// import Chart from "../../components/BarChart";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { TableItem, ReportTable } from "../../components/Table";
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

class Departments extends Component {
  constructor() {
    super();

    this.state = {

      // Add modal values
      // modalIsOpen: false,
      // openTitle: "",
      // openAuthor: "",
      // openStockquantity: 0,
      // openID: "",
      // addQuantity: "",
      // invAdded: false,
      // openprice: 0,

      // Book db info
      books: [],
      // title: "",
      // author: "",
      // synopsis: "",
      // stockquantity: "",
      bookdepartmentname: "",
      // price: "",
      // picture: "",
      productsales: "",

      //Department db info
      departments: [],
      overheadcost: "",
      departmentname: "",

      // Process sales
      salesbydept: {}

    };

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.loadBooksByQuantity = this.loadBooksByQuantity.bind(this);
    // this.quantitySelected = this.quantitySelected.bind(this);
    // this.calcDeptSales = this.calcDeptSales.bind(this);
  }

  // openModal(book) {
  //   this.setState({
  //     modalIsOpen: true,
  //     openTitle: book.title,
  //     openStockquantity: book.stockquantity,
  //     openID: book._id,
  //     openAuthor: book.author,
  //     openPrice: book.price,
  //     invAdded: false
  //   });
  // }

  // closeModal() {
  //   this.setState({
  //     modalIsOpen: false,
  //     addQuantity: ""
  //   });
  // }


  componentDidMount() {
    this.loadBooks();
    // this.loadDepartments();
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log("loadbooks fired");
        this.setState({ books: res.data, bookdepartmentname: "", productsales: "" });
        this.loadDepartments();
      })
      .catch(err => console.log(err));
  };

  loadDepartments = () => {
    API.getDepartments()
      .then(res => {
        console.log("loaddepartments fired")
        this.setState({ departments: res.data, overheadcost: "", departmentname: "", salesbydept: {} },
          // Can't run department sales until the departments load
          function() {
            this.setState({ salesbydept: this.calcDeptSales() });
            console.log("calcdept fired")
          })
      })
      .catch(err => console.log(err));
  };

  // Function to go thru books, aggregate the sales by department
  calcDeptSales = () => {
    // Obj to hold departments and total sales for the dept
    let bookdept = {};
    // Function to check if the book's department is already in the above array
    let deptIn = (book) => {
      return (bookdept[book.departmentname]);
    };
    // Going through all the books and adding up the sales per dept
    this.state.books.map(book => {
      if (deptIn(book)) {
        console.log("the book department already exists in the department array, incrementing deptsales");
        bookdept[book.departmentname] = { deptsales: bookdept[book.departmentname].deptsales + book.productsales };
      }
      else {
        console.log("the book department does not exist in the department array, adding it");
        bookdept[book.departmentname] = { deptsales: book.productsales };
      }
      return ("nothing");
    })
    // Sending back the object with all the department and sales totals for each dept
    return (bookdept);
  };

  // updateSalesByDept = () => {
  //   this.setState({ salesbydept: this.calcDeptSales() })
  // }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("handlesubmit fired");
    if (this.state.departmentname && this.state.overheadcost) {
      API.saveDepartment({
        departmentname: this.state.departmentname,
        overheadcost: this.state.overheadcost
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  // handleAddFormSubmit = event => {
  //   event.preventDefault();
  //   let newQuant = (this.state.openStockquantity + parseInt(this.state.addQuantity, 10));
  //   API.UpdateBook(this.state.openID, {
  //     stockquantity: newQuant
  //   })
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  //   this.setState({
  //     invAdded: true,
  //     newQuant: newQuant
  //   });
  // };

  commafy(num) {
    var str = (num / 100).toFixed(2).split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  render() {
    return (
      <Container fluid>
        <Row >
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Supervisor Reports</h1>
            </Jumbotron>
            {/* {console.log("salesbydept length", Object.getOwnPropertyNames(this.state.salesbydept).length == 0)} */}
            {Object.getOwnPropertyNames(this.state.salesbydept).length ? (
              // <div style={{height: '300px', overflow: 'hidden', 'overflowY': 'scroll'}}>
              <ReportTable>
                {this.state.departments.map(department => (
                  <TableItem key={department._id}>
                    <td>{department.departmentname}</td>
                    <td>${this.commafy(department.overheadcost)}</td>
                    {this.state.salesbydept[department.departmentname] ?
                      <td>${this.commafy(this.state.salesbydept[department.departmentname].deptsales)}</td> :
                      <td>$0.00</td>}
                    {/* <td>Total Sales</td> */}
                    {this.state.salesbydept[department.departmentname] ?
                      <td>${this.commafy(this.state.salesbydept[department.departmentname].deptsales - department.overheadcost)}</td> :
                      <td>${this.commafy(0 - department.overheadcost)}</td>
                    }
                    {/* <td>${this.commafy(this.state.salesbydept[department.departmentname].deptsales - department.overheadcost)}</td> */}
                    {/* <td>${(book.price / 100).toFixed(2)}</td>
                    <td onClick={() => this.openModal({ ...book })}>{book.stockquantity}</td>
                    <td>{book.picture}</td> */}
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                  </TableItem>
                ))}
              </ReportTable>
              // </div>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>

        {/* <Row>
          <Col size="md-12 sm-12">
          <Jumbotron>
              <h1>The Chart</h1>
            </Jumbotron>
            <Chart />
          </Col>
        </Row> */}

        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Create a new Department</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.departmentname}
                onChange={this.handleInputChange}
                name="departmentname"
                placeholder="Department Name (required)"
              />
              <Input
                value={this.state.overheadcost}
                onChange={this.handleInputChange}
                name="overheadcost"
                placeholder="Overhead costs (no decimal - in cents) (required)"
              />
              <FormBtn
                disabled={!(this.state.departmentname && this.state.overheadcost)}
                onClick={this.handleFormSubmit}
              >
                Add Department
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

export default Departments;
