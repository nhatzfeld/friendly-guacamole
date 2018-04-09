import React, { Component } from "react";

import axios from "axios";

import "./App.css";

//THINK OF APP JS AS A STATIC ROUTER, IT IS ALWAYS ROUTING AND WHATEVER WE PUT IN HERE GOES ON EVERYTHING WE HAVE

class App extends Component {
  constructor() {
    super();
    this.state = {
      passwordText: "",
      usernameText: ""
    };
  }

  usernameHandler(val) {
    this.setState({ usernameText: val });
  }
  passwordHandler(val) {
    this.setState({ passwordText: val });
  }
  sendIt(username, password) {
    axios
      .put("/api/hereComesThePWTest", {
        username,
        password
      })
      .then(response => console.log(response));
  }
  createIt(username, password) {
    axios
      .put("/api/hereComesTheNewUser", {
        username,
        password
      })
      .then(response => console.log(response));
  }
  loginUser(username, password) {
    axios
      .put("/api/loginuser", {
        username: username,
        password: password
      })
      .then(response => {
        console.log(response);
        if (response.data.userid) {
          this.props.loadUserInfo(response);
          // this.setState({ Redirect: <Redirect to="/home" /> });
        } else if (response.data === "BADPW") {
          alert("You shall not pass!");
        } else if (response.data === "UnknownUser") {
          alert("UserName does not exist. Please make an account first.");
        }
      });
  }

  checkUser = () => {
    axios
      .get("/api/checkCookie")
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome!</h1>
        </header>
        <input onChange={e => this.usernameHandler(e.target.value)} />
        <input onChange={e => this.passwordHandler(e.target.value)} />
        <button
          onClick={() =>
            this.sendIt(this.state.usernameText, this.state.passwordText)
          }
        >
          Sign In
        </button>
        <button
          onClick={() =>
            this.createIt(this.state.usernameText, this.state.passwordText)
          }
        >
          Register
        </button>
        <button onClick={this.checkUser}>CHECK</button>
      </div>
    );
  }
}

export default App;
