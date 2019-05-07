import React from "react";

export default class Student extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSlider = e => {
    const sliderValue = e.target.value;
    const user = {
      uid: this.props.socket.id,
      value: sliderValue
    };
    this.props.socket.emit("change-value", user);
  };

  render() {
    return (
      <div>
        <h2>Student</h2>
        <form>
          <input onChange={this.handleSlider} type="range" max="10" min="0" />
        </form>
      </div>
    );
  }
}
