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

          <Nav loggedIn={this.state.loggedIn} logout={this.handleLogout} />
          <Switch>
            <Route exact path="/" render={() => <Home loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/books" render={() => <Books loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/manager" render={() => <Manager loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/supervisor" render={() => <Supervisor loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/customers" render={() => <Customers loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/customers/:id" render={() => <Buy loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/books/:id" render={() => <Detail loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/signup" render={() => <SignupForm loggedIn={this.state.loggedIn} user={this.state.user} />} />
            <Route exact path="/login" render={() => <Login loggedIn={this.state.loggedIn} setUser={this.setUser} />} />
            <Route component={NoMatch} />
          </Switch>


        </div>
      </Router>
    );
  }
}
// );

export default App;
