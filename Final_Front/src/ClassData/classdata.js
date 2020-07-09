import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import MyclassSid from "../MyClass/myclasssid";
import "./classdata.scss";

class classdata extends Component {
  constructor({ match }) {
    super();

    this.process_num = match.params.process_num;
    this.state = {
      classdatalist: [],
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

  list = () => {
    let url =
      "http://localhost:8000/project/classdata/classdatalist?process_num=" +
      this.process_num;
    console.log(this.process_num);
    axios
      .get(url)
      .then((res) => {
        this.setState({
          classdatalist: res.data,
        });
      })
      .catch((err) => {
        console.log("목록 출력 에러:" + err);
      });
  };
  componentWillMount() {
    this.list();
    this.getClass();
  }
  render() {
    return (
      <div id="classdata">
        <MyclassSid openClassNote={this.openClassNote.bind(this)}></MyclassSid>
        <div id="classdataback">
          {/* 헤더 부분 */}
          <div id="classdatanav">
            {/* 이미지 박스  */}
            <div id="classdataimgbox">
              <img src={require("./note.jpg")} id="classdataimg"></img>
            </div>
            {/* 검은 배경  */}
            <div id="classdataimgback"></div>

            {/* 텍스트 박스 */}
            <div id="classdatatextbox">
              <div id="classdatatit">Lecture Room</div>
              <div id="classdatasub">Note for study</div>
            </div>
          </div>

          <div id="classdatanav2">
            <div>제목 : {this.state.subject}</div>
            <div id="classdatasubbox">
              <div>강사 : {this.state.subject}</div>
              <div>메니저 : {this.state.manager}</div>
            </div>
            <div>
              기간 : {this.state.startdate} ~{this.state.enddate}
            </div>
          </div>

          {/* 버튼 박스  */}
          <div id="classdatanav3">
            <NavLink
              exact
              to={"/writedata/" + this.process_num}
              id="classdatabtn"
            >
              <span style={{ marginRight: "10px" }}>
                <i className="fas fa-plus"></i>
              </span>{" "}
              자료 작성
            </NavLink>
          </div>

          {/* 테이블 박스 */}
          <div id="classdatanav4">
            <table id="classdatatab">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>번호</th>
                  <th style={{ width: "50%" }}>제목</th>
                  <th style={{ width: "20%" }}>작성자</th>
                  <th style={{ width: "20%" }}>작성일</th>
                </tr>
              </thead>
              <tbody>
                {this.state.classdatalist.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: "center" }}>{idx + 1}</td>
                    <td style={{ padding: "0 10%" }}>
                      <Link
                        to={{
                          pathname: "/datadetail/" + this.process_num,
                          state: {
                            num: item.classdata_num,
                          },
                        }}
                        style={{ color: "black" }}
                      >
                        {item.classdata_subject}
                      </Link>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.classdata_writer}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.classdata_writeday}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* classdataback 종료 부분 */}
        </div>
      </div>
    );
  }
}
export default classdata;
