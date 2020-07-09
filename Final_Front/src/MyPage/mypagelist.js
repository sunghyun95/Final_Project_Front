import React from "react";
import mypageimg from "./mypage.jpg";
import MyPageMenu from "./mypagemenu";
import "./mypagelist.scss";

const backimage = {
  width: "100%",
  height: "850px",
  backgroundImage: `url(${mypageimg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 850px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const header = () => (
  <div>
    <span>IT Campus Mypage</span>

    <span>IT Campus Mypage</span>

    <div></div>
  </div>
);

const mypagelist = () => {
  return (
    <div id="mypagelist">
      <div id="mypagelistback">
        <div id="mypagelistbackbox">
          <div id="mypagelistlastback"></div>
          <div id="mypagelistimgbox">
            <img src={require("./mypage.jpg")} id="mypagelistimg"></img>
          </div>
        </div>
        <div id="mypagelisttextbox">
          <div id="mypgaelisttit">IT Campus Mypage</div>
          <div id="mypgaelistsub">IT Campus Mypage</div>
          <MyPageMenu />
        </div>
      </div>
    </div>
  );
};

export default mypagelist;
