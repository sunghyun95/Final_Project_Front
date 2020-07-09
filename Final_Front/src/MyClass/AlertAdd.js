import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default class AlertAdd extends Component {
  constructor({ match }) {
    super();
    this.process_num = match.params.process_num;

    this.state = {
      processData: [],
      memo_subject: "",
      memo_content: "",
      memo_process_num: "",
      uploadFile: [],
      fileName: "",
    };
  }

  onFileChange = (e) => {
    this.state.uploadFile.push(e.target.files[0]);
    this.setState({
      fileName: e.target.files[0].name,
    });
  };

  onSave = (e) => {
    e.preventDefault();

    console.log(this.state.uploadFile);

    let url = "http://localhost:8000/project/memo/insert";

    let formdata = new FormData();
    formdata.append("memo_member_num", localStorage.num);
    formdata.append("memo_subject", this.state.memo_subject);
    formdata.append("memo_content", this.state.memo_content);
    formdata.append("memo_process_num", this.state.memo_process_num);
    formdata.append("memo_file", this.state.uploadFile[0]);

    axios
      .post(url, formdata)
      .then((res) => {})
      .catch((err) => {
        console.log("알림 작성 에러 :" + err);
      });
  };

  onKeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillMount() {
    let url =
      "http://localhost:8000/project/memo/processlist?member_num=" +
      localStorage.num;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          processData: res.data,
        });
        console.log(this.state.processData);
      })
      .catch((err) => {
        console.log("수강 과정명 불러오기 에러 :" + err);
      });
  }

  render() {
    const tableStyle = {
      textAlign: "center",
      fontSize: "16px",
      width: "1200px",
      border: "0px",
      borderCollapse: "collapse",
      borderTop: "1px solid black",
      borderBottom: "0px",
    };
    const trStyle = {
      borderBottom: "1px solid black",
      height: "60px",
    };
    const buttonStyle = {
      fontSize: "16px",
      backgroundColor: "white",
      width: "110px",
      height: "40px",
      borderRadius: "25px",
      cursor: "pointer",
      border: "1px solid gray",
    };

    const options = this.state.processData.map((item, index) => (
      <MenuItem key={index} value={item.process_num}>
        {item.process_subject}
      </MenuItem>
    ));

    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "100px" }}></div>
        <div style={{ paddingTop: "100px" }}></div>
        <span style={{ fontSize: "40px" }}>알림</span>
        <br />
        <div style={{ paddingTop: "100px" }}></div>
        <form onSubmit={this.onSave.bind(this)}>
          <input
            type="hidden"
            name="notice_member_num"
            value={this.state.mnum}
          />
          <table style={tableStyle} align="center">
            <caption style={{ textAlign: "right", marginBottom: "10px" }}>
              <NavLink
                exact
                to={"/AlertList/" + this.state.memo_process_num}
                style={{
                  textDecoration: "none",
                }}
              >
                <button type="button" style={buttonStyle}>
                  <i className="fas fa-bars"></i>&nbsp;&nbsp; 목록
                </button>
              </NavLink>
            </caption>
            <tbody>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>제목</td>
                <td style={{ width: "1100px" }}>
                  <input
                    type="text"
                    name="memo_subject"
                    ref="memo_subjects"
                    id="memo_subject"
                    style={{ width: "1000px", height: "40px", border: "0px" }}
                    onChange={this.onKeyChange.bind(this)}
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>과정명</td>
                <td align="left">
                  <Select
                    value={this.state.memo_process_num}
                    onChange={this.onKeyChange.bind(this)}
                    name="memo_process_num"
                  >
                    {options}
                  </Select>
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>내용</td>
                <td>
                  <textarea
                    style={{
                      width: "1000px",
                      height: "500px",
                      marginTop: "30px",
                      border: "0px",
                    }}
                    name="memo_content"
                    ref="memo_contents"
                    onChange={this.onKeyChange.bind(this)}
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>파일</td>
                <td align="left">
                  <input
                    type="file"
                    name="memo_file"
                    onChange={this.onFileChange.bind(this)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingBottom: "20px" }}></div>
          <b
            style={{
              color: "red",
              textAlign: "left",
              fontSize: "16px",
              float: "left",
              marginLeft: "400px",
            }}
          >
            {this.state.subjectcheck}
            {this.state.contentcheck}
          </b>
          &nbsp;&nbsp;
          <button type="submit" style={buttonStyle}>
            <i className="fas fa-plus"></i>&nbsp;&nbsp;추가
          </button>
        </form>

        <div style={{ paddingBottom: "100px" }}></div>
      </div>
    );
  }
}
