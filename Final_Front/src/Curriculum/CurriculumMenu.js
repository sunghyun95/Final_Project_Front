import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CurriculumMenu.scss";

class CurriculumMenu extends Component {
  render() {
    return (
      <div id="curriMenu">
        <div className="sidmenunav">
          {/* 수강 일정 */}
          <div id="curriMenunav">
            <div id="curriMenunavsub">수강일정</div>
            <a id="curriMenunavmain" onClick={this.props.calenderOn}>
              <i className="far fa-calendar-check"></i>
            </a>
          </div>

          {/* 수강 목록 */}
          <div id="curriMenunav2">
            <div id="curriMenunav2sub">수강목록</div>
            <a id="curriMenunav2main" onClick={this.props.CurrilistOn}>
              <i className="fas fa-clipboard-list"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default CurriculumMenu;
