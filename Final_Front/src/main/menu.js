import React, { Component } from "react";
import "./menu.scss";
import LoginForm from "../Login/loginform"; //로그인 첫 페이지
import SideMenu from "./sidmenu"; //사이드 버튼 메뉴
import FindId from "../Login/findid"; //아이디 찾기
import FindPw from "../Login/findpw"; //비밀번호 찾기
import PwReset from "../Login/pwreset"; //비밀번호 재설정
import SingUp from "../Login/singup"; //회원가입
import Swal from "sweetalert2";
import { Link, Redirect } from "react-router-dom";

// 모달
import Modal from "react-modal";
import { Avatar, makeStyles } from "@material-ui/core";
import Axios from "axios";

//마테리얼
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(1),
    height: theme.spacing(1),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

class Menu extends Component {
  state = {
    LoginModal: false, //로그인 모달창 열고 닫는 변수
    FindIdModal: false, //findid창이 뜨는 창
    FindPwModal: false, //비밀번호 찾기 열고 닫는 변수
    PwReset: false, //비밀번호 재설정 창 열고 닫는 변수
    SingUp: false, //회원가입 열고 닫는 변수
    loggedInfo: localStorage.getItem("loginok") === "success" ? true : false,
    member_id: localStorage.saveid,
    member_password: "",
    member_name: "",
    member_num: 0,
    check: localStorage.check,
    failmsg: "",
    loginchange: false,
    path: "http://localhost:8000/project/uploadfile/",
    profile: "",
  };

  //회원가입창 닫기
  SingUpClose = () => {
    this.setState({
      SingUp: false,
      LoginModal: true,
    });
  };

  //회원가입창 열기
  SingUpOpen = () => {
    this.setState({
      SingUp: true,
      LoginModal: false,
    });
  };

  // 비밀번호 재설정 닫기
  PwResetClose = () => {
    this.setState({
      PwReset: false,
      LoginModal: false,
      FindIdModal: false,
      FindPwModal: false,
    });
  };

  // 비밀번호 재설정 창 열기
  PwResetOpen = () => {
    this.setState({
      PwReset: true,
      LoginModal: false,
      FindIdModal: false,
      FindPwModal: false,
    });
  };
  //비밀번호 찾기 창 닫는 함수
  FindPwModalClose = () => {
    this.setState({
      FindIdModal: true,
      FindPwModal: false,
    });
    // console.log("비밀번호 찾기 닫쳐: " + this.state.FindPwModal);
  };

  //비밀번호 찾기 창 여는 함수
  FindPwModalOpen = () => {
    this.setState({
      FindIdModal: false,
      FindPwModal: true,
    });
  };

  //아이디 찾기 창 닫는 함수
  FindIdModalClose = () => {
    this.setState({
      FindIdModal: false,
      LoginModal: true,
      FindPwModal: false,
    });
    // console.log("로그인 닫기창: " + this.state.LoginModal);
  };

  //아이디 찾기 창 여는 메서드
  FindIdModalOpen = () => {
    this.setState({
      FindIdModal: true,
      LoginModal: false,
    });
  };

  //로그인창 여는 메서드
  LoginModalOpen = () => {
    this.setState({
      LoginModal: true,
    });
  };

  //로그인창 닫는 메서드
  LoginModalClose = () => {
    this.setState({
      LoginModal: false,
    });
    // console.log("로그인 닫기창: " + this.state.LoginModal);
  };

