import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from "socket.io-client"
import './App.css';
import Student from "./Student"
import Teacher from "./Teacher"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect("http://localhost:8000");
}

getUserHandler = (e) => {
  this.socket.emit("get-users");
};

  render() {
    return (
      <div className="App">
        <h1>Feedback App</h1>
        <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/student/">Student</Link>
            </li>
            <li>
              <Link to="/teacher/">Users</Link>
            </li>
          </ul>
        </nav>
<div style={{background:"white", padding:"10px"}}>
        <Route path="/" exact render={()=><Index socket={this.socket}/>} />
        <Route path="/student/" render={()=><Student socket={this.socket}/>}/>
        <Route path="/teacher/" render={()=><Teacher socket={this.socket}/>} />
</div>
      </div>
    </Router>
        <button onClick={this.getUserHandler}>Get active users</button>
      </div>
    );
  }
}

export default App;
