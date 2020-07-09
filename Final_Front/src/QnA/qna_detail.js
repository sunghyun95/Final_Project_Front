import React, { Component } from "react";
import noticeimg from "../Notice/noticeback.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

class qna_detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qnadata: [],
      num: this.props.location.state.num,
      currentPage: 1,
      member_type: localStorage.type,
      member_num: localStorage.num,
      detailpage: this.props.location.state.currentPage,
      page: 1,
      admin: "",
      student: "",
    };
  }
  componentWillMount() {
    this.setState({
      currentPage: this.props.location.state.currentPage,
    });
    this.detailList(this.state.num);
  }
  detailList = (num) => {
    let url = "http://localhost:8000/project/qna/qnadetail?qna_num=" + num;
    Axios.get(url)
      .then((res) => {
        this.setState({
          qnadata: res.data,
        });
        console.log(this.state.member_num);
        console.log(this.state.qnadata.qna_member_num);
        if (
          this.state.member_num == this.state.qnadata.qna_member_num &&
          this.state.member_type !== "매니저"
        ) {
          this.setState({
            student: (
              <span>
                <Link
                  to={{
                    pathname: "/qnaupdate",
                    state: {
                      qnadata: this.state.qnadata,
                      page: this.state.detailpage,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <button
                    type="button"
                    style={{
                      fontSize: "16px",
                      backgroundColor: "white",
                      width: "110px",
                      height: "40px",
                      borderRadius: "25px",
                      cursor: "pointer",
                      border: "1px solid gray",
                    }}
                  >
                    <i className="fas fa-pencil-alt"></i>&nbsp;&nbsp; 수정
                  </button>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  style={{
                    fontSize: "16px",
                    backgroundColor: "white",
                    width: "110px",
                    height: "40px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    border: "1px solid gray",
                  }}
                  onClick={this.onDelete.bind(this, this.state.num)}
                >
                  <i className="far fa-trash-alt"></i>&nbsp;&nbsp; 삭제
                </button>
              </span>
            ),
          });
        }
        if (
          this.state.qnadata.qna_restep === 0 &&
          this.state.member_type === "매니저"
        ) {
          this.setState({
            admin: (
              <span>
                <Link
                  to={{
                    pathname: "/qnaanswer",
                    state: {
                      qnadata: this.state.qnadata,
                      page: this.state.detailpage,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <button
                    type="button"
                    style={{
                      fontSize: "16px",
                      backgroundColor: "white",
                      width: "110px",
                      height: "40px",
                      borderRadius: "25px",
                      cursor: "pointer",
                      border: "1px solid gray",
                    }}
                  >
                    <i className="fas fa-pencil-alt"></i>&nbsp;&nbsp; 답글
                  </button>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  style={{
                    fontSize: "16px",
                    backgroundColor: "white",
                    width: "110px",
                    height: "40px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    border: "1px solid gray",
                  }}
                  onClick={this.onDelete.bind(this, this.state.num)}
                >
                  <i className="far fa-trash-alt"></i>&nbsp;&nbsp; 삭제
                </button>
              </span>
            ),
          });
        }
        if (
          this.state.qnadata.qna_restep !== 0 &&
          this.state.member_num == this.state.qnadata.qna_member_num &&
          this.state.member_type === "매니저"
        ) {
          this.setState({
            admin: (
              <span>
                <Link
                  to={{
                    pathname: "/qnaupdate",
                    state: {
                      qnadata: this.state.qnadata,
                      page: this.props.location.state.currentPage,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <button
                    type="button"
                    style={{
                      fontSize: "16px",
                      backgroundColor: "white",
                      width: "110px",
                      height: "40px",
                      borderRadius: "25px",
                      cursor: "pointer",
                      border: "1px solid gray",
                    }}
                  >
                    <i className="fas fa-pencil-alt"></i>&nbsp;&nbsp; 수정
                  </button>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  style={{
                    fontSize: "16px",
                    backgroundColor: "white",
                    width: "110px",
                    height: "40px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    border: "1px solid gray",
                  }}
                  onClick={this.onDelete.bind(this, this.state.num)}
                >
                  <i className="far fa-trash-alt"></i>&nbsp;&nbsp; 삭제
                </button>
              </span>
            ),
          });
        }
      })
      .catch((err) => {
        console.log("QnA detail error=" + err);
      });
  };
  onDelete = (num) => {

    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "해당 QnA의 내용이 모두 삭제됩니다",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.value) {
        let url = "http://localhost:8000/project/qna/qnadelete?qna_num=" + num;
        Axios.get(url)
          .then((res) => {
            Swal.fire("삭제가 완료되었습니다", "목록 페이지로 이동합니다", "success").then((result) => {
              if (result.value) {
                window.location.href = "/qnalist";
              }
            })
          })
          .catch((err) => {
            console.log("QnA delete error=" + err);
          });
      }

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
        <div style={{ paddingBottom: "20px" }}></div>
        {this.state.student}
        {this.state.admin}&nbsp;&nbsp;
        <Link
          to={{
            pathname: "/qnalist",
            state: {
              page: this.state.detailpage,
              updatepage: this.props.location.state.updatepage,
            },
          }}
          style={{
            textDecoration: "none",
          }}
        >
          <button type="button" style={buttonStyle}>
            <i className="fas fa-bars"></i>&nbsp;&nbsp; 목록
          </button>
        </Link>
        <div style={{ paddingBottom: "100px" }}></div>
      </div>
    );
  }
}

export default qna_detail;
