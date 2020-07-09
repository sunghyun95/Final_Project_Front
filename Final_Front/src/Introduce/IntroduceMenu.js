import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./IntroduceMenu.scss";

class IntroduceMenu extends Component {
  state = {
    Intro: 0,
    house: window.innerHeight,
    road: window.innerHeight + 700,
    introOn: "introMenuColor",
    houseOn: "",
    roadOn: "",
    standad: 0,
  };

  componentDidMount() {
    window.addEventListener("scroll", () => {
      // console.log(window.innerHeight);
      console.log(window.scrollY);
      let scrollY = window.scrollY;
      // console.log("scrollY: " + scrollY);

      if (scrollY >= 0 && scrollY < window.innerHeight - 115) {
        // console.log("학원소개");
        this.setState({
          introOn: "introMenuColor",
          houseOn: "",
          roadOn: "",
        });
      } else if (
        scrollY >= window.innerHeight - 115 &&
        scrollY < window.innerHeight + 700
      ) {
        // console.log("학원 시설");
        this.setState({
          introOn: "",
          houseOn: "introMenuColor",
          roadOn: "",
        });
      } else if (scrollY >= window.innerHeight + 700) {
        // console.log("오시는길");
        this.setState({
          introOn: "",
          houseOn: "",
          roadOn: "introMenuColor",
        });
      }
    });
  }

  //소개페이지 이동
  Intro = () => {
    // console.log("소개페이지로");
    window.scrollTo({ top: this.state.Intro, left: 0, behavior: "smooth" });
  };

  //학원시설로 이동
  House = () => {
    // console.log("학원시설로");
    window.scrollTo({ top: this.state.house, left: 0, behavior: "smooth" });
  };

  //오시는길 이동
  Road = () => {
    // console.log("오시는길로");
    window.scrollTo({ top: this.state.road, left: 0, behavior: "smooth" });
  };

  render() {
    return (
      <div>
        <div id="introduceMenu">
          <div className="sidmenunav">
            {/* 학원 소개 */}
            <div id="academyLink" className={this.state.introOn}>
              <div id="academyLinksub">IT소개</div>
              <a
                id="academyLinkmain"
                onClick={this.Intro.bind(this)}
                className={this.state.introOn}
              >
                <i className="far fa-bookmark"></i>
              </a>
            </div>

            {/* 학원 시설 */}
            <div id="introMenu2" className={this.state.houseOn}>
              <div id="introMenu2sub">학원시설</div>
              <a
                id="introMenu2main"
                onClick={this.House.bind(this)}
                className={this.state.houseOn}
              >
                <i className="fas fa-archway"></i>
              </a>
            </div>

            {/* 오시는길 */}
            <div id="introMenu3" className={this.state.roadOn}>
              <div id="introMenu3sub">오시는길</div>
              <a
                id="introMenu3main"
                onClick={this.Road.bind(this)}
                className={this.state.roadOn}
              >
                <i className="fas fa-train"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default IntroduceMenu;
