import React, { Component } from "react";
import MyPageMenu from "../MyPage/mypagemenu";
import { Link } from "react-router-dom";
import "./classmanage.scss";

class ClassManage extends Component {
  render() {
    return (
      <div id="classmanage">
        <div id="classmanageback">
          {/* 여기서 시작 */}
          <div id="classmanagenav">
            <div id="mypagelistbackbox">
              <div id="mypagelistlastback"></div>
              <div id="classmanageimgbox">
                <img
                  src={require("../MyPage/mypage.jpg")}
                  id="mypagelistimg"
                ></img>
              </div>
            </div>
            <div id="mypagelisttextbox">
              <div id="mypgaelisttit">IT Campus Mypage</div>
              <div id="mypgaelistsub">IT Campus Mypage</div>
              <MyPageMenu />
            </div>
          </div>

          {/* ??? */}
          <h2>강사 수업관리 페이지입니다</h2>

          <Link to="/">
            <button>홈으로</button>
          </Link>

          {/* 여기가 끝 */}
        </div>
      </div>
    );
  }
}
export default ClassManage;
