import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./mypagemenu.css";

class MyPageMenu extends Component {
  render() {
    const activeStyle = {
      color: "#ffe66d",
    };
    const menuStyle = {
      textAlign: "center",
    };
    const divStyle = {
      float: "left",
      marginLeft: "50px",
      marginRight: "50px",
    };
    return (
      <div style={menuStyle}>
        <NavLink
          to="/mypageupdate"
          className="mypagemenu-link"
          activeStyle={activeStyle}
        >
          <div style={divStyle}>
            <i className="fas fa-user-edit" style={{ fontSize: "80px" }} />
            <br />
            회원 정보
          </div>
        </NavLink>
        {/* 일반 회원만 */}
        {localStorage.type === "일반" && (
          <NavLink
            to="/signup"
            className="mypagemenu-link"
            activeStyle={activeStyle}
          >
            <div style={divStyle}>
              <i className="fas fa-folder-plus" style={{ fontSize: "80px" }} />
              <br />
              수강신청
            </div>
          </NavLink>
        )}
        {/* 매니저만 */}
        {localStorage.type === "매니저" && (
          <NavLink
            to="/signupmanage"
            className="mypagemenu-link"
            activeStyle={activeStyle}
          >
            <div style={divStyle}>
              <i
                className="fas fa-clipboard-list"
                style={{ fontSize: "80px" }}
              />
              <br />
              수강신청 관리
            </div>
          </NavLink>
        )}
        {localStorage.type === "매니저" && (
          <NavLink
            to="/memberlist"
            className="mypagemenu-link"
            activeStyle={activeStyle}
          >
            <div style={divStyle}>
              <i className="fas fa-user-friends" style={{ fontSize: "80px" }} />
              <br />
              회원 관리
            </div>
          </NavLink>
        )}
        {/* {localStorage.type === "매니저" && (
          <Link
            to="/MyProcessList"
            className="mypagemenu-link"
            activeStyle={activeStyle}
          >
            <div style={divStyle}>
              <i className="fas fa-user-friends" style={{ fontSize: "80px" }} />
              <br />
              담당 수강 과정
            </div>
          </Link>
        )} */}

        {localStorage.type === "수강생" && (
          <NavLink
            to="/mystudymain"
            className="mypagemenu-link"
            activeStyle={activeStyle}
          >
            <div style={divStyle}>
              <i className="fas fa-book-open" style={{ fontSize: "80px" }} />
              <br />
              마이 스터디
            </div>
          </NavLink>
        )}
        {/* {localStorage.type === "수강생" && (
          <NavLink
            to="/myclass"
            className="mypagemenu-link"
            activeStyle={activeStyle}
          >
            <div style={divStyle}>
              <i className="fab fa-chromecast" style={{ fontSize: "80px" }} />
              <br />
              마이 강의
            </div>
          </NavLink>
        )}
        {localStorage.type === "수강생" && (
          <NavLink
            to="/mynote"
            className="mypagemenu-link"
            activeStyle={activeStyle}
          >
            <div style={divStyle}>
              <i className="fab fa-chromecast" style={{ fontSize: "80px" }} />
              <br />
              일일노트
            </div>
          </NavLink>
        )} */}
      </div>
    );
  }
}
export default MyPageMenu;
