import React, { Component } from "react";
import axios from "axios";
import "./MyNote.scss";

class MyNote extends Component {
  state = {
    memolist: [],
  };

  componentWillMount() {
    let url =
      "http://localhost:8000/project/memo/list?member_num=" + localStorage.num;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          memolist: res.data,
        });
      })
      .catch((err) => {
        console.log("메모 목록 불러오기 에러 : " + err);
      });
  }

  render() {
    const memoList = this.state.memolist.map((item) => (
      <tr>
        <td>{item.memo_content}</td>
        <td>{item.memo_writeday}</td>
      </tr>
    ));
    return (
      <div id="mynote">
        <div id="mynoteback">
          <div></div>
          <table>{memoList}</table>
          <div>내 일일노트 페이지입니다</div>
        </div>
      </div>
    );
  }
}
export default MyNote;
