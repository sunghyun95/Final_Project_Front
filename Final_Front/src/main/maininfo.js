import React, { Component } from "react";
import "./maininfo.scss";
import MainPart1 from "../MainAdd/mainpart1";
import MianPart2 from "../MainAdd/mainpart2";
import MainPart3 from "../MainAdd/mainpart3";
import axios from "axios";

class maininfo extends Component {
  constructor() {
    super();

    this.state = {
      startpage: 0,
      endpage: 5,
      searchtxt: "java",
      saraminlist: [],
      saraminhiresubject: [],
      saraminhirehref: [],
      saramincorphref: [],
      saramincorpname: [],
      samrainenddates: [],
      hiresubject: [],
      hirehref: [],
      corpname: [],
      corphref: [],
      enddates: [],

      show: 1,
      num: "nonedown",
      num2: "nonedown",
      num3: "nonedown",
      num4: "nonedown",

      // part1 에 사용하는  슬라이드 변수
      part1: "part1con", //타이틀 사라지는 변수
      part1back: "part1con4After", //백그라운드 변수
      part1slide: "hid", //전체 슬라이드 변수
      part1PHP: "hid", //PHP 슬라이드 변수
      part1React: "hid", //React 슬라이드 변수
      Part1Java: "hid", //Java 슬라이드 변수

      //part1 에 버튼 색상 변경 변수
      part1Alltag: "part1tagimg ",
      part1PHPtag: "part1tagimg ",
      part1Reacttag: "part1tagimg ",
      part1Javatag: "part1tagimg ",

      // 검은화면 닫기 버튼
      black: "hid",
    };
  }

  //con4 x 버튼
  Con4X = () => {
    this.setState({
      //박스들
      part1: "part1con",
      part1back: "part1con4After",
      part1slide: "hid",
      part1PHP: "hid",
      part1React: "hid",
      Part1Java: "hid",
      black: "hid",
      // 버튼
      part1Alltag: "part1tagimg",
      part1PHPtag: "part1tagimg",
      part1Reacttag: "part1tagimg",
      part1Javatag: "part1tagimg",
    });
  };

  //All 클릭시 힘스
  AllClick = () => {
    this.setState({
      part1: "part1conAfter",
      part1back: "part1con4",
      part1slide: "part1con3",
      part1PHP: "hid",
      part1React: "hid",
      Part1Java: "hid",
      black: "part1con4x",
      // 버튼
      part1Alltag: "part1tagimgafter",
      part1PHPtag: "part1tagimg",
      part1Reacttag: "part1tagimg",
      part1Javatag: "part1tagimg",
    });
  };

  //React 클릭시 함수
  ReactClick = () => {
    this.setState({
      part1: "part1conAfter",
      part1back: "part1con4",
      part1slide: "hid",
      part1PHP: "hid",
      part1React: "part1con3",
      Part1Java: "hid",
      black: "part1con4x",
      // 버튼
      part1Alltag: "part1tagimg",
      part1PHPtag: "part1tagimg",
      part1Reacttag: " part1tagimgafter",
      part1Javatag: "part1tagimg",
    });
  };

  //PHP 클릭시 함수
  PHPClick = () => {
    this.setState({
      // 박스들
      part1: "part1conAfter",
      part1back: "part1con4",
      part1slide: "hid",
      part1PHP: "part1con3",
      part1React: "hid",
      Part1Java: "hid",
      black: "part1con4x",
      // 버튼
      part1Alltag: "part1tagimg",
      part1PHPtag: " part1tagimgafter",
      part1Reacttag: "part1tagimg",
      part1Javatag: "part1tagimg",
    });
  };

  //Java 클릭시 함수
  JavaClick = () => {
    this.setState({
      //박스들
      part1: "part1conAfter",
      part1back: "part1con4",
      part1slide: "hid",
      part1PHP: "hid",
      part1React: "hid",
      Part1Java: "part1con3",
      black: "part1con4x",
      // 버튼
      part1Alltag: "part1tagimg",
      part1PHPtag: "part1tagimg",
      part1Reacttag: "part1tagimg",
      part1Javatag: " part1tagimgafter",
    });
  };

