import React, { Component } from "react";
import "./loginform.css";

//마테리얼
import Checkbox from "@material-ui/core/Checkbox";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";

class Loginform extends Component {
  state = {
    member_id: "",
    member_password: "",
    member_name: "",
    member_num: 0,
    member_type: "",
    check: "",
    failmsg: "",
    loginchange: false,
  };

  //아이디 입력값 넣기
  onKeyIdChange = (e) => {
    e.preventDefault();
    this.setState({
      member_id: e.target.value,
    });
    console.log("id:" + this.state.member_id);
  };

  //비밀번호 입력값 넣기
  onKeyPwChange = (e) => {
    e.preventDefault();
    this.setState({
      member_password: e.target.value,
    });
    console.log("password:" + this.state.member_password);
  };

  //아이디 저장 값 넣기
  idSave = (e) => {
    console.log(e.target.checked);

    if (e.target.checked) {
      this.setState({
        check: e.target.checked,
      });
      localStorage.check = "true";
    } else {
      localStorage.check = "false";
      localStorage.saveid = "";
      localStorage.name = "";
      localStorage.num = 0;
      this.setState({
        check: e.target.unchecked,
      });
    }
  };
  //로그인 검증
  isLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("member_id", this.state.member_id);
    formData.append("member_password", this.state.member_password);
    e.preventDefault();
    let url = "http://localhost:8000/project/login/loginck";
    axios
      .post(url, formData)
      .then((res) => {
        if (res.data.success === "success") {
          localStorage.loginok = "success";
          //아이디 저장할때 로컬스토리지에 아이디,넘버,이름 저장
          if (localStorage.check !== "false") {
            localStorage.saveid = this.state.member_id;
            localStorage.num = res.data.member_num;
            localStorage.name = res.data.member_name;
            localStorage.name2 = res.data.member_name;
            localStorage.type = res.data.member_type;
          }
          //아이디 저장 안할때 로컬스토리지에 넘버,이름 저장
          else if (localStorage.check === "false") {
            localStorage.num = res.data.member_num;
            localStorage.name = res.data.member_name;
            localStorage.name2 = res.data.member_name;
            localStorage.type = res.data.member_type;
          }
          this.setState({
            login: "login-hide",
            failmsg: "",
            member_name: res.data.member_name,
            loginchange: true,
          });

          this.props.LoginModalClose();
          Swal.fire({
            position: "middle-middle",
            icon: "success",
            title: "로그인 성공",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.href = "/";
        } else {
          this.setState({
            failmsg: "아이디 또는 비밀번호를 확인하세요",
          });
          localStorage.loginok = "fail";
        }
      })
      .catch((err) => {
        console.log("로그인 에러:" + err);
      });
  };

  //menu.js에서 로그아웃 시 변수값 가져오기
  componentDidMount() {
    if (this.props.member_id !== "") {
      this.setState({
        member_id: this.props.member_id,
      });
    }
    if (this.props.check !== "false") {
      this.setState({
        check: this.props.check,
      });
    }
  }

  //로그인 시 로그아웃버튼 생기게하고 로그아웃 시, 로그인 폼 나오게 하기
  render() {
    const IdCheck = styled(Checkbox)({
      color: "rgb(34, 83, 184)",
    });

    const LoginBtn = styled(Button)({
      color: "rgb(34, 83, 184)",
      borderColor: "rgb(34, 83, 184)",
    });
    return (
      <div className="loginform">
        <form className="loginmainback" onSubmit={this.isLogin.bind(this)}>
          {/* 상단 회원가입 버튼 */}
          <div id="loginbtn" onClick={this.props.SingUpOpen}>
            <i className="fas fa-pencil-alt"></i>
          </div>

          {/* 로그인 타이틀 */}
          <div id="logintit">로그인</div>

          {/* 아이디 input 박스 */}
          <div className="loginbox">
            <div className="loginlabel"></div>
            <input
              type="text"
              className="logininput"
              placeholder="아이디"
              name="member_id"
              value={this.state.member_id}
              onChange={this.onKeyIdChange.bind(this)}
            ></input>
            <div className="logini"></div>
          </div>

          {/* 비밀번호 input 박스 */}
          <div className="loginbox">
            <div className="loginlabel"></div>
            <input
              type="password"
              className="logininput"
              placeholder="비밀번호"
              name="member_password"
              onKeyUp={this.onKeyPwChange.bind(this)}
            ></input>
            <div className="logini"></div>
          </div>

          {/* 아이디 저장 체크 박스 */}
          <div id="logincheckbox">
            {/* 마테리얼 칼라를 변경하기 위해서 color 인라인으로 삽입 필요 
            하지만 오류 발생 */}
            <IdCheck
              size="small"
              color="default"
              checked={this.state.check}
              onChange={this.idSave.bind(this)}
            />
            아이디 저장
          </div>

          <div id="loginhidbox">{this.state.failmsg}</div>
          {/* 아이디 / 비밀번호 분실 박스  */}
          <span id="loginspanbox" onClick={this.props.FindIdModalOpen}>
            아이디 / 비밀번호 분실
          </span>

          {/* 버튼 박스 */}
          <div id="loginbtnbox">
            <LoginBtn
              type="submit"
              variant="outlined"
              className="loginbtn2"
              id="loginbtn2"
            >
              로그인
            </LoginBtn>
            <LoginBtn
              onClick={this.props.LoginModalClose}
              variant="outlined"
              className="loginbtn2"
            >
              취소
            </LoginBtn>
          </div>
        </form>
      </div>
    );
  }
}
export default Loginform;
