import React, { Component } from "react";
import MyPageMenu from "../MyPage/mypagemenu";
import { Link } from "react-router-dom";
import "./myclass.scss";

class myclass extends Component {
  render() {
    return (
      <div id="myclass">
        <div id="myclassback">
          <div id="myclasshd">
            {/* 헤더이미지 박스 */}
            <div id="mystudymainimgbox">
              <img
                src={require("../MyPage/mypage.jpg")}
                id="mystudymainimg"
              ></img>
            </div>
            {/* 헤더 백  */}
            <div id="mystudymainhdback"></div>

            {/* 타이틀 */}
            <div id="mypagelisttextbox">
              <div id="mypgaelisttit">IT Campus Mypage</div>
              <div id="mypgaelistsub">IT Campus Mypage</div>
              <MyPageMenu />
            </div>
          </div>

          {/* 타이틀 박스 */}
          <div id="mystudymaintextbox">
            <div id="signuptit">마이 스터디</div>
            <div id="signuplabel">
              IT Campus 스터디 현황을 확인 할수있습니다.
            </div>
          </div>
          <h2>내 학습공간입니다</h2>
          <Link to="/">
            <button>홈으로</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default myclass;
