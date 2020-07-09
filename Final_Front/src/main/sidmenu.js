import React, { Component } from "react";
import "./sidmenu.scss";

class sidmenu extends Component {
  render() {
    return (
      <div>
        <div id="sidmenu">
          {/* 기본 사이드 바 */}
          <div className="sidmenunav">
            {/* 학원 소개 */}
            <div id="lecturebox">
              <div id="lecturesub">학원소개</div>
              <a id="lecturemain" href="/academyintro">
                <i className="far fa-building"></i>
              </a>
            </div>

            {/* 공지사항 */}
            <div id="studybox">
              <div id="studysub">공지사항</div>
              <a href="/noticelist" id="studymain">
                <i className="fas fa-bullhorn"></i>
              </a>
            </div>

            {/* 수강과정 */}
            <div id="sidschedulebox">
              <div id="sidschedulesub">수강과정</div>
              <a href="/curriculumschedule/1" id="sidschedulemain">
                <i className="far fa-calendar-alt"></i>
              </a>
            </div>

            {/* 스터디 */}
            <div id="sidchartbox">
              <div className="sidsub" id="sidchartsub">
                스터디
              </div>
              <a id="sidchartmain" href="/studylist">
                <i className="fas fa-pencil-alt"></i>
              </a>
            </div>

            {/* 채용공고 or 리뷰 */}
            <div id="mypagebox">
              <div id="mypagesub">수강후기</div>
              <a href="/reviewlist" id="mypagemain">
                <i className="far fa-address-card"></i>
              </a>
            </div>
          </div>

          {/* 요까지  */}
        </div>
      </div>
    );
  }
}

export default sidmenu;
