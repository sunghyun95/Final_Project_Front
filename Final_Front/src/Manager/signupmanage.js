import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "react-modal";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Swal from "sweetalert2";
import Axios from "axios";
import Mypagelist from "../MyPage/mypagelist";
import "./signupmanage.scss";

class signupmanage extends Component {
  state = {
    processapplyList: [],
    modalOpen: false,
    acceptModalOpen: false,
    detailInfo: [],
    acceptInfo: [],
    consulting: "",
    acceptReason: "",
  };
  processApplyList = () => {
    let url =
      "http://localhost:8000/project/processapply/list?member_num=" +
      localStorage.num;
    Axios.get(url)
      .then((res) => {
        this.setState({
          processapplyList: res.data,
        });
      })
      .catch((err) => {
        console.log("수강과정 신청 목록 불러오기 에러:" + err);
      });
  };

  detailInfo = (item) => {
    this.setState({
      detailInfo: item,
      modalOpen: true,
    });

    console.log("과정 신청 승인 클릭");
    console.log(this.state.detailInfo);
  };

  processAccept = (item) => {
    console.log(item);
    console.log("-------------------------");
    this.setState({
      modalOpen: false,
      acceptModalOpen: true,
    });
  };

  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  acceptSubmit = (e) => {
    e.preventDefault();

    let checkUrl =
      "http://localhost:8000/project/processclass/check?processclass_process_num=" +
      this.state.detailInfo.processapply_process_num +
      "&processclass_member_num=" +
      this.state.detailInfo.processapply_member_num;
    Axios.get(checkUrl)
      .then((res) => {
        if (res.data === 0) {
          console.log(res.data);

          if (
            this.state.consulting.length === 0 ||
            this.state.consulting === ""
          ) {
            Swal.fire({
              icon: "error",
              title: "실패!",
              text: "상담내용을 작성해주세요!",
            });
            return false;
          }

          if (
            this.state.acceptReason.length === 0 ||
            this.state.acceptReason === ""
          ) {
            Swal.fire({
              icon: "error",
              title: "실패!",
              text: "신청 승인 사유을 작성해주세요!",
            });
            return false;
          }

          let formData = new FormData();

          formData.append("processapply_consulting", this.state.consulting);
          formData.append("processapply_acceptreason", this.state.acceptReason);
          formData.append(
            "processapply_num",
            this.state.detailInfo.processapply_num
          );

          let url = "http://localhost:8000/project/processapply/accept";
          Axios.post(url, formData)
            .then((res) => {
              console.log(this.state.detailInfo);
              formData = new FormData();
              formData.append(
                "processclass_process_num",
                this.state.detailInfo.processapply_process_num
              );
              formData.append(
                "processclass_member_num",
                this.state.detailInfo.processapply_member_num
              );
              formData.append(
                "processclass_member_type",
                this.state.detailInfo.processapply_process_subject
              );

              url = "http://localhost:8000/project/processclass/insert";
              Axios.post(url, formData)
                .then((res) => {
                  this.setState({
                    modalOpen: false,
                    acceptModalOpen: false,
                  });

                  Swal.fire({
                    icon: "success",
                    title: "성공!",
                    text: "수강 과정에 해당 신청 인원 추가를 성공하셨습니다!",
                  });
                })
                .catch((err) => {
                  console.log("신청 회원 과정 클래스 추가 에러 :" + err);
                });
            })
            .catch((err) => {
              console.log("승인사유 추가 에러 : " + err);
            });
        } else {
          this.setState({
            modalOpen: false,
            acceptModalOpen: false,
          });
          Swal.fire({
            icon: "error",
            title: "실패!",
            text: "해당 수강 과정에 이미 추가된 수강생입니다.",
          }).then((res) => {
            if (res) {
              this.setState({
                modalOpen: true,
                acceptModalOpen: true,
              });
              return false;
            }
          });
        }
      })
      .catch((err) => {
        console.log("과정 클래스 해당 회원 조회 에러 :" + err);
      });
  };

  componentWillMount = () => {
    this.processApplyList();
  };

