import React, { Component } from "react";
import "./findid.css";

//마테리얼
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Swal from "sweetalert2";

class findid extends Component {
  state = {
    member_name: "",
    member_email1: "",
    member_phone: "",
    checkNum: "",
    IdCheck_msg: "",
    IdCheck_msg2: "",
    email: "",
  };

  onKeychange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //폰번호 실시간 입력 검증
  onPhoneChange = (e) => {
    this.setState({
      member_phone: autoHypenPhone(e.target.value.replace(/[^0-9]/g, "")),
    });
  };

  //인증번호 받기 누르면 인증번호 input 에 포커스
  MessageFocus = () => {
    document.getElementById("findidinp").focus();
  };
  // 이메일 키 입력 함수
  EmailKeypress = (e) => {
    // console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  };

  //이메일 input 에서 입력값 저장
  EmaileinpChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //select 에서 변경한 값 이메일에 저장
  EmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
    if (e.target.value === "") {
      document.getElementById("emaininp").focus();
      this.setState({
        email: "",
      });
    }
  };
  //send SMS
  onSms = () => {
    const dataForm = new FormData();
    dataForm.append("member_phone", this.state.member_phone);
    var url = "http://localhost:8000/project/check/checknum";
    Axios.post(url, dataForm)
      .then((res) => {
        this.setState({
          randomsu: res.data,
          IdCheck_msg: "인증번호 발송이 완료되었습니다.",
        });
      })
      .catch((err) => {
        console.log("발송 버튼 error=" + err);
      });
  };
  //id check
  onCheck = (e) => {
    e.preventDefault();
    console.log("아이디 찾기 위한 정보 확인");
    console.log(e.target.member_name.value);
    const dataForm = new FormData();
    dataForm.append("member_name", e.target.member_name.value);
    dataForm.append(
      "member_email",
      e.target.member_email1.value + "@" + e.target.email.value
    );
    dataForm.append("member_phone", e.target.member_phone.value);
    var url = "http://localhost:8000/project/check/checkId";
    Axios.post(url, dataForm)
      .then((responseData) => {
        console.log("responseData=" + responseData.data);
        this.setState({
          cnt: responseData.data,
        });
        if (this.state.cnt === 1) {
          this.onSms();
          this.MessageFocus();
        } else
          this.setState({
            IdCheck_msg: "등록된 회원 정보가 없습니다.",
          });
      })
      .catch((error) => {
        console.log("check Id error=" + error);
      });
  };
  checkNumberId = (e) => {
    e.preventDefault();
    console.log("인증번호=" + this.state.randomsu);
    console.log("입력한 인증번호=" + e.target.checknumId.value);
    if (e.target.checknumId.value == this.state.randomsu) {
      const dataForm = new FormData();
      dataForm.append("member_name", this.state.member_name);
      dataForm.append(
        "member_email",
        this.state.member_email1 + "@" + this.state.email
      );
      dataForm.append("member_phone", this.state.member_phone);
      var url = "http://localhost:8000/project/check/emailId";
      Axios.post(url, dataForm)
        .then((res) => {
          this.props.FindIdModalClose();
          this.props.LoginModalClose();
          Swal.fire("회원님의 이메일로 ID가 전송되었습니다").then((result) => {
            if (result.value) {
              this.setState({
                IdCheck_msg2:
                  "인증번호 확인이 완료 되었습니다." +
                  <br /> +
                  "해당 이메일로 아이디를 확인해주세요.",
              });
              this.props.LoginModalOpen();
            }
          });
        })
        .catch((err) => {
          console.log("아이디 이메일 전송 error=" + err);
        });
    } else {
      this.setState({
        IdCheck_msg2: "인증번호가 맞지 않습니다.",
        [e.target.checknumId.name]: "",
      });
      return;
    }
  };
  render() {
    const LoginBtn = styled(Button)({
      color: "rgb(34, 83, 184)",
      borderColor: "rgb(34, 83, 184)",
    });
    return (
      <div id="findid">
        <div id="findidback">
          {/* 아이디 비밀번호 찾기 타이틀 박스 */}
          <div id="findidtitbox">
            <span id="finditit1" onClick={this.props.FindPwModalClose}>
              아이디 찾기
            </span>
            <span id="finditit2" onClick={this.props.FindPwModalOpen}>
              비밀번호 찾기
            </span>
          </div>

          {/* 아이디 찾기 폼 */}
          <form onSubmit={this.onCheck.bind(this)}>
            <div className="loginbox">
              <input
                type="text"
                className="logininput"
                placeholder="이름"
                name="member_name"
                value={this.state.member_name}
                onChange={this.onKeychange.bind(this)}
              ></input>
              <div className="logini"></div>
            </div>

            {/* 이메일 */}
            <div className="signupback">
              <div className="signupboxmail">
                <input
                  type="text"
                  className="logininput"
                  placeholder="이메일"
                  name="member_email1"
                  value={this.state.member_email1}
                  onChange={this.onKeychange.bind(this)}
                ></input>
                <div className="logini"></div>
              </div>
              <div>@</div>
              <div className="signupboxmail">
                <select
                  className="signupemail"
                  name="emailselect"
                  onChange={this.EmailChange.bind(this)}
                  defaultValue={""}
                >
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="nate.com">nate.com</option>
                  <option value="">직접입력</option>
                </select>
                <input
                  type="text"
                  className="logininput"
                  id="emaininp"
                  name="email"
                  value={this.state.email}
                  onKeyPress={this.EmailKeypress.bind(this)}
                  onChange={this.EmaileinpChange.bind(this)}
                ></input>
                <div className="logini"></div>
              </div>
            </div>

            {/* 휴대폰 번호 박스 */}
            <div id="findidtelback">
              <div id="findidtelbox">
                <input
                  type="text"
                  className="logininput"
                  placeholder="휴대폰 번호"
                  name="member_phone"
                  value={this.state.member_phone}
                  onChange={this.onPhoneChange.bind(this)}
                  maxLength="13"
                ></input>
                <div className="logini"></div>
              </div>

              <div>
                <LoginBtn
                  variant="outlined"
                  className="findidbtns"
                  type="submit"
                >
                  인증번호 받기
                </LoginBtn>
              </div>
            </div>
          </form>
          {/* 경고 문구 출력 창  */}
          <div className="loginlabel">{this.state.IdCheck_msg}</div>

          {/* 인증번호 입력 박스  */}
          <form onSubmit={this.checkNumberId.bind(this)} className="findidmns">
            <div id="findidbox">
              <input
                type="text"
                placeholder="인증번호"
                id="findidinp"
                name="checknumId"
                onChange={this.onKeychange.bind(this)}
                value={this.state.checknumId}
              ></input>
            </div>
            <div className="loginlabel">{this.state.IdCheck_msg2}</div>

            {/* 버튼 박스 */}
            <div id="findidbtnbox">
              <LoginBtn
                type="submit"
                variant="outlined"
                className="findidbtnm"
                id="findidbtnm1"
              >
                확인
              </LoginBtn>
              <LoginBtn
                onClick={this.props.FindIdModalClose}
                variant="outlined"
                className="findidbtnm"
              >
                취소
              </LoginBtn>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function autoHypenPhone(str) {
  var tmp = "";
  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3);
    return tmp;
  } else if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3, 3);
    tmp += "-";
    tmp += str.substr(6);
    return tmp;
  } else {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3, 4);
    tmp += "-";
    tmp += str.substr(7);
    return tmp;
  }
  return str;
}
export default findid;