  //로그아웃
  isLogOut = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ok",
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("loginok");
        if (localStorage.check === "true") {
          this.setState({
            member_id: localStorage.saveid,
            check: localStorage.check,
            loginchange: false,
          });
          localStorage.removeItem("name");
          localStorage.removeItem("name2");
          localStorage.removeItem("num");
          localStorage.removeItem("type");
          localStorage.removeItem("profile");
          localStorage.removeItem("room");
          window.location.href = "/";
        } else {
          localStorage.check = "false";
          this.setState({
            member_id: localStorage.saveid,
            check: localStorage.unchecked,
            loginchange: false,
          });
          localStorage.removeItem("saveid");
          localStorage.removeItem("name");
          localStorage.removeItem("name2");
          localStorage.removeItem("num");
          localStorage.removeItem("type");
          localStorage.removeItem("profile");
          localStorage.removeItem("room");
          window.location.href = "/";
        }
      }
    });
  };

  componentDidMount = () => {
    let url =
      "http://localhost:8000/project/mypage/memberselect?member_num=" +
      localStorage.num;
    Axios.get(url)
      .then((res) => {
        this.setState({
          profile: this.state.path + res.data.member_profile,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // LoginData = (LoginModal) => {
  //   console.log("로그인 변수값 전송 :" + LoginModal);
  //   this.setState({
  //     LoginModal: LoginModal,
  //   });
  // };
  render() {
    const LoginBtn = styled(Button)({
      color: "rgb(34, 83, 184)",
      borderColor: "#2a9d8f",
    });
    return (
      <div id="header">
        <div id="hdback">
          <div id="hdbox">
            {/* 메인 로고 및 홈 버튼 */}
            <a id="hdlog" to="/" href="/">
              IT Campus
            </a>
          </div>
          {/* 로그인이 안되있을때 상단 메뉴에 로그인 버튼 활성화 */}
          {!this.state.loggedInfo && (
            <div id="hdbox2" onClick={this.LoginModalOpen.bind(this)}>
              <div id="hdspan">로그인</div>
              <div id="hdlabel">
                <Avatar alt="" src="" className={useStyles.small} />
              </div>
            </div>
          )}
          {/* 로그인 되어있을때 상단 메뉴에 과정명,마이페이지 버튼,이름 활성화 */}
          {this.state.loggedInfo && (
            <div id="hdbox2after">
              {localStorage.type !== "일반" && localStorage.type !== "매니저" && (
                <Link to="/classpage">
                  {/* 성현아 원래 형태는  href={"/classdata/" + this.props.process_num} 이거야 */}
                  <b id="hdspan">{localStorage.type}</b>
                </Link>
              )}
              {localStorage.type === "매니저" && (
                <b id="hdspan">{localStorage.name} 매니저님</b>
              )}
              {localStorage.type === "강사" && (
                <b id="hdspan">{localStorage.name} 강사님</b>
              )}
              {localStorage.type === "일반" && (
                <b id="hdspan">{localStorage.name} 님</b>
              )}
              {localStorage.type !== "매니저" &&
                localStorage.type !== "강사" &&
                localStorage.type !== "일반" && (
                  <b id="hdspan">{localStorage.name} 님</b>
                )}

              <Link to="/mypagelist" id="hdafterprofile">
                <Avatar
                  alt=""
                  src={this.state.profile}
                  className={useStyles.small}
                />
              </Link>
              <div id="hdbtnbox">
                <Button
                  onClick={this.isLogOut.bind(this)}
                  variant="outlined"
                  color="primary"
                >
                  로그아웃
                </Button>{" "}
              </div>
            </div>
          )}
        </div>

        {/* 로그인 창 모달 */}
        <Modal
          isOpen={this.state.LoginModal}
          ariaHideApp={false}
          id="loginModal"
        >
          <LoginForm
            LoginModalClose={this.LoginModalClose.bind(this)}
            FindIdModalOpen={this.FindIdModalOpen.bind(this)}
            SingUpOpen={this.SingUpOpen.bind(this)}
            isLogOut={this.isLogOut.bind(this)}
            member_id={this.state.member_id}
            check={this.state.check}
          />
        </Modal>

        {/* 아이디 찾기 창 모달 */}
        <Modal
          isOpen={this.state.FindIdModal}
          ariaHideApp={false}
          id="findidModal"
        >
          <FindId
            FindIdModalClose={this.FindIdModalClose.bind(this)}
            FindPwModalOpen={this.FindPwModalOpen.bind(this)}
            FindPwModalClose={this.FindPwModalClose.bind(this)}
            LoginModalClose={this.LoginModalClose.bind(this)}
            LoginModalOpen={this.LoginModalOpen.bind(this)}
          ></FindId>
        </Modal>

        {/* 비밀번호 찾기 모달 창  */}
        <Modal
          isOpen={this.state.FindPwModal}
          ariaHideApp={false}
          id="findidModal"
        >
          <FindPw
            FindIdModalClose={this.FindIdModalClose.bind(this)}
            FindPwModalOpen={this.FindPwModalOpen.bind(this)}
            FindPwModalClose={this.FindPwModalClose.bind(this)}
            PwResetOpen={this.PwResetOpen.bind(this)}
          ></FindPw>
          {/* <FindPw
            FindIdModalClose={this.FindIdModalClose.bind(this)}
            FindPwModalOpen={this.FindPwModalOpen.bind(this)}
            FindPwModalClose={this.FindPwModalClose.bind(this)}
          ></FindPw> */}
        </Modal>
        {/* 비밀번호 재설정 모달  */}
        <Modal
          isOpen={this.state.PwReset}
          ariaHideApp={false}
          id="PwResetModal"
        >
          <PwReset
            PwResetClose={this.PwResetClose.bind(this)}
            LoginModalClose={this.LoginModalClose.bind(this)}
            LoginModalOpen={this.LoginModalOpen.bind(this)}
          ></PwReset>
        </Modal>

        {/* 회원가입 모달  */}
        <Modal isOpen={this.state.SingUp} ariaHideApp={false} id="SingUpModal">
          <SingUp
            SingUpClose={this.SingUpClose.bind(this)}
            LoginModalClose={this.LoginModalClose.bind(this)}
            LoginModalOpen={this.LoginModalOpen.bind(this)}
          ></SingUp>
        </Modal>

        {/* 사이드 바 */}
        <SideMenu></SideMenu>
      </div>
    );
  }
}

export default Menu;
