import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { Wrapper, Row, Col } from "./BootstrapGrid";
import API from "../utils/API";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Modal from 'react-modal';

// import googleImage from "./googleButtons/btn_google_signin_dark_normal_web.png";

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

class Login extends Component {

  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      redirectTo: "",
      // Add modal values
      modalIsOpen: false
    }
    this.closeModal = this.closeModal.bind(this);

  }

  textInput = React.createRef();

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  handleLogin = event => {
    event.preventDefault();
    API.login({ email: this.state.email, password: this.state.password })
      .then((res) => {
        console.log("RES", res);
        this.props.setUser(res.data.user)
        this.setState({
          redirectTo: "/"
        });
      })
      .catch(err => {
        this.openModal();
        console.log("Error executing handleLogin: ", err)
      });

  };

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }
    return (
      <Wrapper>
        <Container fluid>
          <Row >
            <Col size="md-12 sm-12">
              <Jumbotron>
                <h1>Login</h1>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
        <form>
          <Row>
            <Col span={2} offset={3}>
              <label>Email: </label>
            </Col>
            <Col span={3}>
              <input ref={this.textInput} name="email" type="text" value={this.state.email} required onChange={this.handleInputChange} />
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={3}>
              <label>Password: </label>
            </Col>
            <Col span={4}>
              <input name="password" type="password" value={this.state.password} required onChange={this.handleInputChange} />
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={3}>
              <button onClick={this.handleLogin}>Submit</button>
            </Col>
          </Row>
        </form>


        {/* This is the modal for modifying the inventory quantity */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Quantity Modal"
        >
            <h1>Invalid login credentials, please try again.</h1>
        </Modal>

      </Wrapper>
    );
  }
}

export default Login;