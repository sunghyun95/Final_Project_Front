import React, { Component } from "react";
import "./pwreset.css";
import Swal from "sweetalert2";

//마테리얼
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Axios from "axios";

class pwreset extends Component {
  state = {
    member_id: localStorage.saveid,
    pwCheckmsg: "",
  };
  updatePassword = (e) => {
    e.preventDefault();
    var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!regex.test(e.target.member_password.value)) {
      this.setState({
        pwCheckmsg:
          "문자/숫자/특수문자(!@#$%^&+=)를 포함한 8~15자리를 입력하세요.",
      });
      return;
    } else {
      if (e.target.member_password.value === e.target.member_repassword.value) {
        const dataForm = new FormData();
        dataForm.append("member_id", this.state.member_id);
        dataForm.append("member_password", e.target.member_password.value);
        var url = "http://localhost:8000/project/check/updatepassword";
        Axios.post(url, dataForm)
          .then((res) => {
            console.log("비밀번호 업데이트 완료");
            localStorage.removeItem("saveid");
            this.props.PwResetClose();
            this.props.LoginModalClose();
            Swal.fire("비밀번호 재설정 완료").then((result) => {
              this.props.LoginModalOpen();
            });
          })
          .catch((err) => {
            console.log("비밀번호 업데이트 에러=" + err);
          });
      } else {
        this.setState({
          pwCheckmsg: "비밀번호가 일치하지 않습니다.",
        });
        return;
      }
    }
  };
  render() {
    console.log(this.state.member_id);
    const LoginBtn = styled(Button)({
      color: "rgb(34, 83, 184)",
      borderColor: "rgb(34, 83, 184)",
    });
    return (
      <div id="pwreset">
        <div id="pwresetback">
          {/* 타이틀 */}
          <div id="pwresettit">비밀번호 재설정</div>
          <form onSubmit={this.updatePassword.bind(this)}>
            {/* 비밀번호 재설정 */}
            <div className="loginbox">
              <input
                type="password"
                className="logininput"
                placeholder="비밀번호"
                name="member_password"
              ></input>
              <div className="logini"></div>
            </div>

            {/* 비밀번호 재설정 확인 */}
            <div className="loginbox">
              <input
                type="password"
                className="logininput"
                placeholder="비밀번호 확인"
                name="member_repassword"
              ></input>
              <div className="logini"></div>
            </div>

            <div className="loginlabel" id="pwresetlabel">
              {this.state.pwCheckmsg}
            </div>
            {/* 버튼 박스 */}
            <div id="pwresetbtnbox">
              <LoginBtn
                variant="outlined"
                className="findidbtnm"
                id="findidbtnm1"
                type="submit"
              >
                확인
              </LoginBtn>
              <LoginBtn
                onClick={this.props.PwResetClose}
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

export default pwreset;
