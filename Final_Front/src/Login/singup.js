import React, { Component } from "react";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import Modal from "react-modal";
import "./singup.css";
import Swal from "sweetalert2";

//마테리얼
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { th } from "date-fns/locale";

class singup extends Component {
  state = {
    email: "",

    member_name: "",
    member_id: "",
    member_password: "",
    member_passwordcheck: "",
    member_phone: "",
    member_email: "",
    member_address: "",
    member_detailaddr: "",

    idcheck: "",
    namecheck: "",
    passwordcheck: "",
    emailcheck: "",
    phonecheck: "",
    addresscheck: "",
    detailaddrcheck: "",
    modalOpen: false,

    checknum: "",
    randomsu: "123456",
    phCheck_msg: "",
  };
  componentDidMount() {
    const script = document.createElement("script");

    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;

    document.body.appendChild(script);
  }
  onKeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
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

  closeModal = (e) => {
    this.setState({
      modalOpen: false,
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
  OnIdCheck = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (this.state.member_id.length >= 8) {
      let url =
        "http://localhost:8000/project/member/idcheck?id=" +
        this.state.member_id;
      axios
        .get(url)
        .then((res) => {
          this.setState({
            idcheck: res.data,
          });
          console.log(this.state.idcheck);

          if (this.state.idcheck === 0) {
            this.setState({
              idcheck: "",
            });
            this.setState({
              idcheck: "사용가능한 아이디입니다",
            });
          } else {
            this.setState({
              idcheck: "이미 사용중인 아이디입니다",
            });
          }
        })
        .catch((err) => {
          console.log("아이디체크 에러 :" + err);
        });
    }
  };
  onSearchAddress = (e) => {
    e.preventDefault();
    this.setState({
      modalOpen: true,
    });
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);

    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=39f4584eccca7de06e40936fd4433af5&libraries=services";
    document.head.appendChild(script);
  };
  handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    console.log(this.state.member_address);
    this.setState({
      member_address: fullAddress,
    });
    this.setState({
      modalOpen: false,
    });
  };
  onAddressChange = (e) => {
    this.setState({
      member_address: this.refs.member_address.value,
    });
  };
  onInsertSubmit = (e) => {
    e.preventDefault();

    if (this.state.member_name === "") {
      this.setState({
        namecheck: "이름을 입력해주세요",
      });
      this.refs.member_name.focus();

      return false;
    }
    if (this.state.member_id === "") {
      this.setState({
        idcheck: "아이디를 입력해주세요",
      });
      this.refs.member_id.focus();
      return false;
    }
    if (
      this.state.member_password === "" ||
      this.state.member_passwordcheck === ""
    ) {
      this.setState({
        passwordcheck: "비밀번호를 입력해주세요",
      });
      this.refs.member_password.value = "";
      this.refs.member_passwordcheck.value = "";

      this.refs.member_password.focus();

      return false;
    }

    if (this.state.member_email === "" || this.state.email === "") {
      console.log(this.refs.refsignupemail.value);
      this.setState({
        emailcheck: "이메일을 입력해주세요",
      });
      this.refs.member_email.focus();
      return false;
    }
    if (this.state.member_address === "") {
      this.setState({
        addresscheck: "주소를 검색해주세요",
      });
      return false;
    }
    if (this.state.member_detailaddr === "") {
      this.setState({
        detailaddrcheck: "상세 주소를 입력해주세요",
      });
      this.refs.member_detailaddr.focus();
      return false;
    }

    if (this.refs.member_phone.value === "") {
      this.refs.member_phone.focus();
      this.setState({
        phonecheck: "폰 번호를 입력해주세요",
      });
      return false;
    }

    var regex = /^[A-Za-z0-9]{8,15}$/;
    if (!regex.test(this.state.member_id)) {
      this.setState({
        idcheck:
          "아이디는 영어(소문자)와 숫자 조합으로 최소8자 최대 15자로 생성 가능합니다",
      });
      return false;
    }

    if (this.state.member_password !== this.state.member_passwordcheck) {
      this.setState({
        passwordcheck: "입력하신 비밀번호가 일치하지 않습니다",
      });
      this.refs.member_password.focus();

      return false;
    } else {
      var regex2 = /^.*(?=^.{10,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if (!regex2.test(this.state.member_password)) {
        this.setState({
          passwordcheck:
            "비밀번호는 영문,숫자,특수문자(!@#$%^&+=) 조합으로 최소10자 최대 20자로 생성 가능합니다",
        });
        return false;
      }
    }

    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRule.test(this.state.member_email + "@" + this.state.email)) {
      this.setState({
        emailcheck: "이메일 형식이 올바르지 않습니다",
      });
      return false;
    }

    if (this.state.randomsu === "123456") {
      this.setState({
        phCheck_msg: "핸드폰 인증이 필요합니다.",
      });
      return;
    } else if (this.state.randomsu == this.state.checknum) {
      let memberData = new FormData();
      memberData.append("member_name", this.state.member_name);
      memberData.append("member_id", this.state.member_id);
      memberData.append("member_password", this.state.member_password);
      memberData.append("member_phone", this.state.member_phone);
      memberData.append(
        "member_email",
        this.state.member_email + "@" + this.state.email
      );
      memberData.append("member_address", this.state.member_address);
      memberData.append("member_detailaddr", this.state.member_detailaddr);
      let url = "http://localhost:8000/project/member/insert";

      axios
        .post(url, memberData)
        .then((res) => {
          this.props.SingUpClose();
          this.props.LoginModalClose();
          Swal.fire({
            title: "회원가입 성공",
            text: "회원가입이 완료되었습니다",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#008000",
            confirmButtonText: "로그인",
            cancelButtonText: "홈으로",
          }).then((result) => {
            if (result.value) {
              this.props.LoginModalOpen();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
          });
        })
        .catch((err) => {
          console.log("회원가입 에러 : " + err);
        });
    } else {
      this.setState({
        phCheck_msg: "인증번호가 맞지 않습니다.",
      });
      return;
    }
  };
  //send SMS
  onSms = () => {
    if (this.state.member_phone === "") {
      this.setState({
        phCheck_msg: "핸드폰 번호를 입력해주세요.",
      });
      return;
    }

    const dataForm = new FormData();
    dataForm.append("member_phone", this.state.member_phone);
    var url = "http://localhost:8000/project/check/checknum";
    axios
      .post(url, dataForm)
      .then((res) => {
        this.setState({
          randomsu: res.data,
          phCheck_msg: "인증번호 발송이 완료되었습니다.",
        });
      })
      .catch((err) => {
        console.log("발송 버튼 error=" + err);
      });
  };

  render() {
    const post = () => {
      new window.daum.Postcode({
        oncomplete: function (data) {
          const zonecode = data.zonecode;
          const roadAddr = data.address;
          const str = "(" + zonecode + ")" + roadAddr;
          document.getElementById("member_address").value = str;
        },
      }).open();
    };
    const LoginBtn = styled(Button)({
      color: "rgb(34, 83, 184)",
      borderColor: "rgb(34, 83, 184)",
    });
    return (
      <div id="singup">
        <div id="singupback">
          <div id="singupsidbox"></div>
          <div id="singuptextbox">
            <form id="singupback2" onSubmit={this.onInsertSubmit.bind(this)}>
              {/* 타이틀 */}
              <div id="singuptit">회원가입</div>

              {/* 이름 */}
              <div className="loginbox">
                <div className="loginlabel">{this.state.namecheck}</div>
                <input
                  type="text"
                  className="logininput"
                  placeholder="이름"
                  name="member_name"
                  onChange={this.onKeyChange.bind(this)}
                  ref="member_name"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 아이디 */}
              <div className="loginbox">
                <div className="loginlabel">{this.state.idcheck}</div>
                <input
                  type="text"
                  className="logininput"
                  placeholder="아이디"
                  name="member_id"
                  onKeyUp={this.OnIdCheck.bind(this)}
                  onChange={this.onKeyChange.bind(this)}
                  ref="member_id"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 비밀번호  */}
              <div className="loginbox">
                <div className="loginlabel">{this.state.passwordcheck}</div>
                <input
                  type="password"
                  className="logininput"
                  placeholder="비밀번호"
                  name="member_password"
                  onChange={this.onKeyChange.bind(this)}
                  ref="member_password"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 비밀번호 확인 */}
              <div className="loginbox">
                <div className="loginlabel"></div>
                <input
                  type="password"
                  className="logininput"
                  placeholder="비밀번호 확인"
                  name="member_passwordcheck"
                  onChange={this.onKeyChange.bind(this)}
                  ref="member_passwordcheck"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 이메일 */}
              <div className="signupback">
                <div className="signupboxmail">
                  <div className="loginlabel">{this.state.emailcheck}</div>
                  <input
                    type="text"
                    className="logininput"
                    placeholder="이메일"
                    name="member_email"
                    onChange={this.onKeyChange.bind(this)}
                    ref="member_email"
                  ></input>
                  <div className="logini"></div>
                </div>
                <div>@</div>
                <div className="signupboxmail">
                  <select
                    ref="refsignupemail"
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
                    ref="member_emailaddress"
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

