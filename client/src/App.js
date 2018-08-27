import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Manager from "./pages/Manager";
import Supervisor from "./pages/Supervisor";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Detail from "./pages/Detail";
import Buy from "./pages/Buy";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { SignupForm, Login } from "./components";
import API from "./utils/API";

// const App = () => (

class App extends Component {
  state = {
    loggedIn: false,
    user: null,
    email: "",
    password: "",
  }

  setUser = (user) => {
    console.log("USER", user);
    this.setState({
      user,
      loggedIn: true
    })
  }

  handleLogout = () => {
    API.logout()
      .then(() => {
        this.setState({
          user: null,
          loggedIn: false
        });
      })
      .catch(err => console.log("Error executing handleLogout: ", err));
  }

  componentDidMount() {
    API.getCurrentUser()
      .then(res => {
        this.setState({
          user: res.data.user,
          loggedIn: res.data.user || false
        })
      })
  }

  render() {
    return (

      <Router>
        <div>
          {/* <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/manager" component={Manager} />
            <Route exact path="/supervisor" component={Supervisor} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/customers/:id" component={Buy} />
            <Route exact path="/books/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch> */}

          <Nav loggedIn={this.state.loggedIn} logout={this.handleLogout} />
          <Switch>
            <Route exact path="/" render={() => <Home loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/manager" component={Manager} />
            <Route exact path="/supervisor" component={Supervisor} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/customers/:id" component={Buy} />
            <Route exact path="/books/:id" component={Detail} />
            <Route exact path="/api/signup" component={SignupForm} />
            <Route exact path="/api/login" render={() => <Login setUser={this.setUser} />} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
// );

export default App;