  render() {
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
    return (
      <div style={{ textAlign: "center" }} align="center">
        <Mypagelist />
        <div style={{ paddingTop: "100px" }}></div>
        <span style={{ fontSize: "40px" }}>수강신청 관리</span>
        <div style={{ paddingTop: "200px" }}></div>
        <table style={tableStyle} align="center">
          <thead>
            <tr style={trStyle}>
              <td style={{ width: 100 }}>이름</td>
              <td style={{ width: 150 }}>핸드폰</td>
              <td style={{ width: 200 }}>이메일</td>
              <td style={{ width: 650 }}>과정명</td>
              <td style={{ width: 100 }}>비고</td>
            </tr>
          </thead>
          <tbody>
            {this.state.processapplyList.map((item, index) => (
              <tr style={trStyle}>
                <td>{item.processapply_member_name}</td>
                <td>{item.processapply_member_phone}</td>
                <td>{item.processapply_member_email}</td>
                <td>{item.processapply_process_subject}</td>
                <td>
                  {item.processapply_acceptreason == null && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={this.detailInfo.bind(this, item)}
                    >
                      승인대기중
                    </span>
                  )}
                  {item.processapply_acceptreason != null && (
                    <span>승인완료</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={this.state.modalOpen} id="signupmanage">
          <div id="signupmanageback">
            {/* 텍스트 박스 */}
            <div id="signupmanagewiht">
              <div id="signupmanagenav">
                <div id="signupmanageid">수강 과정명 :</div>
                <div>{this.state.detailInfo.processapply_process_subject}</div>
              </div>
              <div id="signupmanagenav">
                <div id="signupmanageid">이름:</div>
                <div>{this.state.detailInfo.processapply_member_name}</div>
              </div>
              <div id="signupmanagenav">
                <div id="signupmanageid">PHONE :</div>
                <div>{this.state.detailInfo.processapply_member_phone}</div>
              </div>
              <div id="signupmanagenav">
                <div id="signupmanageid">EMAIL :</div>
                <div>{this.state.detailInfo.processapply_member_email}</div>
              </div>
              <div id="signupmanagenav">
                <div id="signupmanageid">주소 :</div>
                <div>
                  {this.state.detailInfo.processapply_member_address}&nbsp;
                  {this.state.detailInfo.processapply_member_detailaddr}&nbsp;
                  {this.state.detailInfo.processapply_applyreason}
                </div>
              </div>
              <div style={{ width: "100%", height: "20px" }}></div>
            </div>

            {/* 버튼 박스 */}
            <div id="signupmanagenav2">
              <div style={{ marginRight: "20px" }}>
                <button
                  onClick={this.processAccept.bind(this, this.state.detailInfo)}
                  className="signupmanagebtn"
                >
                  승인
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    this.setState({
                      modalOpen: false,
                    });
                  }}
                  className="signupmanagebtn"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal id="signupmanage2" isOpen={this.state.acceptModalOpen}>
          <div id="signupmanage2back">
            <div style={{ marginBottom: "20px" }}>상담 내역</div>

            <form
              onSubmit={this.acceptSubmit.bind(this)}
              id="signupmanage2nav2"
            >
              <TextareaAutosize
                value={this.state.consulting}
                name="consulting"
                onChange={this.inputChange.bind(this)}
                style={{ width: "300px", height: "150px" }}
                aria-label="minimum height"
                rowsMin={3}
                placeholder="신청자와 상담하신 내역을 적어주세요."
              />
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                신청 승인사유
              </div>

              <TextareaAutosize
                value={this.state.acceptReason}
                name="acceptReason"
                onChange={this.inputChange.bind(this)}
                style={{ width: "300px", height: "150px" }}
                aria-label="minimum height"
                rowsMin={3}
                placeholder="수강 과정 신청 승인 사유를 적어주세요."
              />
              <div id="signupmanage2nav">
                <button
                  type="submit"
                  className="signupmanagebtn"
                  style={{ marginRight: "20px" }}
                >
                  승인
                </button>
                <button
                  onClick={() => {
                    this.setState({
                      acceptModalOpen: false,
                    });
                  }}
                  className="signupmanagebtn"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <div style={{ paddingBottom: "100px" }}></div>
      </div>
    );
  }
}

export default signupmanage;
