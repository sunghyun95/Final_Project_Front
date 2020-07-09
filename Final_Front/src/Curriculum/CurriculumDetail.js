import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { TableHead } from "@material-ui/core";
import Modal from "react-modal";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Swal from "sweetalert2";
import "./CurriculumDetail.scss";
import "./CurriculumSchedule.scss";

class CurriculumDetail extends Component {
  constructor({ match }) {
    super();

    this.process_num = match.params.process_num;
    this.state = {
      processData: [],
      processFiles: [],
      books: [],
      booksImages: [],
      modalOpen: false,
      processapply_applyreason: "",
    };
  }

  detail = () => {
    let url =
      "http://localhost:8000/project/process/detail?process_num=" +
      this.process_num;
    console.log(this.process_num);
    Axios.get(url)
      .then((res) => {
        this.setState({
          processData: res.data.processdto,
          processFiles: res.data.processfiles,
          books: res.data.books,
        });
        console.log(this.state.processData);
        console.log(this.state.processFiles);
        console.log(this.state.books);

        let url =
          "http://localhost:8000/project/process/getImages?num=" +
          this.process_num;
        Axios.get(url)
          .then((res) => {
            console.log(res.data);
            if (res.data !== null) {
              this.setState({
                booksImages: res.data,
              });
            }
          })
          .catch((err) => {
            console.log("책 이미지 불러오기 에러 : " + err);
          });

        if (localStorage.name === this.state.processData.process_writer) {
          this.setState({
            admin: (
              <span>
                <NavLink
                  exact
                  to={"/CurriculumUpdate/" + this.process_num}
                  className="curridetailsubbtn"
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
                      outline: "none",
                    }}
                  >
                    <i className="fas fa-pencil-alt"></i>&nbsp;&nbsp; 수정
                  </button>
                </NavLink>
                &nbsp;&nbsp;
                <button
                  type="button"
                  onClick={this.DeleteProcess.bind(this)}
                  className="curridetailsubbtn"
                  style={{
                    fontSize: "16px",
                    backgroundColor: "white",
                    width: "110px",
                    height: "40px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    border: "1px solid gray",
                    outline: "none",
                  }}
                >
                  <i className="far fa-trash-alt"></i>&nbsp;&nbsp; 삭제
                </button>
              </span>
            ),
          });
        }
        if (localStorage.type === "일반") {
          this.setState({
            normal: (
              <span>
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
                    outline: "none",
                  }}
                  onClick={this.ProcessApply.bind(this)}
                  id="curridetailbtn"
                >
                  <i className="fas fa-pencil-alt"></i>&nbsp;&nbsp; 신청
                </button>
              </span>
            ),
          });
        }
      })
      .catch((err) => {
        console.log("수강 과정 상세 데이터 불러오기 에러 : " + err);
      });
  };

  ProcessApply = (e) => {
    this.setState({
      modalOpen: true,
    });
  };

  DeleteProcess = () => {
    Swal.fire({
      title: "해당 수강 과정을 삭제하시겠습니까?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        let url =
          "http://localhost:8000/project/process/delete?process_num=" +
          this.process_num;

        Axios.get(url)
          .then((res) => {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then((result) => {
              if (result.value) {
                window.location.href = "/curriculumlist";
              }
            });
          })
          .catch((err) => {
            console.log("수강 과정 삭제 에러 : " + err);
          });
      }
    });
  };

  getNum = () => {
    return this.state.process_num;
  };

  applyTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  ProcessApplySubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();

    let checkUrl =
      "http://localhost:8000/project/processapply/check?member_num=" +
      localStorage.num;
    Axios.get(checkUrl)
      .then((res) => {
        if (res.data > 0) {
          this.setState({
            processapply_applyreason: "",
            modalOpen: false,
          });
          Swal.fire({
            icon: "error",
            title: "신청 실패!",
            text: "이미 신청하신 데이터가 있습니다!",
          }).then((res) => {
            if (res) {
              this.setState({
                processapply_applyreason: "",
                modalOpen: true,
              });
            }

          })
          return false;
        } else {
          formdata.append(
            "processapply_applyreason",
            this.state.processapply_applyreason
          );
          formdata.append(
            "processapply_process_num",
            this.state.processData.process_num
          );
          formdata.append("processapply_member_num", localStorage.num);

          let applyUrl = "http://localhost:8000/project/processapply/insert";
          Axios.post(applyUrl, formdata)
            .then((res) => {
              this.setState({
                processapply_applyreason: "",
                modalOpen: false,
              });

              Swal.fire({
                icon: "success",
                title: "성공!!",
                text: "수강 과정 신청이 성공적으로 처리되었습니다!",
              });
            })
            .catch((err) => {
              console.log("수강 과정 신청 에러 : " + err);
            });
        }
      })
      .catch((err) => {
        console.log("수강 과정 신청 확인 에러 : " + err);
      });
  };

  componentWillMount = () => {
    console.log("asd");
    this.detail();
  };

  render() {
    let booksImage = [];
    for (let i = 0; i < this.state.booksImages.length; i++) {
      booksImage.push(this.state.booksImages[i]);
    }

    const imageUrl = "http://localhost:8000/project/uploadfile/";
    const tableStyle = {
      textAlign: "center",
      fontSize: "16px",
      width: "1200px",
      border: "0px",
      borderCollapse: "collapse",
      borderTop: "1px solid black",
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
      outline: "none",
    };
    return (
      <div style={{ textAlign: "center" }} aling="center">
        <div id="curriSchimgbox">
          <img src={require("../image/keyboard.jpg")} id="curriSchimg"></img>
          <div id="curriSchimgback"></div>
          <div id="curriSchimgtextbox">
            <div id="curriSchimgtitbox">
              <div>IT Campus CurriCulum</div>
              <div className="margin10">
                <i className="far fa-calendar-alt"></i>
              </div>
            </div>
            <div id="curriSchimgsubbox">
              <div id="marginbottom10">
                기업이 "신입" 에게 바라는 것은 "SW 개발의 기본을 출실히 알고
                있는가?"입니다.
              </div>
              <div>
                6개월이 지난 후 기업 실무현장에서의 당신은 "당당합니다."
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "100px" }}></div>
        <span style={{ fontSize: "40px" }}>수강 과정</span>
        <br />
        <br />
        <span style={{ fontSize: "18px" }}>
          IT Campus의 수강 과정을 확인하실 수 있습니다.
        </span>
        <div style={{ paddingTop: "100px" }}></div>
        <table style={tableStyle} align="center">
          <caption style={{ textAlign: "right", color: "#BDBDBD" }}>
            {this.state.processData.process_writeday}
          </caption>
          <tbody>
            <tr style={trStyle}>
              <td style={{ width: 150 }}>담당자</td>
              <td align="left">{this.state.processData.process_writer}</td>
            </tr>
            <tr style={trStyle}>
              <td style={{ width: 150 }}>과정명</td>
              <td align="left">{this.state.processData.process_subject}</td>
            </tr>
            <tr style={trStyle}>
              <td>분류</td>
              <td align="left" style={{ textAlign: "left" }}>
                {this.state.processData.process_type}
              </td>
            </tr>
            <tr style={trStyle}>
              <td>기간</td>
              <td align="left" style={{ textAlign: "left" }}>
                {this.state.processData.process_startdate} ~{" "}
                {this.state.processData.process_enddate}
              </td>
            </tr>
            <tr style={trStyle}>
              <td>인원</td>
              <td align="left" style={{ textAlign: "left" }}>
                {this.state.processData.process_peoples}명
              </td>
            </tr>
            <tr style={trStyle}>
              <td>강사</td>
              <td align="left" style={{ textAlign: "left" }}>
                {this.state.processData.process_teachername}
              </td>
            </tr>
            <tr>
              <td rowSpan="2">소개</td>
              <td align="left" style={{ textAlign: "left" }}>
                <pre>{this.state.processData.process_intr}</pre>
              </td>
            </tr>
            <tr style={trStyle}>
              <td align="left" style={{ textAlign: "left" }}>
                {this.state.processFiles.map((item, index) => (
                  <img
                    key={index}
                    src={imageUrl + item.processfiles_process_filename}
                    alt=""
                    className="curridetailimg"
                    style={{
                      maxWidth: "500px",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  />
                ))}
              </td>
            </tr>
            <tr style={trStyle}>
              <td>교제</td>
              <td align="left" style={{ textAlign: "left" }}>
                <table style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <tbody>
                    {this.state.books.map((item, index) => (
                      <tr style={{ paddingBottom: "10px" }}>
                        <td>
                          <img src={booksImage[index]} alt="" key={index} />
                          <br />
                          <b>교재명</b>&nbsp;{item.books_name}
                          <br />
                          <b>저자</b>&nbsp;{item.books_writer}
                          <br />
                          <b>출판사</b>&nbsp;{item.books_brand}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ paddingBottom: "20px" }}></div>
        {this.state.normal}
        {this.state.admin}
        &nbsp;&nbsp;
        <NavLink React to="/curriculumschedule/2" className="curridetailsubbtn">
          <button
            type="button"
            style={buttonStyle}
            onClick={this.props.history.go(1)}
          >
            <i className="fas fa-bars"></i>&nbsp;&nbsp; 목록
          </button>
        </NavLink>
        <div id="curridetailback">
          <Modal isOpen={this.state.modalOpen} id="curridetailmodal">
            <div id="curridetailmodalback">
              <div id="curridetailmodalback2">
                <div id="curridetailmodaltit">
                  {this.state.processData.process_subject}
                </div>
                <div className="curridetailmodalsub">
                  <div className="curridetailmodalsubspan">과정명</div>{" "}
                  {this.state.processData.process_type}
                </div>
                <div className="curridetailmodalsub">
                  <div className="curridetailmodalsubspan">기간</div>{" "}
                  {this.state.processData.process_startdate} ~{" "}
                  {this.state.processData.process_enddate}
                </div>
                <form
                  onSubmit={this.ProcessApplySubmit.bind(this)}
                  id="curridetailmodaltextareabox"
                >
                  <TextareaAutosize
                    name="processapply_applyreason"
                    onChange={this.applyTextChange.bind(this)}
                    id="curridetailmodaltextarea"
                    aria-label="minimum height"
                    rowsMin={3}
                    placeholder="수강 과정에 신청하시는 이유를 적어주세요."
                    value={this.state.processapply_applyreason}
                  />

                  <div id="curridetailbodalbtnbox">
                    <button type="submit" className="curridetailbodalbtn">
                      신청
                    </button>
                    <button
                      className="curridetailbodalbtn"
                      onClick={() => {
                        this.setState({
                          modalOpen: false,
                        });
                      }}
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default CurriculumDetail;
