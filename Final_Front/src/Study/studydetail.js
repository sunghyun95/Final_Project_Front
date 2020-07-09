import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Slider,
  Modal,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import queryStirng from "query-string";
import Swal from "sweetalert2";
import studyimg from "./study.jpg";
import { tr } from "date-fns/locale";
import { Link } from "react-router-dom";
// const CssTextField = withStyles({
//   root: {
//     "& label.Mui-focused": {
//       color: "green",
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "green",
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "green",
//       },
//       "&:hover fieldset": {
//         borderColor: "green",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "green",
//       },
//     },
//   },
// })(TextField);
const { kakao } = window;

var { map } = window;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    marginLeft: 360,
  },
}));

const cardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 40 + rand();
  const left = 40 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const modalStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const marks = [
  {
    value: 0,
    label: "하",
  },
  {
    value: 50,
    label: "중",
  },
  {
    value: 100,
    label: "상",
  },
];

function valuetext() {
  return marks.label;
}

export default function StudyDetail(props) {
  const classes = useStyles();
  const cardClasses = cardStyles();
  const modalClasses = modalStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [studyapply_mylevel, setStudyApplyMyLevel] = React.useState(0);
  const [studyapply_comment, setStudyApplyComment] = React.useState("");
  const [studydata, setStudyData] = React.useState([]);
  const { search } = props.location;
  const queryObj = queryStirng.parse(search);
  const { study_num, count_peoples, study_peoples } = queryObj;
  const [studyaddress, setStudyAddress] = React.useState("");
  const [studylevel, setStudyLevel] = React.useState(0);
  const [writer, setWriter] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLevelChange = (event, newValue) => {
    setStudyApplyMyLevel(newValue);
  };
  const handleCommentChange = (event) => {
    setStudyApplyComment(event.target.value);
    console.log(`comment:${studyapply_comment}`);
  };
  const getStudyData = (event) => {
    const url =
      "http://localhost:8000/project/study/detail?study_num=" + study_num;
    Axios.get(url)
      .then((res) => {
        setStudyData(res.data.studydata);
        setStudyAddress(res.data.studydata.study_address.substring(7));
        setStudyLevel(
          res.data.studydata.study_level === "하" ||
            res.data.studydata.study_level === 0
            ? 0
            : res.data.studydata.study_level === "중" ||
              res.data.studydata.study_level === 50
              ? 50
              : res.data.studydata.study_level === "상" ||
                res.data.studydata.study_level === 100
                ? 100
                : 0
        );
        if (res.data.study_writer_num == localStorage.num)
          document.getElementById("updatebutton").style.visibility = "block";
        else
          document.getElementById("updatebutton").style.visibility = "hidden";
        if (res.data.study_writer_num == localStorage.num)
          document.getElementById("deletebutton").style.visibility = "block";
        else
          document.getElementById("deletebutton").style.visibility = "hidden";
        if (res.data.study_writer_num == localStorage.num)
          document.getElementById("aplicationbutton").style.visibility =
            "hidden";
        else
          document.getElementById("aplicationbutton").style.visibility =
            "block";
        if (count_peoples == study_peoples)
          document.getElementById("aplicationbutton").style.visibility =
            "hidden";
        else
          document.getElementById("aplicationbutton").style.visibility =
            "block";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:8000/project/studyapply/add";

    Axios.post(url, {
      studyapply_member_num: localStorage.num,
      studyapply_study_num: study_num,
      studyapply_mylevel: studyapply_mylevel,
      studyapply_comment: studyapply_comment,
    })
      .then((res) => {
        Swal.fire({
          position: "middle-middle",
          icon: "success",
          title: "스터디 신청 성공!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getApplyState = (event) => {
    const url = `http://localhost:8000/project/studyapply/state?studyapply_member_num=${localStorage.num}&studyapply_study_num=${study_num}`;

    Axios.get(url)
      .then((res) => {
        if (res.data == 1) {
          document.getElementById("aplicationbutton").innerHTML = "승인대기";
          document
            .getElementById("aplicationbutton")
            .setAttribute("disabled", "true");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getGroupState = (event) => {
    const url = `http://localhost:8000/project/studygroup/state?studygroup_member_num=${localStorage.num}&studygroup_study_num=${study_num}`;

    Axios.get(url)
      .then((res) => {
        if (res.data == 1) {
          document.getElementById("aplicationbutton").style.visibility =
            "hidden";
          document.getElementById("aplicationbutton").style.visibility =
            "block";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteStudy = (study_num) => {
    const url = `http://localhost:8000/project/study/delete?study_num=${study_num}`;

    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 하시려면 삭제 버튼을 눌러주세요",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.value) {
        Axios.delete(url)
          .then((res) => {
            window.location.href = "/studylist";
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("삭제 성공!", "정상적으로 삭제되었습니다", "success").then(
          (result) => {
            if (result.value) {
              window.location.href = "/studylist";
            }
          }
        );
      }
    });
  };

  const post = () => {
    const container = document.getElementById("map");
    var geocoder = new kakao.maps.services.Geocoder();

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);
    console.log(geocoder == null);
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(studyaddress, function (result, status) {
      console.log(kakao.maps.services.Status);
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:6px 0;">모임장소</div>',
        });
        infowindow.open(map, marker);
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
        document.getElementById("map").style.visibility = "visible";
      }
    });
  };

  useEffect(() => {
    getStudyData();
  }, []);

  useEffect(() => {
    getApplyState();
    getGroupState();
    post();
  }, [getStudyData]);

  useEffect(() => {
    studyapply_mylevel === 0 || studyapply_mylevel === "하"
      ? setStudyApplyMyLevel("하")
      : studyapply_mylevel === 50 || studyapply_mylevel === "중"
        ? setStudyApplyMyLevel("중")
        : studyapply_mylevel === 100 || studyapply_mylevel === "상"
          ? setStudyApplyMyLevel("상")
          : setStudyApplyMyLevel("하");
    console.log(`level:${studyapply_mylevel}`);
  }, [studyapply_mylevel]);

  const modal = (
    <div style={modalStyle} className={modalClasses.paper}>
      <div style={{ width: "80%", marginLeft: "10%" }}>
        <h2 id="simple-modal-title">내가 생각하는 숙련도</h2>
        <form onSubmit={onSubmit}>
          <Slider
            value={studyapply_mylevel}
            onChange={handleLevelChange}
            aria-labelledby="discrete-slider-restrict"
            getAriaValueText={valuetext}
            valueLabelDisplay="off"
            step={null}
            marks={marks}
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-static"
            label="comment"
            required
            multiline
            rows={5}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleCommentChange}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "65%" }}
            type="submit"
          >
            스터디 신청
          </Button>
        </form>
      </div>
    </div>
  );
  const backimage = {
    width: "100%",
    height: "500px",
    backgroundImage: `url(${studyimg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const tableStyle = {
    textAlign: "center",
    fontSize: "15px",
    width: "320px",
    border: "0px",
    borderCollapse: "collapse",
    borderTop: "1px solid #D5D5D5",
    marginTop: 20,
  };
  const tableStyle1 = {
    textAlign: "left",
    fontSize: "20px",
    width: "750px",
    border: "0px",
    borderCollapse: "collapse",
    borderTop: "0px solid #D5D5D5",
    marginTop: 20,
  };
  const trStyle = {
    borderBottom: "1px solid #D5D5D5",
    height: "40px",
  };
  const buttonStyle = {
    fontSize: "16px",
    backgroundColor: "#2253B8",
    color: "white",
    width: "100px",
    height: "40px",
    cursor: "pointer",
    border: "0px",
    outline: "none",
  };
  const buttonStyle1 = {
    fontSize: "16px",
    backgroundColor: "#2253B8",
    width: "200px",
    color: "white",
    height: "40px",
    cursor: "pointer",
    border: "0px",
    outline: "none",
  };
  return (
    <div style={{ textAlign: "center", backgroundColor: "#F6F6F6" }}>
      <div style={{ paddingTop: "115px" }}></div>
      <div style={backimage}>
        <span style={{ fontSize: "70px", color: "white" }}>
          IT Campus Study
        </span>
        <br />
        <span style={{ fontSize: "18px", color: "white" }}>
          IT Campus Study
        </span>
      </div>
      <div style={{ paddingTop: "80px" }}></div>
      <div style={{ display: "inline-block" }}>
        {/* 스터디 디테일 */}
        <div
          style={{
            border: "0px solid gray",
            width: 800,
            height: "auto",
            float: "left",
            backgroundColor: "white",
          }}
        >
          <img
            alt=""
            src={
              "http://localhost:8000/project/uploadfile/" +
              studydata.study_mainimage
            }
            style={{
              width: "inherit",
              height: "400px",
            }}
          />
          <table style={tableStyle1} align="center">
            <tbody>
              <tr style={trStyle}>
                <td style={{ fontSize: "30px", paddingBottom: "20px" }}>
                  [{studydata.study_type}]&nbsp;{studydata.study_subject}
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                  소개
                  <br />
                  <br />
                  <span style={{ fontSize: "18px" }}>
                    {studydata.study_intr}
                  </span>
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                  목표
                  <br />
                  <br />
                  <span style={{ fontSize: "18px" }}>
                    {studydata.study_goal}
                  </span>
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                  진행 방식
                  <br />
                  <br />
                  <span style={{ fontSize: "18px" }}>
                    {studydata.study_progress}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingTop: "80px" }}></div>
        </div>
        <div
          style={{ border: "1px solid #F6F6F6", width: 30, float: "left" }}
        ></div>
        {/* 모집정보 */}
        <div
          style={{
            border: "0px",
            width: 400,
            height: 650,
            float: "left",
            backgroundColor: "white",
          }}
        >
          <table style={tableStyle} align="center">
            <caption
              style={{
                textAlign: "left",
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              <b>모집정보</b>
            </caption>
            <tbody>
              <tr style={trStyle}>
                <td style={{ width: 80, borderRight: "1px solid #D5D5D5" }}>
                  개설자
                </td>
                <td style={{ width: 200 }}>{studydata.study_writer}</td>
              </tr>
              <tr style={trStyle}>
                <td style={{ borderRight: "1px solid #D5D5D5" }}>분류</td>
                <td>
                  <b>{studydata.study_type}</b>
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ borderRight: "1px solid #D5D5D5" }}>난이도</td>
                <td>
                  <Slider
                    value={studylevel}
                    aria-labelledby="discrete-slider"
                    getAriaValueText={valuetext}
                    valueLabelDisplay="off"
                    step={null}
                    marks={marks}
                    disabled
                    style={{ width: 120 }}
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ borderRight: "1px solid #D5D5D5" }}>인원</td>
                <td>{count_peoples + " / " + study_peoples}</td>
              </tr>
              <tr style={trStyle}>
                <td style={{ borderRight: "1px solid #D5D5D5" }}>요일</td>
                <td>{studydata.study_gatherday}</td>
              </tr>

              <tr style={trStyle}>
                <td style={{ borderRight: "1px solid #D5D5D5" }}>기간</td>
                <td>
                  {studydata.study_startdate + " ~ " + studydata.study_enddate}
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ borderRight: "1px solid #D5D5D5" }}>장소</td>
                <td>
                  {studyaddress}
                  <br />
                  {studydata.study_detailaddr}
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingTop: "20px" }}></div>
          <div
            style={{
              width: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div id="map" style={{ width: "320px", height: "200px" }}></div>
          </div>
          <div style={{ paddingTop: "20px" }}></div>
          {/* 목록, 신청버튼 */}
          <Link to="/studylist">
            <button type="button" style={buttonStyle}>
              목록
            </button>
          </Link>
          &nbsp;&nbsp;
          {localStorage.num != studydata.study_member_num && localStorage.type != "매니저"
            && localStorage.type != "강사" && (
              <button type="button" style={buttonStyle1} onClick={handleOpen}>
                신청하기
              </button>
            )}
          {localStorage.num == studydata.study_member_num && (
            <Link to={`/updatestudy?study_num=${study_num}`}>
              <button type="button" style={buttonStyle}>
                수정
              </button>
            </Link>
          )}
          &nbsp;&nbsp;
          {localStorage.num == studydata.study_member_num && (
            <button
              type="button"
              style={buttonStyle}
              onClick={() => {
                deleteStudy(studydata.study_num);
              }}
            >
              삭제
            </button>
          )}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {modal}
        </Modal>
      </div>
      <div style={{ paddingTop: "100px" }}></div>
    </div>
  );
}
