import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./schedule.scss";

class schedule extends Component {
  state = {
    open: "open",
    close: "bottom",
  };

  Open = () => {
    this.setState({
      open: "top",
    });
  };

  Close = () => {
    this.setState({
      open: "open",
    });
  };

  render() {
    return (
      <div>
        <br></br><br></br><br></br><br></br><br></br>
        <h2>스케쥴입니다</h2>
        <Link to="/">
          <button>홈으로</button>
        </Link>
        <div id={this.state.open}>
          <div>김성현 생일 06.20</div>
          <button onClick={this.Open.bind(this)}>Open</button>
        </div>
        <div>
          <button onClick={this.Close.bind(this)}>Close</button>
        </div>
      </div>
    );
  }
}
export default schedule;
