import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./datadetail.scss";

class DataDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classdata: [],
      classdatafile: [],
      num: this.props.location.state.num,
      process_num: props.match.params.process_num,
      member_type: localStorage.type,
    };
  }

  detailList = (num) => {
    let url =
      "http://localhost:8000/project/classdata/classdatadetail?num=" + num;
    axios
      .get(url)
      .then((res) => {
        console.log("classdatafile=" + this.state.classdatafile);
        this.setState({
          classdata: res.data,
        });
        if (this.state.member_type === "강사") {
          this.setState({
            admin: (
              <span>
                <Link
                  to={{
                    pathname: "/updatedata/" + this.state.process_num,
                    state: {
                      classdata: this.state.classdata,
                      classdatafile: this.state.classdatafile,
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
        console.log("상세 에러:" + err);
      });
    let url2 =
      "http://localhost:8000/project/classdatafiles/classdatafilesdetail?num=" +
      num;
    axios
      .get(url2)
      .then((res) => {
        this.setState({
          classdatafile: res.data,
        });
        console.log("classdatafile=" + this.state.classdatafile);
      })
      .catch((err) => {
        console.log("classdatafiles 에러=" + err);
      });
  };
  downloadFile = (clip) => {
    let url = "http://localhost:8000/project/download.do?clip=" + clip;
    axios
      .get(url)
      .then((res) => {
        console.log("download");
      })
      .catch((err) => {
        console.log("notice download error=" + err);
      });
  };

  onDelete = (num) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        let url =
          "http://localhost:8000/project/classdata/classdatadelete?num=" + num;
        axios
          .get(url)
          .then((res) => {
            window.location.href = "/classdata/" + this.state.process_num;
          })
          .catch((err) => {
            console.log("notice delete error=" + err);
          });
      }
    });
  };

  componentWillMount() {
    this.detailList(this.state.num);
  }
  componentDidMount() {
    console.log(this.state.classdatafile.length);
  }
  render() {
    return (
      <div id="datadetail">
        <div id="datadetailback">
          {/* 여기서 부터 메인 */}
          <div id="classdatanav">
            {/* 이미지 박스  */}
            <div id="classdataimgbox">
              <img src={require("./note.jpg")} id="classdataimg"></img>
            </div>
            {/* 검은 배경  */}
            <div id="classdataimgback"></div>

            {/* 텍스트 박스 */}
            <div id="classdatatextbox">
              <div id="classdatatit">Lecture Room</div>
              <div id="classdatasub">Note for study</div>
            </div>
          </div>

          {/* 텍스트 박스 */}
          <div id="datadetailnav">
            <div>수업자료</div>
          </div>

          <div id="datadetailnav4">
            <Link
              to={{
                pathname: "/classdata/" + this.state.process_num,
              }}
              id="datadetailbtn"
            >
              <i className="fas fa-bars"></i>&nbsp;&nbsp; 목록
            </Link>
          </div>

          {/* 테이블 박스 */}
          <div id="datadetailnav2">
            <table id="datadetailtab">
              <tbody>
                <tr>
                  <th style={{ width: "20%" }}>제목</th>
                  <th style={{}} Align="left">
                    {this.state.classdata.classdata_subject}
                  </th>
                  <th style={{ width: "200px" }}>
                    작성일&nbsp;&nbsp;{this.state.classdata.classdata_writeday}
                  </th>
                </tr>
                <tr>
                  <td colSpan="3" Align="left">
                    <pre style={{ marginLeft: "40px" }}>
                      {this.state.classdata.classdata_content}
                    </pre>
                  </td>
                </tr>
                <tr style={{ height: "60px" }}>
                  <td>첨부파일</td>
                  <td
                    colSpan="2"
                    Align="left"
                    style={{ paddingTop: "10px", paddingBottom: "10px" }}
                  >
                    {this.state.classdatafile.map((item, idx) => (
                      <span key={idx}>
                        <a
                          alt=""
                          href={`http://localhost:8000/project/uploadfile/${item}`}
                          download
                        >
                          {item}
                        </a>
                        <br />
                      </span>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="datadetailnav3">{this.state.admin}</div>
          {/* 여기가 끝 */}
        </div>
        <div style={{ paddingBottom: "20px" }}></div>
      </div>
    );
  }
}
export default DataDetail;
