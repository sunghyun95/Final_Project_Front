import React, { Component } from "react";
import "./mainpart3.scss";
import { tr } from "date-fns/locale";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

// 마테리얼 아바타
import { Avatar } from "@material-ui/core";
import Axios from "axios";
import { Link } from "react-router-dom";

class mainpart3 extends Component {
  state = {
    page: true,
    box: "part3slid",
    box2: "part3slidch2",
    listdata: [],
    profilelist: [],
    countlist: [],
  };

  slidbox = () => {
    this.setState({
      page: false,
      box: "part3slid",
      box2: "part3slidch2",
    });
  };

  slidbox2 = () => {
    this.setState({
      page: true,
      box: "part3slidch",
      box2: "part3slid2",
    });
  };

  list = () => {
    const url = "http://localhost:8000/project/study/list";
    Axios.post(url)
      .then((res) => {
        this.setState({
          listdata: res.data.listdata,
          profilelist: res.data.profilelist,
          countlist: res.data.countlist,
        });
        console.log(res.data.listdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.list();
  }

  render() {
    return (
      <div id="part3back">
        <div id="part3backimgbox">
          <img src={require("../image/study.jpg")} id="part3backimg"></img>
        </div>
        <div id="part3back2"></div>
        <div id="part3box">
          <div id="part3textbox">
            <div id="part3texttit">
              IT Campus Study
              <span id="part3texttitspan">
                <i className="fas fa-pencil-alt"></i>
              </span>
            </div>
            <div className="part3textlabel">
              "인간다움"을 존중하는 소통과 공감을 소중하게 생각합니다.
            </div>
            <div className="part3textlabel">취업에 휴머니즘을 덥다.</div>
          </div>
          <div id="part3slidbox">
            <div id="part3slidbtnbox">
              <button
                className="part3slidbtn"
                onClick={this.slidbox.bind(this)}
              ></button>
              <button
                className="part3slidbtn"
                onClick={this.slidbox2.bind(this)}
              ></button>
            </div>
            <div id="part3slidtext">
              {/* 첫번째 박스 */}
              <div id={this.state.box} className="part3slidch">
                {this.state.listdata.slice(0, 4).map((item, idx) => (
                  <div className="curricard">
                    {/* 헤드 부분 */}
                    <div className="curricardhd">
                      <div className="curricarthdtit">
                        {this.state.countlist[idx] !== item.study_peoples
                          ? `모집중(${this.state.countlist[idx]}/${item.study_peoples})`
                          : "모집완료"}
                      </div>
                      <div className="curricarthdsub">
                        {(
                          item.study_address[7] +
                          item.study_address[8] +
                          item.study_address[9] +
                          item.study_address[10] +
                          item.study_address[11]
                        ).split(" ")[0] +
                          " | " +
                          item.study_type}
                      </div>
                    </div>

                    {/* 몸통 부분 */}
                    <div className="curricardmain">
                      <div className="curricardmainimgbox">
                        <img
                          alt=""
                          src={
                            "http://localhost:8000/project/uploadfile/" +
                            item.study_mainimage
                          }
                          className="curricardimg"
                        />
                      </div>
                      <div id="mainpart3cardeye">
                        <VisibilityOutlinedIcon />
                        <div style={{ marginLeft: "3px", marginBottom: "2px" }}>
                          조회수
                        </div>
                      </div>
                      <div className="curricardmainback"></div>
                      <Link
                        className="curricardmaintext"
                        to={
                          "/studydetail?study_num=" +
                          item.study_num +
                          "&count_peoples=" +
                          this.state.countlist[idx] +
                          "&study_peoples=" +
                          item.study_peoples
                        }
                      >
                        <div className="studylistcardAvatar">
                          <Avatar
                            style={{ width: "80px", height: "80px" }}
                            src={
                              "http://localhost:8000/project/uploadfile/" +
                              this.state.profilelist[idx]
                            }
                          />
                        </div>
                        <div className="curricardmainnav">
                          {item.study_subject}
                        </div>
                      </Link>
                    </div>

                    {/* 바닥 */}
                    <div className="currifooter">
                      <div>
                        {item.study_startdate.split("-")[1] +
                          "월 " +
                          item.study_startdate.split("-")[2] +
                          "일"}
                        &nbsp;~&nbsp;
                        {item.study_enddate.split("-")[1] +
                          "월 " +
                          item.study_enddate.split("-")[2] +
                          "일"}
                      </div>
                      <div>{"매주 " + item.study_gatherday}</div>
                    </div>
                  </div>
                ))}
              </div>
              <ul id={this.state.box2}>
                {this.state.listdata.slice(4, 8).map((item, idx) => (
                  <li>
                    <div className="curricard">
                      {/* 헤드 부분 */}
                      <div className="curricardhd">
                        <div className="curricarthdtit">
                          {this.state.countlist[idx] !== item.study_peoples
                            ? `모집중(${this.state.countlist[idx]}/${item.study_peoples})`
                            : "모집완료"}
                        </div>
                        <div className="curricarthdsub">
                          {(
                            item.study_address[7] +
                            item.study_address[8] +
                            item.study_address[9] +
                            item.study_address[10] +
                            item.study_address[11]
                          ).split(" ")[0] +
                            " | " +
                            item.study_type}
                        </div>
                      </div>

                      {/* 몸통 부분 */}
                      <div className="curricardmain">
                        <div className="curricardmainimgbox">
                          <img
                            alt=""
                            src={
                              "http://localhost:8000/project/uploadfile/" +
                              item.study_mainimage
                            }
                            className="curricardimg"
                          />
                        </div>
                        <div id="mainpart3cardeye">
                          <VisibilityOutlinedIcon />
                          <div
                            style={{ marginLeft: "3px", marginBottom: "2px" }}
                          >
                            조회수
                          </div>
                        </div>
                        <div className="curricardmainback"></div>
                        <Link
                          className="curricardmaintext"
                          to={
                            "/studydetail?study_num=" +
                            item.study_num +
                            "&count_peoples=" +
                            this.state.countlist[idx] +
                            "&study_peoples=" +
                            item.study_peoples
                          }
                        >
                          <div className="studylistcardAvatar">
                            <Avatar
                              style={{ width: "80px", height: "80px" }}
                              src={
                                "http://localhost:8000/project/uploadfile/" +
                                this.state.profilelist[idx]
                              }
                            />
                          </div>
                          <div className="curricardmainnav">
                            {item.study_subject}
                          </div>
                        </Link>
                      </div>

                      {/* 바닥 */}
                      <div className="currifooter">
                        <div>
                          {item.study_startdate.split("-")[1] +
                            "월 " +
                            item.study_startdate.split("-")[2] +
                            "일"}
                          &nbsp;~&nbsp;
                          {item.study_enddate.split("-")[1] +
                            "월 " +
                            item.study_enddate.split("-")[2] +
                            "일"}
                        </div>
                        <div>{"매주 " + item.study_gatherday}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {/* 두번째 박스 */}
              {/* <ul id={this.state.box2}>
                <li>
                  <div className="part3slidli">
                    <div className="part3slidboxin">
                      <img
                        src={require("../image/core.jpg")}
                        className="part3slidimg"
                      ></img>
                    </div>
                    <div className="part3slidboxin">
                      <div className="part3intit">김성현의 강남역 모임</div>
                      <div className="part3insub">
                        시작날짜: 2020-06-22 ~ 끝날짜: 2020-07-1
                      </div>
                      <div className="partinlabel">
                        김성현의 팝업아티스트의 모든것
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="part3slidli">
                    <div className="part3slidboxin">
                      <img
                        src={require("../image/core.jpg")}
                        className="part3slidimg"
                      ></img>
                    </div>
                    <div className="part3slidboxin">
                      <div className="part3intit">김성현의 강남역 모임</div>
                      <div className="part3insub">
                        시작날짜: 2020-06-22 ~ 끝날짜: 2020-07-1
                      </div>
                      <div className="partinlabel">
                        김성현의 팝업아티스트의 모든것
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="part3slidli">
                    <div className="part3slidboxin">
                      <img
                        src={require("../image/core.jpg")}
                        className="part3slidimg"
                      ></img>
                    </div>
                    <div className="part3slidboxin">
                      <div className="part3intit">김성현의 강남역 모임</div>
                      <div className="part3insub">
                        시작날짜: 2020-06-22 ~ 끝날짜: 2020-07-1
                      </div>
                      <div className="partinlabel">
                        김성현의 팝업아티스트의 모든것
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="part3slidlilast">
                    <div className="part3slidboxin">
                      <img
                        src={require("../image/core.jpg")}
                        className="part3slidimg"
                      ></img>
                    </div>
                    <div className="part3slidboxin">
                      <div className="part3intit">김성현의 강남역 모임</div>
                      <div className="part3insub">
                        시작날짜: 2020-06-22 ~ 끝날짜: 2020-07-1
                      </div>
                      <div className="partinlabel">
                        코딩으로 세계 정복할 파티원 구합니다.
                      </div>
                    </div>
                  </div>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default mainpart3;
