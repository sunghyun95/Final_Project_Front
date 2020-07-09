import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import noticeimg from "./noticeback.jpg";
import Swal from "sweetalert2";

class Notice_Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticedata: [],
      noticefile: [],
      num: this.props.location.state.num,
      currentPage: 1,
      member_name: localStorage.name,
      detailpage: this.props.location.state.page,
      notice_member_num: this.props.location.state.notice_member_num,
      page: 1,
    };
  }
  componentWillMount() {
    this.setState({
      currentPage: this.props.location.state.currentPage,
    });
    this.detailList(this.state.num);
  }
  detailList = (num) => {
    let url = "http://localhost:8000/project/notice/noticedetail?num=" + num;
    Axios.get(url)
      .then((res) => {
        this.setState({
          noticedata: res.data,
        });
        console.log(this.state.notice_member_num)
        if (
          this.state.notice_member_num == localStorage.num
        ) {
          this.setState({
            admin: (
              <span>
                <Link
                  to={{
                    pathname: "/noticeupdate",
                    state: {
                      noticedata: this.state.noticedata,
                      noticefile: this.state.noticefile,
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
                {/* <Link to={{ pathname:"/noticelist", 
                                    state:{page:this.state.currentPage}} } 
                                onClick={this.onDelete.bind(this, this.state.num)}>삭제</Link> */}
              </span>
            ),
          });
        }
      })
      .catch((err) => {
        console.log("notice detail error=" + err);
      });
    let url2 = "http://localhost:8000/project/notice/noticefile?num=" + num;
    Axios.get(url2)
      .then((res) => {
        this.setState({
          noticefile: res.data,
        });
      })
      .catch((err) => {
        console.log("notice detail files error=" + err);
      });
  };
  downloadFile = (clip) => {
    let url = "http://localhost:8000/project/download.do?clip=" + clip;
    Axios.get(url)
      .then((res) => {
        console.log("download");
      })
      .catch((err) => {
        console.log("notice download error=" + err);
      });
  };
  onDelete = (num) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "공지사항의 내용이 모두 삭제됩니다",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.value) {
        let url =
          "http://localhost:8000/project/notice/noticedelete?num=" + num;
        Axios.get(url)
          .then((res) => {
            window.location.href = "/noticelist";
          })
          .catch((err) => {
            console.log("notice delete error=" + err);
          });
      }
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
        <table style={tableStyle} Align="center">
          <tbody>
            <tr style={trStyle}>
              <td style={{ width: "100px" }}>제목</td>
              <td style={{ width: "800px" }} Align="left">
                {this.state.noticedata.notice_subject}
              </td>
              <td style={{ width: "200px" }}>
                작성일&nbsp;&nbsp;{this.state.noticedata.notice_writeday}
                &nbsp;&nbsp;조회&nbsp;&nbsp;
                {this.state.noticedata.notice_readcount}
              </td>
            </tr>
            <tr style={trStyle}>
              <td colSpan="3" Align="left">
                <pre style={{ marginLeft: "40px" }}>
                  {this.state.noticedata.notice_content}
                </pre>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>첨부파일</td>
              <td
                colSpan="2"
                Align="left"
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                {this.state.noticefile.map((item, idx) => (
                  <span>
                    <span key={idx}>
                      <a
                        alt=""
                        href={`http://localhost:8000/project/uploadfile/${item}`}
                        download
                      >
                        {item}
                      </a>
                    </span>
                    <br />
                  </span>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ paddingBottom: "20px" }}></div>
        {this.state.admin}&nbsp;&nbsp;
        <Link
          to={{
            pathname: "/noticelist",
            state: {
              page: this.props.location.state.currentPage,
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
export default Notice_Detail;
