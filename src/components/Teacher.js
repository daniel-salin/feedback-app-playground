import React from "react";

export default class Teacher extends React.Component {
  constructor(props) {
    super(props);
  }

  createRoom = () => {
    console.log(this.props.socket);
    let key = Math.floor(Math.random() * 1000);
    console.log(key);
    this.props.socket.emit("createRoom", key);
  };

  render() {
    return (
      <div>
        <h2>Teacher- {this.props.foo}</h2>
        <button onClick={this.createRoom}>Create Room</button>
      </div>
    );
  }
}
