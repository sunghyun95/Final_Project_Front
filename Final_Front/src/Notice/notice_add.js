import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import noticeimg from "./noticeback.jpg";
import Swal from "sweetalert2";
class Notice_Add extends Component {
  constructor() {
    super();
    this.state = {
      fileName: [],
      uploadFile: [],
      mnum: localStorage.num,
      notice: 1,
      notice_subject: "",
      notice_content: "",
    };
  }
  componentDidMount() {
    document.getElementById("notice_subject").focus();
    if (this.state.notice === 1) {
      this.setState({
        check: "checked",
      });
    } else {
      this.setState({
        check: "unchecked",
      });
    }
    console.log(this.state.notice);
  }
  onCheckboxhandler = (e) => {
    if (e.target.unchecked) {
      this.setState({
        check: e.target.unchecked,
        notice: 1,
      });
    } else {
      this.setState({
        check: e.target.checked,
        notice: 0,
      });
    }
    console.log(this.state.notice);
  };
  onKeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onImageChange = (e) => {
    console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      //uploadFile.push("{idx:uploadFile_" + i + " name:" + e.target.files[i] + "}");
      //uploadFile[i] = { idx: i.toString(), name: e.target.files[i] };
      this.state.uploadFile.push(e.target.files[i]);
      this.state.fileName.push(e.target.files[i].name);
    }
    console.log(this.state.fileName);
  };
  onSave = (e) => {
    e.preventDefault();

    if (this.state.notice_subject === "") {
      this.setState({
        subjectcheck: "제목을 입력해주세요",
      });
      this.refs.notice_subjects.focus();
      return false;
    } else {
      this.setState({
        subjectcheck: "",
      });
    }

    if (this.state.notice_content === "") {
      this.setState({
        contentcheck: "내용을 입력해주세요",
      });
      this.refs.notice_contents.focus();
      return false;
    } else {
      this.setState({
        contentcheck: "",
      });
    }

    const dataForm = new FormData();
    for (var i = 0; i < this.state.uploadFile.length; i++) {
      dataForm.append(`notice_file[${i}]`, this.state.uploadFile[i]);
    }
    dataForm.append("notice_member_num", e.target.notice_member_num.value);
    dataForm.append("notice_subject", e.target.notice_subject.value);
    dataForm.append("notice_content", e.target.notice_content.value);
    dataForm.append("notice_filename", this.state.fileName);
    dataForm.append("notice_type", this.state.notice);
    console.log(e.target.notice_subject.value);
    console.log(e.target.notice_content.value);

    let url = "http://localhost:8000/project/notice/noticeadd";
    Axios.post(url, dataForm, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("Notice add");
        Swal.fire({
          icon: "success",
          title: "작성 완료",
          text: "공지사항 작성이 완료되었습니다",
        }).then((result) => {
          window.location.href = "/noticelist";
        });
      })
      .catch((err) => {
        console.log("notice add error=" + err);
      });
  };
  render() {
    const backimage = {
      width: "100%",
      height: "500px",
      backgroundImage: `url(${noticeimg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    };
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
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "100px" }}></div>
        <div style={backimage}>
          <span style={{ fontSize: "70px" }}>공지사항</span>
          <br />
          <span style={{ fontSize: "18px" }}>
            IT Campus의 새로운 소식을 알려드립니다.
          </span>
        </div>
        <div style={{ paddingTop: "100px" }}></div>
        <span style={{ fontSize: "40px" }}>공지사항</span>
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
              <Link
                to="/noticelist"
                style={{
                  textDecoration: "none",
                }}
              >
                <button type="button" style={buttonStyle}>
                  <i className="fas fa-bars"></i>&nbsp;&nbsp; 목록
                </button>
              </Link>
            </caption>
            <tbody>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>제목</td>
                <td style={{ width: "1100px" }}>
                  <input
                    type="text"
                    name="notice_subject"
                    ref="notice_subjects"
                    id="notice_subject"
                    style={{ width: "1000px", height: "40px", border: "0px" }}
                    onChange={this.onKeyChange.bind(this)}
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>구분</td>
                <td align="left">
                  <input
                    type="checkbox"
                    name="check"
                    value={this.state.notice}
                    checked={this.state.check}
                    onChange={this.onCheckboxhandler.bind(this)}
                  />
                  맨 위로
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
                    name="notice_content"
                    ref="notice_contents"
                    onChange={this.onKeyChange.bind(this)}
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>파일</td>
                <td align="left">
                  <input
                    type="file"
                    multiple="multiple"
                    name="notice_filename"
                    onChange={this.onImageChange.bind(this)}
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
export default Notice_Add;
