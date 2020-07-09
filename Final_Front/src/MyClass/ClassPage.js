import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import MyclassSid from "./myclasssid";
import "./ClassPage.scss";

class ClassPage extends Component {
  // 삼가 성현이에 마지막 뜻에 따라 원형을 유지 합니다.
  constructor(props) {
    super(props);

    this.state = {
      process_num: 0,
      subject: "",
      teachername: "",
      manager: "",
      startdate: "",
      enddate: "",
    };
  }

  openClassNote = (e) => {
    e.preventDefault();
    window.open("/classnote", "", "width=600,height=600");
  };

  openClassNote2 = (e) => {
    e.preventDefault();
    window.open("/classnote2", "", "width=500,height=500");
  };

  getClass = () => {
    let url =
      "http://localhost:8000/project/processclass/classpage?member_num=" +
      localStorage.num;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        this.setState({
          process_num: res.data.process_num,
          subject: res.data.process_subject,
          teachername: res.data.process_teachername,
          manager: res.data.process_writer,
          startdate: res.data.process_startdate,
          enddate: res.data.process_enddate,
        });
      })
      .catch((err) => {
        console.log("강의실 불러오기 에러 : " + err);
      });
  };

  componentWillMount() {
    this.getClass();
  }

  render() {
    return (
      // 삼가 성현이에 마지막 뜻에 따라 원형을 유지 합니다.
      <div id="classpage">
        <MyclassSid
          process_num={this.state.process_num}
          openClassNote={this.openClassNote.bind(this)}
        ></MyclassSid>
        <div id="classpageback">
          <div id="classpageimgbox">
            <img src={require("../ClassData/note.jpg")} id="classpageimg"></img>
          </div>
          <div id="classpagebacknav"></div>
          {/* 텍스트 박스 */}
          <div id="classpagebacknav2">
            <div id="classdatatit">Lecture Room</div>
            <div id="classdatasub">Note for study</div>
          </div>

          <div id="classpagebacknav3">
            {/* 카드 박스  */}
            <div id="classpagetextbox">
              <div className="classpagesubbox">제목 : {this.state.subject}</div>
              <div id="classdatasubbox" className="classpagesubbox">
                <div>강사 : {this.state.subject}</div>
                <div>메니저 : {this.state.manager}</div>
              </div>
              <div className="classpagesubbox">
                기간 : {this.state.startdate} ~{this.state.enddate}
              </div>
            </div>
            <div id="classdatalinkbox">
              <div id="classdatalink">
                <NavLink
                  exact
                  to={"/classdata/" + this.state.process_num}
                  id="classdatalinkON"
                >
                  강의자료실 >>>
                </NavLink>
              </div>
            </div>
          </div>
          {/* 안쓰는 부분  */}
          {/* <div id="classpagebox">
            <div>{this.state.subject} 제목</div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>
                      <div>강사 : </div>
                    </th>
                    <td>
                      <div>{this.state.subject}임제묵</div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <div>메니져 : </div>
                    </th>
                    <td>
                      <div>{this.state.manager}김성현</div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <div>과정기간 : </div>
                    </th>
                    <td>
                      <div>
                        {this.state.startdate} 2020.10.20 ~ 2020.11.22
                        {this.state.enddate}
                      </div>
                      <NavLink
                        exact
                        to={"/classdata/" + this.state.process_num}
                      >
                        <button>강의자료실</button>
                      </NavLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
          {/* 끝 */}
        </div>
      </div>
    );
  }
}
export default ClassPage;
