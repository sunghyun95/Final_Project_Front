import React, { Component, useState } from "react";
import "./calender.scss";
import Modal from "react-modal";
import axios from "axios";

//  참고 사이트 :
// https://velog.io/@zynkn/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%BA%98%EB%A6%B0%EB%8D%94

let today = new Date(),
  month = today.getMonth() + 1,
  year = today.getFullYear(),
  days = ["일", "월", "화", "수", "목", "금", "토"];

// 메인
class calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: today.toLocaleDateString(),
      thisYear: year,
      thisMonth: month,
      thisDates: [],
      processFiles: [],
      list: [],
      processType: [],
      ptype: [],
    };
  }

  componentWillMount() {
    this.list();
  }
  list = () => {
    let url = "http://localhost:8000/project/process/list";
    axios
      .post(url)
      .then((res) => {
        this.setState({
          list: res.data,
        });
        for (var i = 0; i < this.state.list.length; i++) {
          console.log("process type=" + this.state.list[i].process_type);
          if (this.state.list[i].process_type === "빅데이터") {
            this.state.processType.push("bigdata");
          } else if (this.state.list[i].process_type === "클라우드") {
            this.state.processType.push("cloud");
          } else {
            this.state.processType.push("ai");
          }
          console.log(this.state.processType[i]);
        }
        console.log(this.state.processType);
        this.setState({
          ptype: this.state.processType,
        });
        console.log(this.state.ptype);
      })
      .catch((err) => {
        console.log("수강 과정 목록 불러오기 에러 : " + err);
      });
  };
  but = () => {
    console.log(this.state.list);
  };

  componentDidMount() {
    this._get_month();
  }

  componentDidUpdate() {
    //Update 될 때, .today, .click을 다시 찾아주지 않으면 기존에 있던 자리에 그대로 남아있게 된다.
    this._find_today();
    this._click_date();
  }
  render() {
    return (
      <div id={this.props.calender}>
        {/* 년 월 및 버튼 */}
        <header id="calenderhd">
          <button className="calenderhdbtn" onClick={this._prev_month}>
            &lt;
          </button>
          <button className="calenderhdtit" onClick={this._back_today}>
            {this.state.thisYear}년 {this.state.thisMonth}월
          </button>
          <button className="calenderhdbtn" onClick={this._next_month}>
            &gt;
          </button>
        </header>

        {/* 날짜 출력 */}
        <section>
          {/* 요일 출력 */}
          <div className="calenderdaybox">
            {days.map((value, i) => {
              return (
                <div className="caldaybox">
                  <span className="calday" key={i}>
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 날짜 출력 */}
          <div className="calenderdaynumbox">
            {this.state.thisDates.map((value, i) => {
              return (
                <div className={"daybox num" + value.date}>
                  <span
                    className={
                      value.include
                        ? "dates include " +
                          "calenderNum" +
                          new Date(
                            this.state.thisYear,
                            value.month - 1,
                            value.date
                          ).getDay()
                        : "dates others"
                    }
                    onClick={this._click_date}
                    data-fulldate={value.fulldate}
                    data-month={value.month}
                    key={i}
                  >
                    {/* {value.date === 1 ? value.month + "월 " : ""} */}
                    <div>{value.date}</div>
                    {/* <div>{value.fulldate.replace(/0/gi, "")}</div> */}
                    {this.state.list.map((row, idx) => {
                      // console.log(
                      //   "1:" +
                      //     row.process_startdate
                      //       .replace(/-/gi, ".")
                      //       .replace(/0/gi, "")
                      // );
                      // console.log(
                      //   "2:" +
                      //     value.fulldate
                      //       .replace(/0/gi, "")
                      //       .replace(/(\s*)/g, "")
                      // );
                      //인공지능
                      //블록체인
                      //빅데이터
                      if (
                        row.process_startdate
                          .replace(/-/gi, ".")
                          .replace(/0/gi, "") +
                          "." ===
                        value.fulldate.replace(/0/gi, "").replace(/(\s*)/g, "")
                      ) {
                        if (this.state.ptype[idx] === "bigdata") {
                          return (
                            <div className={this.props.bigdata}>
                              Start {row.process_subject}
                            </div>
                          );
                        } else if (this.state.ptype[idx] === "cloud") {
                          return (
                            <div className={this.props.cloud}>
                              Start {row.process_subject}
                            </div>
                          );
                        } else if (this.state.ptype[idx] === "ai") {
                          return (
                            <div className={this.props.ai}>
                              Start {row.process_subject}
                            </div>
                          );
                        }
                        // return (
                        //   <div className={this.state.ptype[idx]}>
                        //     Start {row.process_subject}
                        //   </div>
                        // );
                      } else if (
                        row.process_enddate
                          .replace(/-/gi, ".")
                          .replace(/0/gi, "") +
                          "." ===
                        value.fulldate.replace(/0/gi, "").replace(/(\s*)/g, "")
                      ) {
                        if (this.state.ptype[idx] === "bigdata") {
                          return (
                            <div className={this.props.bigdata}>
                              End {row.process_subject}
                            </div>
                          );
                        } else if (this.state.ptype[idx] === "cloud") {
                          return (
                            <div className={this.props.cloud}>
                              End {row.process_subject}
                            </div>
                          );
                        } else if (this.state.ptype[idx] === "ai") {
                          return (
                            <div className={this.props.ai}>
                              End {row.process_subject}
                            </div>
                          );
                        }
                        // return (
                        //   <div className={this.state.ptype[idx]}>
                        //     End {row.process_subject}
                        //   </div>
                        // );
                      }
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
        {/* <div>
          오늘은 {this.state.now} 입니다.
        </div> */}
      </div>
    );
  }

  _get_month = () => {
    const first = new Date(year, month - 1, 1),
      last = new Date(year, month, 0),
      dates = [],
      first_day = first.getDay(),
      last_day = last.getDay();
    for (var be = first_day; be > 0; be--) {
      //첫째 주 이전 달 부분
      const be_newDate = new Date(year, month - 1, 1 - be),
        be_month = be_newDate.getMonth() + 1,
        be_date = be_newDate.getDate(),
        be_fulldate = be_newDate.toLocaleDateString();
      dates.push({ month: be_month, date: be_date, fulldate: be_fulldate });
    }
    for (var i = 1; i <= last.getDate(); i++) {
      // 이번달 부분
      const this_newDate = new Date(year, month - 1, i),
        this_month = this_newDate.getMonth() + 1,
        this_date = this_newDate.getDate(),
        this_fulldate = this_newDate.toLocaleDateString();
      dates.push({
        month: this_month,
        date: this_date,
        fulldate: this_fulldate,
        include: true,
      });
    }
    for (var af = 1; af < 7 - last_day; af++) {
      // 마지막 주 다음달 부분
      const af_newDate = new Date(year, month, af),
        af_month = af_newDate.getMonth() + 1,
        af_date = af_newDate.getDate(),
        af_fulldate = af_newDate.toLocaleDateString();
      dates.push({ month: af_month, date: af_date, fulldate: af_fulldate });
    }
    this.setState({
      thisYear: year,
      thisMonth: month,
      thisDates: dates,
    });
  };

  _prev_month = () => {
    today = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    month = today.getMonth() + 1;
    year = today.getFullYear();
    this._get_month();
  };

  _next_month = () => {
    today = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    month = today.getMonth() + 1;
    year = today.getFullYear();
    this._get_month();
  };

  _back_today = () => {
    today = new Date();
    month = today.getMonth() + 1;
    year = today.getFullYear();
    this._get_month();
  };

  _find_today = () => {
    const getToday = new Date().toLocaleDateString(),
      list = document.querySelectorAll(".dates");
    for (var i = 1; i < list.length; i++) {
      list[i].classList.remove("today");
      if (list[i].dataset.fulldate === getToday) {
        list[i].classList.add("today");
      }
    }
  };

  _click_date = (e) => {
    const list = document.querySelectorAll(".dates");
    for (var i = 1; i < list.length; i++) {
      list[i].classList.remove("click");
    }
    if (e) {
      e.target.classList.add("click");
      // console.log("선택한 날짜는 " + e.target.dataset.fulldate + " 입니다.");
    }
  };
}

export default calender;
