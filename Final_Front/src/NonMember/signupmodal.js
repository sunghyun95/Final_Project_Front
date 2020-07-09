import React, { Component } from "react";
import "./signupmodal.css";

// 마테리얼 import
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class signupmodal extends Component {
  modaldata = () => {
    this.props.modaldata(false);
  };
  render() {
    const Mystudy = styled(Button)({
      color: "rgb(34, 83, 184)",
      borderColor: "rgb(34, 83, 184)",
      fontWeight: "bold",
    });
    return (
      <div id="signupmodal-back">
        <form id="signupmodal-back2">
          <div id="signupmodalbox2">
            <div id="signupmodaltit">상세 정보</div>
            <div id="signupmodallabel">추가 상세 정보 확인 가능합니다.</div>
          </div>

          <div className="signupmodalbox">
            <div className="signupmodal-th">이름</div>
            <div>임제묵</div>
          </div>
          <div className="signupmodalbox">
            <div className="signupmodal-th">과정명</div>
            <div>Spring Java 개발자 양성과정</div>
          </div>
          <div className="signupmodalbox">
            <div className="signupmodal-th">전화번호</div>
            <div>010-7307-1716</div>
          </div>
          <div className="signupmodalbox">
            <div className="signupmodal-th">이메일</div>
            <div>dlawpanr@naver.com</div>
          </div>
          <div className="signupmodalbox">
            <div className="signupmodal-th">주소</div>
            <div>서울특별시 관악구</div>
          </div>
          <div className="signupmodalbox">
            <div className="signupmodal-th">상세주소</div>
            <div>신림동 572-1 제스퍼 101호</div>
          </div>
          <div>
            <Mystudy
              variant="outlined"
              className="signupmodalbtn"
              id="signupmodalbtn"
            >
              승인
            </Mystudy>
            <Mystudy variant="outlined" className="signupmodalbtn">
              거절
            </Mystudy>
          </div>
          <div>
            <i
              className="fas fa-times-circle"
              onClick={this.modaldata.bind(this)}
              id="signupclose"
            ></i>
          </div>
        </form>
      </div>
    );
  }
}

export default signupmodal;
