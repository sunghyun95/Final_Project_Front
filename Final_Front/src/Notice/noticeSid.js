import React, { Component } from "react";
import "./noticeSid.scss";

class noticeSid extends Component {
  render() {
    return (
      <div id="noticSid">
        <div className="sidmenunav">
          {/* 공지사항 */}
          <div id="noticSidnav">
            <div id="noticSidnavsub">공지사항</div>
            <a id="noticSidnavmain" href="/noticelist">
              <i className="far fa-bell"></i>
            </a>
          </div>

          {/* Q&A*/}
          <div id="noticSidnav2">
            <div id="noticSidnav2sub"> QnA</div>
            <a id="noticSidnav2main" href="/qnalist">
              <i className="far fa-comments"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default noticeSid;
