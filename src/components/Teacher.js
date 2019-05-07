import React from "react";

export default class Teacher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
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

  render() {
    return (
      <div>
        <h2>Teacher- {this.props.foo}</h2>
        <button onClick={this.createRoom}>Create Room</button>
        <button onClick={this.test}>Test</button>
        <ul />
      </div>
    );
  }
}
