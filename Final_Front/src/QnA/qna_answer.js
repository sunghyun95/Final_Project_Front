import React, { Component } from "react";
import noticeimg from "../Notice/noticeback.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
class qna_answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qnadata: this.props.location.state.qnadata,
      currentPage: 1,
      member_name: localStorage.name,
      member_num: localStorage.num,
      detailpage: this.props.location.state.page,
      page: 1,
      contentcheck: "",
    };
  }
  componentDidMount() {
    this.refs.qna_content.focus();
    this.setState({
      qna_regroup: this.state.qnadata.qna_regroup,
      qna_restep: this.state.qnadata.qna_restep,
      qna_relevel: this.state.qnadata.qna_relevel,
    });
  }
  onKeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSave = (e) => {
    e.preventDefault();

    if (e.target.qna_content.value === "") {
      this.setState({
        contentcheck: "내용을 입력해주세요",
      });
      this.refs.qna_content.focus();
      return false;
    } else {
    }

    const dataForm = new FormData();
    dataForm.append("qna_num", this.state.qnadata.qna_num);
    dataForm.append("qna_member_num", this.state.member_num);
    dataForm.append("qna_subject", "[Re:]" + this.state.qnadata.qna_subject);
    dataForm.append("qna_content", e.target.qna_content.value);
    dataForm.append("qna_regroup", this.state.qna_regroup);
    dataForm.append("qna_restep", this.state.qna_restep);
    dataForm.append("qna_relevel", this.state.qna_relevel);

    let url = "http://localhost:8000/project/qna/qnaadd";
    Axios.post(url, dataForm)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: '작성 완료',
          text: '답변 작성이 완료되었습니다',
        }).then((result) => {
          window.location.href = "/qnalist";
        })

      })
      .catch((err) => {
        console.log("qna add error=" + err);
      });
  };
  render() {
    const backimage = {
      width: "100%",
      height: "400px",
      backgroundImage: `url(${noticeimg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 400px",
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
          <span style={{ fontSize: "70px", color: "#A6A6A6" }}>
            IT Campus Service
          </span>
          <br />
          <span style={{ fontSize: "18px", color: "#A6A6A6" }}>
            IT Campus Service
          </span>
        </div>
        <div style={{ paddingTop: "100px" }}></div>
        <span style={{ fontSize: "40px" }}>QnA</span>
        <br />
        <br />
        <span style={{ fontSize: "18px", color: "##A6A6A6" }}>
          여러분의 궁금증을 해결해 드립니다.
        </span>
        <div style={{ paddingTop: "100px" }}></div>
        <table style={tableStyle} align="center">
          <caption style={{ textAlign: "left", marginBottom: "10px" }}>
            <b>Question</b>
          </caption>
          <tbody>
            <tr style={trStyle}>
              <td style={{ width: "100px" }}>제목</td>
              <td style={{ width: "800px" }} align="left">
                {this.state.qnadata.qna_subject}
              </td>
              <td style={{ width: "200px" }}>
                작성일&nbsp;&nbsp;{this.state.qnadata.qna_writeday}
                &nbsp;&nbsp;조회&nbsp;&nbsp;
                {this.state.qnadata.qna_readcount}
              </td>
            </tr>
            <tr style={trStyle}>
              <td colSpan="3" align="left">
                <pre style={{ marginLeft: "40px" }}>
                  {this.state.qnadata.qna_content}
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ paddingBottom: "50px" }}></div>
        <form onSubmit={this.onSave.bind(this)}>
          <table style={tableStyle} align="center">
            <caption style={{ textAlign: "left", marginBottom: "10px" }}>
              <b>Answer</b>
            </caption>
            <tbody>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>제목</td>
                <td style={{ width: "1100px" }} align="left">
                  [Re:]{this.state.qnadata.qna_subject}
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>내용</td>
                <td>
                  <textarea
                    style={{
                      width: "1000px",
                      height: "300px",
                      marginTop: "30px",
                      border: "0px",
                    }}
                    name="qna_content"
                    ref="qna_content"
                    onChange={this.onKeyChange.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="right">
                  <div style={{ paddingBottom: "20px" }}></div>
                  <b
                    style={{
                      color: "red",
                      fontSize: "16px",
                    }}
                  >
                    {this.state.contentcheck}
                  </b>
                  &nbsp;&nbsp;
                  <button type="submit" style={buttonStyle}>
                    <i className="fas fa-plus"></i>&nbsp;&nbsp;저장
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div style={{ paddingBottom: "100px" }}></div>
      </div>
    );
  }
}

export default qna_answer;
