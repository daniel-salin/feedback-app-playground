import React from "react";

export default class Teacher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      currentRoom: null
    };
  }

  addRoom = data => {
    this.setState({
      rooms: [...this.state.rooms, data]
    });
    console.log(this.state);
  };
  componentDidMount() {
    this.props.socket.on("createdRoom", data => {
      this.setState({
        rooms: [...this.state.rooms, data]
      });
    });
  }

  createRoom = () => {
    console.log(this.state);
    console.log(this.props.socket);
    let key = Math.floor(Math.random() * 1000);
    this.props.socket.emit("createRoom", key);
    console.log(this.state);
  };

  enterRoom = room => {
    console.log(this.props.socket);
    this.props.socket.emit("enterRoom", room, true);
    this.setState({
      currentRoom: room
    });
  };

  studentInput = () => {
    this.props.socket.emit("getRoomSnapshot", this.state.currentRoom);
    this.props.socket.on("usersInRoom", data => {
      console.log(data);
    });
  };

  render() {
    return (
      <div>
        <h2>Teacher</h2>
        {this.state.currentRoom !== null ? (
          <h3>{this.state.currentRoom}</h3>
        ) : (
          ""
        )}
        <button onClick={this.createRoom}>Create Room</button>
        <button onClick={this.test}>Test</button>
        <ul style={{ listStyleType: "none" }}>
          {this.state.rooms.map(room => {
            return (
              <button
                key={room}
                value={room}
                onClick={() => {
                  this.enterRoom(room);
                }}
              >
                Room ID: {room}
              </button>
            );
          })}
        </ul>

        <div>
          <button onClick={this.studentInput}>Get user info</button>
        </div>
      </div>
    );
  }
}
