import React, { Component } from "react";
import "./findid.css";

//마테리얼
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Axios from "axios";

class findpw extends Component {
  state = {
    member_name: "",
    member_id: "",
    member_phone: "",
    pwCheck_msg: "",
    pwCheck_msg2: "",
    checknum: "",
    randomsu: "",
  };
  onKeyChange = (e) => {
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
  //send SMS
  onSms = () => {
    const dataForm = new FormData();
    dataForm.append("member_phone", this.state.member_phone);
    var url = "http://localhost:8000/project/check/checknum";
    Axios.post(url, dataForm)
      .then((res) => {
        this.setState({
          randomsu: res.data,
          pwCheck_msg: "인증번호 발송이 완료되었습니다.",
        });
      })
      .catch((err) => {
        console.log("발송 버튼 error=" + err);
      });
  };
  //비밀번호 재설정
  onCheckId = (e) => {
    e.preventDefault();
    console.log("비밀번호 재설정 위한 정보 확인");
    console.log(e.target.member_name.value);
    const dataForm = new FormData();
    dataForm.append("member_name", e.target.member_name.value);
    dataForm.append("member_id", e.target.member_id.value);
    dataForm.append("member_phone", e.target.member_phone.value);
    var url = "http://localhost:8000/project/check/checklogin";
    Axios.post(url, dataForm)
      .then((responseData) => {
        console.log("responseData=" + responseData.data);
        this.setState({
          cnt: responseData.data,
        });
        if (this.state.cnt === 1) {
          this.onSms();
          this.MessageFocus();
        } else {
          this.setState({
            pwCheck_msg: "등록된 회원 정보가 없습니다.",
          });
        }
      })
      .catch((error) => {
        console.log("비밀번호 재설정하기 error=" + error);
      });
  };
  checkNumber = (e) => {
    e.preventDefault();
    console.log("인증번호=" + this.state.randomsu);
    console.log("입력한 인증번호=" + e.target.checknum.value);
    if (e.target.checknum.value == this.state.randomsu) {
      console.log(this.state.member_id);
      localStorage.saveid = this.state.member_id;
      this.props.PwResetOpen();
    } else {
      this.setState({
        pwCheck_msg2: "인증번호가 맞지 않습니다.",
        [e.target.checknum.name]: "",
      });
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
            <span id="findpwtit1" onClick={this.props.FindPwModalClose}>
              아이디 찾기
            </span>
            <span id="findpwtit2" onClick={this.props.FindPwModalOpen}>
              비밀번호 찾기
            </span>
          </div>

          {/* 비밀번호 찾기 폼 */}
          <form onSubmit={this.onCheckId.bind(this)} style={{ width: "100%" }}>
            <div className="loginbox">
              <input
                type="text"
                className="logininput"
                placeholder="이름"
                name="member_name"
                onChange={this.onKeyChange.bind(this)}
                value={this.state.member_name}
              ></input>
              <div className="logini"></div>
            </div>

            {/* 아이디 박스 */}
            <div className="loginbox">
              <input
                type="text"
                className="logininput"
                placeholder="아이디"
                name="member_id"
                onChange={this.onKeyChange.bind(this)}
                value={this.state.member_id}
              ></input>
              <div className="logini"></div>
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
          <div className="loginlabel">{this.state.pwCheck_msg}</div>

          {/* 인증번호 입력 박스  */}
          <form onSubmit={this.checkNumber.bind(this)} className="findidmns">
            <div id="findidbox">
              <input
                type="text"
                placeholder="인증번호"
                id="findidinp"
                name="checknum"
                onChange={this.onKeyChange.bind(this)}
                value={this.state.checknum}
              ></input>
            </div>
            <div className="loginlabel">{this.state.pwCheck_msg2}</div>
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
export default findpw;