  //화면 내려가는 함수
  DownHandle = () => {
    // console.log(this.state.show);
    if (this.state.show === 1) {
      this.setState({
        show: 2,
        num: "none",
        num2: "nonedown",
        num3: "none",
        num4: "none",

        // part1 에 사용하는  슬라이드 변수
        part1: "part1con", //타이틀 사라지는 변수
        part1back: "part1con4After", //백그라운드 변수
        part1slide: "hid", //전체 슬라이드 변수
        part1PHP: "hid", //PHP 슬라이드 변수
        part1React: "hid", //React 슬라이드 변수
        Part1Java: "hid", //Java 슬라이드 변수
        black: "hid",
        //part1 에 버튼 색상 변경 변수
        part1Alltag: "part1tagimg ",
        part1PHPtag: "part1tagimg ",
        part1Reacttag: "part1tagimg ",
        part1Javatag: "part1tagimg ",
      });
    } else if (this.state.show === 2) {
      this.setState({
        show: 3,
        num: "none",
        num2: "none",
        num3: "nonedown",
        num4: "none",
      });
    } else if (this.state.show === 3) {
      this.setState({
        show: 4,
        num: "none",
        num2: "none",
        num3: "none",
        num4: "nonedown",
      });
    } else if (this.state.show === 4) {
      this.setState({
        show: 1,
        num: "nonefinal4",
        num2: "nonefinal3",
        num3: "nonefinal2",
        num4: "nonefinal",
      });
    }
  };

  // 화면 올라가는 함수
  UpHandle = () => {
    // console.log(this.state.show);
    if (this.state.show === 1) {
      this.setState({
        show: 4,
        num: "nonefirst2",
        num2: "nonefirst3",
        num3: "nonefirst4",
        num4: "nonefirst",

        // part1 에 사용하는  슬라이드 변수
        part1: "part1con", //타이틀 사라지는 변수
        part1back: "part1con4After", //백그라운드 변수
        part1slide: "hid", //전체 슬라이드 변수
        part1PHP: "hid", //PHP 슬라이드 변수
        part1React: "hid", //React 슬라이드 변수
        Part1Java: "hid", //Java 슬라이드 변수
        black: "hid",
        //part1 에 버튼 색상 변경 변수
        part1Alltag: "part1tagimg ",
        part1PHPtag: "part1tagimg ",
        part1Reacttag: "part1tagimg ",
        part1Javatag: "part1tagimg ",
      });
    } else if (this.state.show === 2) {
      this.setState({
        show: 1,
        num: "noneUp",
        num2: "nonefirst",
        num3: "nonefirst",
        num4: "nonefirst",
      });
    } else if (this.state.show === 3) {
      this.setState({
        show: 2,
        num: "none",
        num2: "noneUp",
        num3: "nonefirst",
        num4: "nonefirst",
      });
    } else if (this.state.show === 4) {
      this.setState({
        show: 3,
        num: "none",
        num2: "none",
        num3: "noneUp",
        num4: "nonefirst",
      });
    }
  };

  selectChange = (e) => {
    this.setState({
      [e.target.name]: "",
    });
    this.changeSearchText(e.target.value);
    this.GetHireList();
  };

