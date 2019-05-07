import React from "react";

export default class Student extends React.Component {
  constructor(props) {
    super(props);

    this.roomInputValue = React.createRef();
  }

  handleSlider = e => {
    const sliderValue = e.target.value;
    const user = {
      uid: this.props.socket.id,
      value: sliderValue
    };
    this.props.socket.emit("change-value", user);
  };

  joinRoom = e => {
    e.preventDefault();
    const roomInput = this.roomInputValue.current.value;
    this.props.socket.emit("enterRoom", roomInput);
  };

  render() {
    return (
      <div>
        <h2>Student</h2>
        <form onSubmit={this.joinRoom}>
          <input ref={this.roomInputValue} type="text" />
          <button>Join Room</button>
        </form>
        <form>
          <input onChange={this.handleSlider} type="range" max="10" min="0" />
        </form>

        <div id="Output" />
      </div>
    );
  }
}
