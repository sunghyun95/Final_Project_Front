import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./CurriculumList.scss";

// 마테리얼 아바타
import { Avatar } from "@material-ui/core";

// 모달
import Modal from "react-modal";

let today = new Date(),
  month = today.getMonth() + 1,
  year = today.getFullYear();

class CurriculumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      now: today.toLocaleDateString(),
      thisYear: year,
      thisMonth: month,
      thisDates: [],
      processFiles: [],
    };
  }

  // constructor({ match }) {
  //   super();
  // }
  img = () => {
    let url =
      "http://localhost:8000/project/process/detail?process_num=" +
      this.process_num;
    axios
      .post(url)
      .then((res) => {
        this.setState({
          processFiles: res.data.processfiles,
        });
      })
      .catch((err) => {
        console.log("수강 메인 이미지 출력 오류 : " + err);
      });
  };

  componentWillMount() {
    let url = "http://localhost:8000/project/process/list";
    axios
      .post(url)
      .then((res) => {
        this.setState({
          list: res.data,
        });
      })
      .catch((err) => {
        console.log("수강 과정 목록 불러오기 에러 : " + err);
      });

    this.img();
  }

  render() {
    const imageUrl = "http://localhost:8000/project/uploadfile/";
    return (
      <div id={this.props.currilist}>
        <Modal></Modal>
        {localStorage.type === "매니저" && (
          <div id="currilistbtnbox">
            <a href="/CurriculumAdd" id="currilistbtn">
              <div id="currilisticon">
                <i className="fas fa-plus"></i>
              </div>
              <div>추가</div>
            </a>
          </div>
        )}


        {/* 카드  */}
        {/* 제목, 분류, 시작날짜 , 끝날짜, 인원수 , 담당 강사, 대표이미지,제공 교제  */}
        <div id="currilistcardbox">
          <div id="currilistcardback">
            {this.state.list.map((row, index) => {
              if (row.process_type === "빅데이터") {
                return (
                  <div className="curricard" id={this.props.bigdatacard}>
                    {/* 헤드 부분 */}
                    <div className="curricardhd">
                      <div className="curricarthdtit">모집중(1/2)</div>
                      <div className="curricarthdsub">{row.process_type}</div>
                    </div>

                    {/* 몸통 부분 */}
                    <div className="curricardmain">
                      <div className="curricardmainimgbox">
                        {this.state.processFiles.map((row) => (
                          <img
                            src={imageUrl + row.process_num}
                            className="curricardmainimg"
                          ></img>
                        ))}
                      </div>
                      <div className="curricardmainback"></div>
                      <a
                        className="curricardmaintext"
                        href={"/CurriculumDetail/" + row.process_num}
                      >
                        <div className="studylistcardAvatar">
                          <Avatar style={{ width: "80px", height: "80px" }} />
                        </div>
                        <div className="curricardmainnav">
                          {row.process_subject}
                        </div>
                      </a>
                    </div>

                    {/* 바닥 */}
                    <div className="currifooter">
                      <div>
                        {row.process_startdate}&nbsp;~&nbsp;
                        {row.process_enddate}
                      </div>
                    </div>
                  </div>
                );
              } else if (row.process_type === "클라우드") {
                return (
                  <div className="curricard" id={this.props.cardcloud}>
                    {/* 헤드 부분 */}
                    <div className="curricardhd">
                      <div className="curricarthdtit">모집중(1/2)</div>
                      <div className="curricarthdsub">{row.process_type}</div>
                    </div>

                    {/* 몸통 부분 */}
                    <div className="curricardmain">
                      <div className="curricardmainimgbox">
                        {this.state.processFiles.map((row) => (
                          <img
                            src={imageUrl + row.process_num}
                            className="curricardmainimg"
                          ></img>
                        ))}
                      </div>
                      <div className="curricardmainback"></div>
                      <a
                        className="curricardmaintext"
                        href={"/CurriculumDetail/" + row.process_num}
                      >
                        <div className="studylistcardAvatar">
                          <Avatar style={{ width: "80px", height: "80px" }} />
                        </div>
                        <div className="curricardmainnav">
                          {row.process_subject}
                        </div>
                      </a>
                    </div>

                    {/* 바닥 */}
                    <div className="currifooter">
                      <div>
                        {row.process_startdate}&nbsp;~&nbsp;
                        {row.process_enddate}
                      </div>
                    </div>
                  </div>
                );
              } else if (row.process_type === "인공지능") {
                return (
                  <div className="curricard" id={this.props.cardai}>
                    {/* 헤드 부분 */}
                    <div className="curricardhd">
                      <div className="curricarthdtit">모집중</div>
                      <div className="curricarthdsub">{row.process_type}</div>
                    </div>

                    {/* 몸통 부분 */}
                    <div className="curricardmain">
                      <div className="curricardmainimgbox">
                        {this.state.processFiles.map((row) => (
                          <img
                            src={imageUrl + row.process_num}
                            className="curricardmainimg"
                          ></img>
                        ))}
                      </div>
                      <div className="curricardmainback"></div>
                      <a
                        className="curricardmaintext"
                        href={"/CurriculumDetail/" + row.process_num}
                      >
                        <div className="studylistcardAvatar">
                          <Avatar style={{ width: "80px", height: "80px" }} />
                        </div>
                        <div className="curricardmainnav">
                          {row.process_subject}
                        </div>
                      </a>
                    </div>

                    {/* 바닥 */}
                    <div className="currifooter">
                      <div>
                        {row.process_startdate}&nbsp;~&nbsp;
                        {row.process_enddate}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {/* {this.state.list.map((row, index) => (
              
            ))} */}
          </div>
        </div>

        {/* <TableContainer component={Paper}>
          <Table aria-label="simple table" id="dafdsfadfadsf">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">분류</TableCell>
                <TableCell align="right">과정명</TableCell>
                <TableCell align="right">과정 기간</TableCell>
                <TableCell align="right">담당 강사님</TableCell>
                <TableCell align="right">담당 매니져</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.list.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.process_num}
                  </TableCell>
                  <TableCell align="right">{row.process_type}</TableCell>
                  <TableCell align="right">{row.process_subject}</TableCell>
                  <TableCell align="right">
                    {row.process_startdate}&nbsp;~&nbsp;{row.process_enddate}
                  </TableCell>
                  <TableCell align="center">
                    {row.process_teachername}
                  </TableCell>
                  <TableCell align="center">{row.process_writer}</TableCell>
                  <TableCell align="center">{row.process_writeday}</TableCell>
                  <TableCell>
                    <NavLink exact to={"/CurriculumDetail/" + row.process_num}>
                      <Button>자세히 보기</Button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
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

export default CurriculumList;