              {/* 주소 */}
              <div className="signupback">
                <div id="findidtelbox">
                  <div className="loginlabel">{this.state.address_check}</div>
                  <input
                    type="text"
                    className="logininput"
                    placeholder="주소"
                    readOnly="readonly"
                    id="member_address"
                    name="member_address"
                    onChange={this.onKeyChange.bind(this)}
                    ref="member_address"
                  ></input>
                  <div className="logini"></div>
                </div>

                <div>
                  <LoginBtn
                    variant="outlined"
                    className="findidbtns"
                    onClick={post}
                  >
                    주소 검색
                  </LoginBtn>
                </div>
              </div>

              {/* 상세주소 */}
              <div className="loginbox">
                <div className="loginlabel">{this.state.detailaddrcheck}</div>
                <input
                  type="text"
                  className="logininput"
                  placeholder="상세주소"
                  name="member_detailaddr"
                  onFocus={this.onAddressChange.bind(this)}
                  onChange={this.onKeyChange.bind(this)}
                  ref="member_detailaddr"
                ></input>
                <div className="logini"></div>
              </div>

              {/* 휴대폰 번호 박스 */}
              <div className="signupback">
                <div id="findidtelbox">
                  <div className="loginlabel">{this.state.phonecheck}</div>
                  <input
                    type="text"
                    className="logininput"
                    placeholder="휴대폰 번호"
                    name="member_phone"
                    ref="member_phone"
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
                    onClick={this.onSms.bind(this)}
                  >
                    인증번호 받기
                  </LoginBtn>
                </div>
              </div>

              {/* 인증번호 입력 박스  */}
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
              {/* 경고 문구 출력 창  */}
              <div className="loginlabel" id="signupwarning">
                {this.state.phCheck_msg}
              </div>

              {/* 버튼박스 */}
              <div id="signupbtnbox">
                <LoginBtn
                  type="submit"
                  // onClick={this.props.SingUpClose}
                  variant="outlined"
                  className="findidbtnm"
                  id="signupbtn"
                >
                  확인
                </LoginBtn>
                <LoginBtn
                  onClick={this.props.SingUpClose}
                  variant="outlined"
                  className="findidbtnm"
                >
                  닫기
                </LoginBtn>
                <Modal
                  style={{ width: "200px", height: "300px" }}
                  isOpen={this.state.modalOpen}
                >
                  <div>
                    <DaumPostcode onComplete={this.handleAddress} />

                    <button type="button" onClick={this.closeModal.bind(this)}>
                      CLOSE
                    </button>
                  </div>
                </Modal>
              </div>
            </form>
          </div>
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
export default singup;
