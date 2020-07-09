import React, { Component, useState, useEffect } from "react";
import MyPageMenu from "../MyPage/mypagemenu";
import "./mypageupdate.css";

// 마테리얼
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { Avatar, makeStyles } from "@material-ui/core";
import Swal from "sweetalert2";
import Mypagelist from "./mypagelist";

const MypageupButton = styled(Button)({
  color: "rgb(34, 83, 184)",
  borderColor: "rgb(34, 83, 184)",
  fontWeight: "bold",
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

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

export default function MyPageUpdate(props) {
  const [member_name, setMemberName] = useState("");
  const [member_type, setMemberType] = useState("");
  const [member_phone, setMemberPhone] = useState("");
  const [member_email, setMemberEmail] = useState("");
  const [member_address, setMemberAddress] = useState("");
  const [member_detailaddr, setMemberDetailAddr] = useState("");
  const [member_profile, setMemberProfile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const classes = useStyles();

  const post = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const zonecode = data.zonecode;
        const roadAddr = data.address;
        const str = "(" + zonecode + ")" + roadAddr;
        setMemberAddress(str);
      },
    }).open();
  };
  const handleImageChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    if (event.target.files[0]) reader.readAsDataURL(file);
    setMemberProfile(file);
  };
  const handlePhoneChange = (event) => {
    setMemberPhone(autoHypenPhone(event.target.value.replace(/[^0-9]/g, "")));
    console.log(member_phone);
  };
  const handleEmailChange = (event) => {
    setMemberEmail(event.target.value);
    console.log(member_email);
  };
  const handleDetailAddrChange = (event) => {
    setMemberDetailAddr(event.target.value);
    console.log(member_detailaddr);
  };

  useEffect(() => {
    list();
    const script = document.createElement("script");

    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    setPreviewImg(<Avatar alt="" src={previewURL} className={classes.large} />);
  }, [previewURL]);

  useEffect(() => {
    const path = "http://localhost:8000/project/uploadfile/";
    setPreviewImg(
      <Avatar alt="" src={path + member_profile} className={classes.large} />
    );
    console.log(member_profile);
  }, [member_profile]);

  const list = () => {
    const url =
      "http://localhost:8000/project/mypage/memberselect?member_num=" +
      localStorage.num;

    Axios.get(url)
      .then((res) => {
        setMemberName(res.data.member_name);
        setMemberType(res.data.member_type);
        setMemberPhone(res.data.member_phone);
        setMemberEmail(res.data.member_email);
        setMemberAddress(res.data.member_address);
        setMemberDetailAddr(res.data.member_detailaddr);
        setMemberProfile(res.data.member_profile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:8000/project/mypage/memberupdate";
    const formData = new FormData();
    formData.append("member_num", localStorage.num);
    formData.append("member_name", localStorage.name);
    formData.append("member_phone", member_phone);
    formData.append("member_email", member_email);
    formData.append("member_address", member_address);
    formData.append("member_detailaddr", member_detailaddr);
    if (typeof member_profile !== "string")
      formData.append("profile_image", member_profile);
    if (typeof member_profile === "string")
      formData.append("member_profile", member_profile);
    localStorage.profile = member_profile;
    Axios.post(url, formData)
      .then((res) => {
        Swal.fire({
          position: "middle-middle",
          icon: "success",
          title: "프로필이 성공적으로 수정되었습니다!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = window.location.href;
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Mypagelist />
      <div style={{ paddingTop: "100px" }}></div>
      <span style={{ fontSize: "40px", color: "rgb(34, 83, 184)" }}>
        회원 정보
      </span>
      <br />
      <br />
      <span style={{ fontSize: "18px", color: "#A6A6A6" }}>
        IT Campus 회원 정보를 수정 하실 수 있습니다.
      </span>
      <div style={{ paddingTop: "200px" }}></div>
      <form onSubmit={onSubmit}>
        {/* 프로필 테이블 창*/}
        <table style={tableStyle} align="center">
          <tbody>
            <tr style={trStyle}>
              <td rowSpan="5" style={{ width: 300 }} align="center">
                <span>{previewImg}</span>
                <br />
                <span className="filebox">
                  <label for="ex_file">사진 변경</label>
                  <input
                    type="file"
                    id="ex_file"
                    accept="image/*"
                    onChange={handleImageChange}
                  ></input>
                </span>
              </td>
              <td style={{ width: 200 }}>이름</td>
              <td style={{ width: 600, textAlign: "left" }}>{member_name}</td>
            </tr>
            <tr style={trStyle}>
              <td>과정</td>
              <td style={{ textAlign: "left" }}>{member_type}</td>
            </tr>
            <tr style={trStyle}>
              <td>핸드폰</td>
              <td style={{ textAlign: "left" }}>
                <span style={{ width: 300 }}>
                  <input
                    type="text"
                    className="logininput"
                    name="member_phone"
                    defaultValue={member_phone}
                    maxLength="13"
                    onChange={handlePhoneChange}
                  ></input>
                </span>
                {/* <div className="mypageup-i"></div> */}
              </td>
            </tr>
            <tr style={trStyle}>
              <td>이메일</td>
              <td>
                <input
                  type="text"
                  className="mypageup-input"
                  defaultValue={member_email}
                  onChange={handleEmailChange}
                ></input>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>주소</td>
              <td style={{ textAlign: "left" }}>
                <br />
                <MypageupButton
                  variant="outlined"
                  id="mypage-addrbtn"
                  onClick={post}
                >
                  주소 검색
                </MypageupButton>
                <input
                  type="text"
                  className="mypageup-input"
                  id="mypageup-addrinp"
                  defaultValue={member_address}
                  readOnly
                ></input>

                <input
                  type="text"
                  className="mypageup-input"
                  id="mypageup-addrinp2"
                  defaultValue={member_detailaddr}
                  onChange={handleDetailAddrChange}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ paddingBottom: "20px" }}></div>
        <button type="submit" style={buttonStyle}>
          <i class="fas fa-pencil-alt"></i>&nbsp;&nbsp; 저장
        </button>
      </form>
      <div style={{ paddingBottom: "100px" }}></div>
    </div>
  );
}
