import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { history } from "react-dom";
import ClassNote from "../ClassNote/classnote";

import ClassData from "../ClassData/classdata";
import WriteData from "../ClassData/writedata";
import DataDetail from "../ClassData/datadetail";
import UpdateData from "../ClassData/updatedata";

import StudyList from "../Study/studylist";
import AddStudy from "../Study/addstudy";
import StudyDetail from "../Study/studydetail";
import UpdateStudy from "../Study/updatestudy";
import MyStudy from "../MyPage/mystudymain";
import MyStudyTeam from "../MyPage/mystudyteam";

import Schedule from "../Schedule/schedule";

import MyClass from "../MyClass/myclass";

import Menu from "./menu";
import MainInfo from "./maininfo";
import Introduce from "./introduce";
import Curriculum from "./curriculum";
import MyPageUpdate from "../MyPage/mypageupdate";
import SignUpManage from "../Manager/signupmanage";
import SignUp from "../NonMember/signup";
import MemberList_Form from "../Admin/memberlist_form";
import Graph from "../Admin/graph";
import ClassManage from "../Teacher/classmanage";

import Notice_List from "../Notice/notice_list";
import Notice_Add from "../Notice/notice_add";
import Notice_Detail from "../Notice/notice_detail";
import Notice_Update from "../Notice/notice_update";

import AcademyIntro from "../Introduce/AcademyIntro";
import AcademyFacility from "../Introduce/AcademyFacility";
import AcademyMap from "../Introduce/AcademyMap";
import AcademyLink from "../Introduce/AcademyLink";

import CurriculumList from "../Curriculum/CurriculumList";
import CurriculumDetail from "../Curriculum/CurriculumDetail";
import CurriculumUpdate from "../Curriculum/CurriculumUpdate";
import CurriculumAdd from "../Curriculum/CurriculumAdd";
import CurriculumSchedule from "../Curriculum/CurriculumSchedule";

import ClassPage from "../MyClass/ClassPage";
import MyNote from "../MyClass/MyNote";

import qna_list from "../QnA/qna_list";
import qna_add from "../QnA/qna_add";
import qna_detail from "../QnA/qna_detail";
import qna_update from "../QnA/qna_update";
import qna_answer from "../QnA/qna_answer";
import AddReview from "../Review/AddReview";
import ReviewList from "../Review/ReviewList";
import UpdateReview from "../Review/UpdateReview";
import DeleteReview from "../Review/DeleteReview";
import AlertList from "../MyClass/AlertList";
import AlertAdd from "../MyClass/AlertAdd";
import MyProcessList from "../Manager/MyProcessList";
import AlertUpdate from "../MyClass/AlertUpdate";

import mypagelist from "../MyPage/mypagelist";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme();

class main extends Component {
  constructor({ history }, props) {
    super(props);
    this.history = history;
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/menu" component={Menu} />
          <Menu history={this.history} />
          {/* 홈으로 */}
          <Route exact path="/" component={MainInfo} />
          {/* 메인 관련 메뉴 */}
          <Route path="/introduce" component={Introduce} />
          <Route path="/curriculum" component={Curriculum} />
          {/* 강의노트 */}
          <Route path="/classnote" component={ClassNote} />
          {/* 수업자료 */}
          <Route path="/classdata/:process_num" component={ClassData} />
          {/*스터디 */}
          <Route path="/studylist" component={StudyList} />
          {/* 스케줄 */}
          <Route path="/schedule" component={Schedule} />
          {/* 내 학습공간 */}
          <Route path="/myclass" component={MyClass} />
          {/* 수업자료 관련 기능 */}
          <Route path="/writedata/:process_num" component={WriteData} />
          <Route path="/datadetail/:process_num" component={DataDetail} />
          <Route path="/updatedata/:process_num" component={UpdateData} />

          {/* 스터디 관련 기능 */}
          <Route path="/addstudy" component={AddStudy} />
          <Route path="/studydetail" component={StudyDetail} />
          <Route path="/updatestudy" component={UpdateStudy} />
          <Route path="/mystudymain" component={MyStudy} />
          <Route path="/mystudyteam" component={MyStudyTeam} />

          {/* 마이 페이지 관련 기능 */}
          <Route path="/mypagelist" component={mypagelist} />
          <Route path="/mypageupdate" component={MyPageUpdate} />
          <Route path="/signupmanage" component={SignUpManage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/memberlist" component={MemberList_Form} />
          <Route path="/graph" component={Graph} />
          <Route path="/classmanage" component={ClassManage} />
          <Route path="/MyProcessList" component={MyProcessList} />

          {/* 공지사항 관련 기능 */}
          <Route path="/noticelist" component={Notice_List} />
          <Route path="/noticeadd" component={Notice_Add} />
          <Route path="/noticedetail" component={Notice_Detail} />
          <Route path="/noticeupdate" component={Notice_Update} />

          {/* QnA */}
          <Route path="/qnalist" component={qna_list} />
          <Route path="/qnaadd" component={qna_add} />
          <Route path="/qnadetail" component={qna_detail} />
          <Route path="/qnaupdate" component={qna_update} />
          <Route path="/qnaanswer" component={qna_answer} />

          {/* 학원소개 관련 기능 */}
          <Route path="/academyintro" component={AcademyIntro} />
          <Route path="/academyfacility" component={AcademyFacility} />
          <Route path="/academymap" component={AcademyMap} />
          <Route path="/academylink" component={AcademyLink} />

          {/* 수강과정 관련 기능 */}
          <ThemeProvider theme={theme}>
            <Route path="/AlertUpdate/:memo_num" component={AlertUpdate} />
            <Route path="/AlertAdd/:process_num" component={AlertAdd} />
            <Route path="/AlertList/:process_num" component={AlertList} />
            <Route path="/curriculumlist" component={CurriculumList} />
            <Route
              path="/CurriculumDetail/:process_num"
              component={CurriculumDetail}
            />
            <Route path="/CurriculumAdd" component={CurriculumAdd} />
            <Route
              path="/CurriculumUpdate/:process_num"
              component={CurriculumUpdate}
            />
            <Route
              path="/curriculumschedule/:list_num"
              component={CurriculumSchedule}
            />
          </ThemeProvider>

          {/* 강사,수강생 전용 학습 페이지 */}
          <Route path="/classpage" component={ClassPage} />
          <Route path="/mynote" component={MyNote} />

          {/* 리뷰 관련 기능 */}
          <Route path="/addreview" component={AddReview} />
          <Route path="/reviewlist" component={ReviewList} />
          <Route path="/updatereview" component={UpdateReview} />
          <Route path="/deletereview" component={DeleteReview} />
        </BrowserRouter>
      </div>
    );
  }
}
export default main;