  changeSearchText = (item) => {
    this.setState({
      searchtxt: item,
    });
    console.log(this.state.searchtxt);
  };
  GetHireList = () => {
    let url =
      "http://localhost:8000/project/process/hirelist?searchtxt=" +
      this.state.searchtxt;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          saraminhiresubject: res.data.hiresubject,

          saraminhirehref: res.data.hirehref,
          saramincorphref: res.data.corphref,
          saramincorpname: res.data.corpname,
          saraminenddates: res.data.enddates,
        });
        this.HireListWithPage();
        console.log(this.state.saramincorpname);
      })
      .catch((err) => {
        console.log("채용 공고 목록 불러오기 에러 :" + err);
      });
  };

  HireListWithPage = () => {
    let hiresubject = [];
    let hirehref = [];
    let corpname = [];
    let corphref = [];
    let enddates = [];
    for (let i = this.state.startpage; i < this.state.endpage; i++) {
      hiresubject.push(this.state.saraminhiresubject[i]);
      hirehref.push(this.state.saraminhirehref[i]);
      corpname.push(this.state.saramincorpname[i]);
      corphref.push(this.state.saramincorphref[i]);
      enddates.push(this.state.saraminenddates[i]);
    }

    this.setState({
      hiresubject: hiresubject,
      hirehref: hirehref,
      corpname: corpname,
      corphref: corphref,
      enddates: enddates,
    });
  };
  changePage = (item) => {
    console.log(item);
    if (item === "next") {
      if (this.state.endpage === 40) {
        this.setState({
          startpage: 0,
          endpage: 5,
        });
        this.HireListWithPage();
      } else {
        this.setState({
          startpage: this.state.startpage + 5,
          endpage: this.state.endpage + 5,
        });
        this.HireListWithPage();
      }
    } else {
      if (this.state.startpage === 0) {
        this.setState({
          startpage: 35,
          endpage: 40,
        });
        this.HireListWithPage();
      } else {
        this.setState({
          startpage: this.state.startpage - 5,
          endpage: this.state.endpage - 5,
        });
        this.HireListWithPage();
      }
    }
  };
  componentWillMount = () => {
    this.GetHireList();
  };

  render() {
    return (
      <div>
        {/* 첫번째 화면  */}
        <div id="main-con" className={this.state.num}>
          <MainPart1
            // 박스 변수
            part1={this.state.part1}
            part1back={this.state.part1back}
            part1slide={this.state.part1slide}
            part1PHP={this.state.part1PHP}
            part1React={this.state.part1React}
            Part1Java={this.state.Part1Java}
            black={this.state.black}
            // 버튼 변수
            part1Alltag={this.state.part1Alltag}
            part1PHPtag={this.state.part1PHPtag}
            part1Reacttag={this.state.part1Reacttag}
            part1Javatag={this.state.part1Javatag}
            //이벤트 함수
            AllClick={this.AllClick.bind(this)}
            PHPClick={this.PHPClick.bind(this)}
            ReactClick={this.ReactClick.bind(this)}
            JavaClick={this.JavaClick.bind(this)}
            Con4X={this.Con4X.bind(this)}
          ></MainPart1>
        </div>
        {/* 두번째 화면  */}
        <div id="main-con2" className={this.state.num2}>
          <MianPart2 show={this.state.show}></MianPart2>
        </div>
        {/* 세번째 화면  */}
        <div id="main-con3" className={this.state.num3}>
          <MainPart3></MainPart3>
        </div>
        {/* 네번째 화면  */}
        <div id="main-con4" className={this.state.num4}>
          {/* 투명막 */}
          <div id="maincon4back"></div>

          {/* 타이틀 박스  */}
          <div id="maincon4text">
            <div id="maincon4tit">Job Storage</div>
            <div className="maincon4sub">
              취업은 "내가 얼마나 알고 있는가?" 보다는 "내가 얼마나 전달할 수
              있는가?"가 더 중요합니다.
            </div>
            <div className="maincon4sub">
              취업동향 및 트랜드를 파악하고 당신만의 취업전략을 찾도록
              도와드리겠습니다.
            </div>
          </div>

          {/* 카드 출력 박스  */}
          <div id="maincon4cardbox">
            {/* 버튼 부분 */}
            <div id="maincon4nav">
              <div>
                <select
                  value={this.state.searchtxt}
                  onChange={this.selectChange.bind(this)}
                  name="searchtxt"
                  id="maincon4sel"
                >
                  <option>java</option>
                  <option>spring</option>
                  <option>react</option>
                </select>
              </div>
              <div
                onClick={this.changePage.bind(this, "prev")}
                id="maincon4arr"
              >
                <i className="fas fa-angle-left"></i>
              </div>
              <div
                onClick={this.changePage.bind(this, "next")}
                id="maincon4arr2"
              >
                <i className="fas fa-angle-right"></i>
              </div>
              {/* 버튼 부분 끝 */}
            </div>

            {/* 출력 테이블  */}
            <table id="maincon4tab">
              <thead>
                <tr id="maincon4tabtr">
                  <th>제목</th>
                  <th>마감일</th>
                  <th>업체</th>
                </tr>
              </thead>
              <tbody>
                {this.state.hiresubject.map((item, index) => (
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <a
                        href={this.state.hirehref[index]}
                        alt=""
                        key={index}
                        style={{ paddingLeft: "80px", color: "white" }}
                      >
                        {item}
                      </a>
                    </td>
                    <td>{this.state.enddates[index]}</td>
                    <td>
                      <a
                        href={this.state.corphref[index]}
                        alt=""
                        key={index}
                        style={{ color: "white" }}
                      >
                        {this.state.corpname[index]}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 화면 이동 화살표 박스  */}
        <div id="mainiffoarrowbox">
          {/* 올라가는 화살표  */}
          <div className="mainiffoarrow" onClick={this.UpHandle.bind(this)}>
            <i className="fas fa-chevron-up"></i>
          </div>

          {/* 내려가는 화살표 */}
          <div className="mainiffoarrow" onClick={this.DownHandle.bind(this)}>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
    );
  }
}
export default maininfo;
