import React, { Component } from "react";
import CurriculumMenu from "../Curriculum/CurriculumMenu";
import "./CurriculumSchedule.scss";
import Calender from "./calender";
import CurriculumList from "./CurriculumList";

//  참고 사이트 :
// https://blog.flowandform.agency/create-a-custom-calendar-in-react-

class CurriculumSchedule extends Component {
  constructor({ match }) {
    super();
    // if (match.params.list_num == 2) {
    //   console.log("2");
    //   this.state = {
    //     calender: "calenderOff",
    //     currilist: "currilistOn",
    //   };
    // } else {
    //   console.log("1");
    //   this.state = {
    //     calender: "calender",
    //     currilist: "currilistOff",
    //   };
    // }

    this.num = match.params.list_num;
    this.state = {
      calender: "calender",
      currilist: "currilistOff",
      // 박스 변수
      allbox: "currilistAllbox",
      phpbox: "curriSchcercle",
      Reactbox: "curriSchcercle",
      Java: "curriSchcercle",

      // 필터링 달력
      bigdata: "bigdata",
      cloud: "cloud",
      ai: "ai",

      //필터링 카드
      bigdatacard: "",
      cardcloud: "",
      cardai: "",

      // 카드 디테일 모달
      CardModal: false,
    };
  }

  componentWillMount() {
    if (this.num == 2) this.CurrilistOn();
    else this.calenderOn();
  }
  // constructor({ match }) {
  //   super();
  //   // if (match.params.list_num == 2) {
  //   //   this.setState({
  //   //     calender: "calenderOff",
  //   //     currilist: "currilistOn",
  //   //   });
  //   // }
  // }
  // 카드 디테일 열기
  CardModalOn = () => {
    this.setState({
      CardModal: true,
    });
  };

  CardModalOff = () => {
    this.setState({
      CardModal: false,
    });
  };

  // 박스 클릭 이벤트
  AllBox = () => {
    this.setState({
      allbox: "currilistAllbox",
      phpbox: "curriSchcercle",
      Reactbox: "curriSchcercle",
      Java: "curriSchcercle",

      // 달력 필터링
      bigdata: "bigdata",
      cloud: "cloud",
      ai: "ai",

      // 카드 필터링
      bigdatacard: "",
      cardcloud: "",
      cardai: "",
    });
  };

  PHPBox = () => {
    this.setState({
      allbox: "curriSchcercle",
      phpbox: "currilistAllbox",
      Reactbox: "curriSchcercle",
      Java: "curriSchcercle",

      //달력 필터링
      bigdata: "bigdata",
      cloud: "hid",
      ai: "hid",

      // 카드 필터링
      bigdatacard: "",
      cardcloud: "hid",
      cardai: "hid",
    });
  };

  ReactBox = () => {
    this.setState({
      allbox: "curriSchcercle",
      phpbox: "curriSchcercle",
      Reactbox: "currilistAllbox",
      Java: "curriSchcercle",

      //달력 필터링
      bigdata: "hid",
      cloud: "cloud",
      ai: "hid",

      // 카드 필터링
      bigdatacard: "hid",
      cardcloud: "",
      cardai: "hid",
    });
  };

  JavaBox = () => {
    this.setState({
      allbox: "curriSchcercle",
      phpbox: "curriSchcercle",
      Reactbox: "curriSchcercle",
      Java: "currilistAllbox",

      //달력 필터링
      bigdata: "hid",
      cloud: "hid",
      ai: "ai",

      // 카드 필터링
      bigdatacard: "hid",
      cardcloud: "hid",
      cardai: "",
    });
  };

  // 사이드바
  CurrilistOn = () => {
    console.log("CurrilistOn 클릭");
    this.setState({
      calender: "calenderOff",
      currilist: "currilistOn",
    });
  };

  calenderOn = () => {
    console.log("calenderON 클릭");
    this.setState({
      calender: "calender",
      currilist: "currilistOff",
    });
  };

  test = () => {
    alert("test");
  };
  render() {
    return (
      <div id="curriSch">
        <CurriculumMenu
          CurrilistOn={this.CurrilistOn.bind(this)}
          calenderOn={this.calenderOn.bind(this)}
        />
        <div id="curriSchimgbox">
          <img src={require("../image/keyboard.jpg")} id="curriSchimg"></img>
          <div id="curriSchimgback"></div>
          <div id="curriSchimgtextbox">
            <div id="curriSchimgtitbox">
              <div>IT Campus CurriCulum</div>
              <div className="margin10">
                <i className="far fa-calendar-alt"></i>
              </div>
            </div>
            <div id="curriSchimgsubbox">
              <div id="marginbottom10">
                기업이 "신입" 에게 바라는 것은 "SW 개발의 기본을 출실히 알고
                있는가?"입니다.
              </div>
              <div>
                6개월이 지난 후 기업 실무현장에서의 당신은 "당당합니다."
              </div>
            </div>
          </div>
        </div>
        <div id="curriSchback">
          {/* 상단에 필터 선택 창 */}
          <div id="curriSchnav">
            {/* 전체 박스 */}
            <div className="curriSchnavbox" onClick={this.AllBox.bind(this)}>
              <div className={this.state.allbox}>
                <i className="fas fa-globe"></i>
              </div>
              <div className="curriSchcerletex">All</div>
            </div>

            {/* PHP 박스 */}
            <div className="curriSchnavbox" onClick={this.PHPBox.bind(this)}>
              <div className={this.state.phpbox}>
                <i className="fas fa-database"></i>
              </div>
              <div className="curriSchcerletex">빅데이터</div>
            </div>

            {/* React 박스 */}
            <div className="curriSchnavbox" onClick={this.ReactBox.bind(this)}>
              <div className={this.state.Reactbox}>
                <i className="fas fa-cloud"></i>
              </div>
              <div className="curriSchcerletex">클라우드</div>
            </div>

            {/* JAVA 박스 */}
            <div className="curriSchnavbox" onClick={this.JavaBox.bind(this)}>
              <div className={this.state.Java}>
                <i className="fas fa-brain"></i>
              </div>
              <div className="curriSchcerletex">인공지능</div>
            </div>
          </div>
        </div>
        <div id="curriSchnav2">
          {/* 달력 출력  */}
          <Calender
            calender={this.state.calender}
            bigdata={this.state.bigdata}
            cloud={this.state.cloud}
            ai={this.state.ai}
            num={this.state.num}
          ></Calender>

          {/* 일정 출력 */}
          <CurriculumList
            currilist={this.state.currilist}
            // 필터링
            bigdatacard={this.state.bigdatacard}
            cardcloud={this.state.cardcloud}
            cardai={this.state.cardai}
            // 모달
            CardModalOn={this.CardModalOn.bind(this)}
            CardModalOff={this.CardModalOff.bind(this)}
            CardModal={this.state.CardModal}
          ></CurriculumList>
        </div>
      </div>
    );
  }
}
export default CurriculumSchedule;
