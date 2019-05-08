import React from "react";
import Timer from "./Timer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Teacher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      currentRoom: null,
      currentRoomStatus: [],
      averageScore: null
    };
  }

  addRoom = data => {
    this.setState({
      rooms: [...this.state.rooms, data]
    });
  };
  componentDidMount() {
    this.props.socket.on("createdRoom", data => {
      this.setState({
        rooms: [...this.state.rooms, data]
      });
    });
  }

  createRoom = () => {
    let key = Math.floor(Math.random() * 1000);
    this.props.socket.emit("createRoom", key);
  };

  enterRoom = room => {
    this.props.socket.emit("enterRoom", room, true);
    this.setState({
      currentRoom: room
    });
  };

  studentInput = () => {
    this.props.socket.emit("getRoomSnapshot", this.state.currentRoom);
    this.props.socket.on("usersInRoom", data => {
      this.setState({
        currentRoomStatus: data
      });
      console.log(this.state.currentRoomStatus);
      const numberOfUsers = this.state.currentRoomStatus.filter(
        user => user.role === "student"
      ).length;
      const filterUsersArray = this.state.currentRoomStatus.filter(
        user => user.role === "student"
      );
      const scoreArray = filterUsersArray.map(user => {
        return parseInt(user.value);
      });
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const totalScore = scoreArray.reduce(reducer);
      const averageScore = totalScore / numberOfUsers;
      console.log("score array: ", scoreArray);
      console.log("total score: ", totalScore);
      console.log("number of users: ", numberOfUsers);
      console.log("average score: ", averageScore);
      this.setState({
        averageScore: averageScore
      });
    });
  };

  render() {
    return (
      <div>
        <h2>Teacher</h2>
        {this.state.currentRoom !== null ? (
          <div>
            <h3>{this.state.currentRoom}</h3>
            <p>{this.state.averageScore}</p>
          </div>
        ) : (
          ""
        )}

        <ul style={{ listStyleType: "none" }}>
          {this.state.rooms.map(room => {
            return (
              <Router>
                <button
                  key={room}
                  value={room}
                  onClick={() => {
                    this.enterRoom(room);
                  }}
                >
                  Room ID: {room}
                </button>
              </Router>
            );
          })}
        </ul>
        <div>
          <button onClick={this.studentInput}>Get user info</button>
        </div>
        <button onClick={this.startLecture}>Start counter!</button>
        <Timer />
      </div>
    );
  }
}
