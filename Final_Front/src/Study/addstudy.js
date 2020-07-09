import React, { useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Button,
  makeStyles,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import "./addstudy.css";
import Axios from "axios";
import Swal from "sweetalert2";
import studyimg from "./study.jpg";
import { Link } from "react-router-dom";

const { kakao } = window;

var { map } = window;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& > *": {
      margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    display: "none",
  },
}));

const sliderStyles = makeStyles({
  root: {
    width: 200,
  },
});

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

function getFormatDate(date) {
  var year = date.getFullYear(); // yyyy
  var month = 1 + date.getMonth(); // M
  month = month >= 10 ? month : "0" + month; // month 두자리로 저장
  var day = date.getDate(); // d
  day = day >= 10 ? day : "0" + day; // day 두자리로 저장
  return year + "-" + month + "-" + day; // '-' 추가하여 yyyy-mm-dd 형태 생성
}

export default function AddStudy(props) {
  const post = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    map = new kakao.maps.Map(container, options);
    document.getElementById("map").style.visibility = "hidden";
    new window.daum.Postcode({
      oncomplete: function (data) {
        const zonecode = data.zonecode;
        const roadAddr = data.address;
        const str = "(" + zonecode + ")" + roadAddr;
        setStudyAddress(str);
        console.log(str);

        var geocoder = new kakao.maps.services.Geocoder();
        console.log(geocoder == null);
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(roadAddr, function (result, status) {
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
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;

    document.body.appendChild(script);
  });

  const [study_type, setStudyType] = React.useState("");
  const [study_subject, setStudySubject] = React.useState("");
  const [study_startdate, setStudyStartdate] = React.useState(
    getFormatDate(new Date())
  );
  const [study_enddate, setStudyEnddate] = React.useState(
    getFormatDate(new Date())
  );
  const [study_gatherday, setStudyGatherday] = React.useState(
    // [
    //   { gather: "Monday", stat: false },
    //   { gather: "Tuesday", stat: false },
    //   { gather: "Wednesday", stat: false },
    //   { gather: "Thursday", stat: false },
    //   { gather: "Friday", stat: false },
    //   { gather: "Saturday", stat: false },
    //   { gather: "Sunday", stat: false },
    // ]
    {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    }
  );
  const [study_gatherdayname, setStudyGatherdayName] = React.useState([]);
  const [study_peoples, setStudyPeoples] = React.useState(2);
  const [study_level, setStudyLevel] = React.useState("하");
  const [study_intr, setStudyIntr] = React.useState("");
  const [study_goal, setStudyGoal] = React.useState("");
  const [study_progress, setStudyProgress] = React.useState("");
  const [study_address, setStudyAddress] = React.useState("");
  const [study_detailaddr, setStudyDetailaddr] = React.useState("");
  const count = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  const [study_mainimage, setStudyMainImage] = React.useState("");
  const [file, setFile] = React.useState("");
  const [previewURL, setPreviewURL] = React.useState("");
  const [previewimg, setPreviewImg] = React.useState("");

  const countList = count.map((count, idx) => (
    <MenuItem value={count} key={idx}>
      {count}
    </MenuItem>
  ));

  const handleTypeChange = (event) => {
    setStudyType(event.target.value);
    console.log(`type:${study_type}`);
  };
  const handleSubjectChange = (event) => {
    setStudySubject(event.target.value);
    console.log(`subject:${study_subject}`);
  };
  const handleGatherdayChange = (event) => {
    setStudyGatherday({
      ...study_gatherday,
      [event.target.name]: event.target.checked,
    });
    // if (event.target.checked) {
    //   study_gatherdayname.push(event.target.value);
    // } else {
    //   study_gatherdayname.filter((gather) => gather !== event.target.value);
    // }
  };
  const handleStartDateChange = (date) => {
    if (new Date() > date) {
      Swal.fire({
        position: 'top-start',
        icon: 'warning',
        title: '현재 날짜보다 이전 날짜는 선택 불가능합니다',
        showConfirmButton: false,
        timer: 1500
      })
      return false;
    }
    if (study_enddate < date) {
      Swal.fire({
        position: 'top-start',
        icon: 'warning',
        title: '시작 날짜는 끝 날짜 이후를 선택 불가능합니다',
        showConfirmButton: false,
        timer: 1500
      })
      return false;
    }
    setStudyStartdate(getFormatDate(date));
  };
  const handleEndDateChange = (date) => {
    if (new Date() > date) {
      Swal.fire({
        position: 'top-start',
        icon: 'warning',
        title: '현재 날짜보다 이전 날짜는 선택 불가능합니다',
        showConfirmButton: false,
        timer: 1500
      })
      return false;
    }
    if (study_startdate > date) {
      Swal.fire({
        position: 'top-start',
        icon: 'warning',
        title: '시작 날짜보다 이전 날짜는 선택 불가능합니다',
        showConfirmButton: false,
        timer: 1500
      })
      return false;
    }
    setStudyEnddate(getFormatDate(date));
  };
  const handlePeoplesChange = (event) => {
    setStudyPeoples(event.target.value);
    console.log(`peoples:${study_peoples}`);
  };
  const handleLevelChange = (event, newValue) => {
    setStudyLevel(newValue);
  };
  const handleIntrChange = (event) => {
    setStudyIntr(event.target.value);
    console.log(`intr:${study_intr}`);
  };
  const handleGoalChange = (event) => {
    setStudyGoal(event.target.value);
    console.log(`goal:${study_goal}`);
  };
  const handleProgressChange = (event) => {
    setStudyProgress(event.target.value);
    console.log(`progress:${study_progress}`);
  };
  const handleAddressChange = (event) => {
    setStudyAddress(event.target.value);
    console.log(`addr:${study_address}`);
  };
  const handleDetailAddrChange = (event) => {
    setStudyDetailaddr(event.target.value);
    console.log(`detailaddr:${study_detailaddr}`);
  };
  const handleImageChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewURL(reader.result);
    };
    if (event.target.files[0]) reader.readAsDataURL(file);
    setStudyMainImage(file);
  };
  useEffect(() => {
    study_level === 0 || study_level === "하"
      ? setStudyLevel("하")
      : study_level === 50 || study_level === "중"
        ? setStudyLevel("중")
        : study_level === 100 || study_level === "상"
          ? setStudyLevel("상")
          : setStudyLevel("하");
    console.log(`level:${study_level}`);
  }, [study_level]);

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:8000/project/study/add";
    const formData = new FormData();

    if (study_mainimage !== "") {
      let Mon = "",
        Tue = "",
        Wed = "",
        Thu = "",
        Fri = "",
        Sat = "",
        Sun = "";

      if (study_gatherday.Monday === true) Mon = "월";
      if (study_gatherday.Tuesday === true) Tue = "화";
      if (study_gatherday.Wednesday === true) Wed = "수";
      if (study_gatherday.Thursday === true) Thu = "목";
      if (study_gatherday.Friday === true) Fri = "금";
      if (study_gatherday.Saturday === true) Sat = "토";
      if (study_gatherday.Sunday === true) Sun = "일";

      study_gatherdayname.push(Mon, Tue, Wed, Thu, Fri, Sat, Sun);

      console.log(study_level);

      setTimeout(() => {
        formData.append("study_type", study_type);
        formData.append("study_subject", study_subject);
        formData.append("study_member_num", localStorage.num);
        formData.append("study_startdate", study_startdate);
        formData.append("study_enddate", study_enddate);
        formData.append("study_gatherdayname", study_gatherdayname);
        formData.append("study_peoples", study_peoples);
        formData.append("study_level", study_level);
        formData.append("study_intr", study_intr);
        formData.append("study_goal", study_goal);
        formData.append("study_progress", study_progress);
        formData.append("study_address", study_address);
        formData.append("study_detailaddr", study_detailaddr);
        formData.append("uploadfile", study_mainimage);
        formData.append("study_writer", localStorage.name);
        formData.append("study_writer_num", localStorage.num);
        Axios({
          method: "post",
          url: url,
          // data: {
          //   study_type: study_type,
          //   study_subject: study_subject,
          //   study_startdate: study_startdate,
          //   study_enddate: study_enddate,
          //   study_gatherday: study_gatherday,
          //   study_peoples: study_peoples,
          //   study_level: study_level,
          //   study_intr: study_intr,
          //   study_goal: study_goal,
          //   study_progress: study_progress,
          //   study_address: study_address,
          //   study_detailaddr: study_detailaddr,
          // },
          // data: { formData: formData },
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            console.log(`데이터 추가:${res}`);
            Swal.fire({
              icon: "success",
              title: "성공!!",
              text: "스터디 등록이 성공적으로 처리되었습니다!",
            }).then((result) => {
              if (result.value) {
                window.location.href = "/studylist";
              }
            });

          })
          .catch((err) => {
            console.log(`데이터 추가 오류:${err}`);
          });
      }, 1000);
    }
  };

  const classes = useStyles();
  const sliderclasses = sliderStyles();

  useEffect(() => {
    setPreviewImg(<img alt="" src={previewURL} width="400"></img>);
  }, [previewURL]);
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
    fontSize: "16px",
    width: "1200px",
    border: "0px",
    borderCollapse: "collapse",
    borderTop: "1px solid black",
  };
  const trStyle = {
    borderBottom: "1px solid black",
    height: "60px",
  };
  const buttonStyle = {
    fontSize: "16px",
    backgroundColor: "white",
    width: "110px",
    height: "40px",
    borderRadius: "25px",
    cursor: "pointer",
    border: "1px solid gray",
    outline: "none",
  };
  return (
    <div style={{ textAlign: "center" }} aling="center">
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
      <div style={{ paddingTop: "100px" }}></div>
      <span style={{ fontSize: "40px" }}>스터디 개설</span>
      <br />
      <br />
      <span style={{ fontSize: "18px" }}>
        IT Campus의 스터디 모임을 개설 할 수 있습니다.
      </span>
      <div style={{ paddingTop: "100px" }}></div>
      <form onSubmit={onSubmit}>
        <table style={tableStyle} align="center">
          <tbody>
            <tr style={trStyle}>
              <td>작성자</td>
              <td style={{ textAlign: "left" }}>{localStorage.name}</td>
            </tr>
            <tr style={trStyle}>
              <td>분류</td>
              <td style={{ textAlign: "left" }}>
                <FormControl
                  className={(classes.root, classes.formControl)}
                  required
                >
                  <Select
                    labelId="type-select-required-label"
                    id="select-required"
                    value={study_type}
                    onChange={handleTypeChange}
                    className={classes.selectEmpty}
                    style={{
                      width: "200px",
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Java"}>Java</MenuItem>
                    <MenuItem value={"Spring"}>Spring</MenuItem>
                    <MenuItem value={"React"}>React</MenuItem>
                    <MenuItem value={"기타"}>기타</MenuItem>
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>인원</td>
              <td style={{ textAlign: "left" }}>
                <FormControl
                  className={(classes.root, classes.formControl)}
                  required
                >
                  <Select
                    labelId="peoples-select-required-label"
                    id="select-required"
                    value={study_peoples}
                    onChange={handlePeoplesChange}
                    className={classes.selectEmpty}
                    style={{ width: "200px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {countList}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>난이도</td>
              <td style={{ textAlign: "left" }}>
                <Slider
                  value={study_level}
                  onChange={handleLevelChange}
                  aria-labelledby="discrete-slider-restrict"
                  getAriaValueText={valuetext}
                  valueLabelDisplay="off"
                  step={null}
                  marks={marks}
                  style={{ width: "200px" }}
                />
              </td>
            </tr>
            <tr style={trStyle}>
              <td>시작 날짜</td>
              <td style={{ textAlign: "left" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    id="date-picker-inline"
                    value={study_startdate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>끝 날짜</td>
              <td style={{ textAlign: "left" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    id="date-picker-inline"
                    value={study_enddate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>요일</td>
              <td>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={study_gatherday.Monday}
                        onChange={handleGatherdayChange}
                        name="Monday"
                        color="primary"
                        value="월"
                      />
                    }
                    label="월요일"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={study_gatherday.Tuesday}
                        onChange={handleGatherdayChange}
                        name="Tuesday"
                        color="primary"
                        value="화"
                      />
                    }
                    label="화요일"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={study_gatherday.Wednesday}
                        onChange={handleGatherdayChange}
                        name="Wednesday"
                        color="primary"
                        value="수"
                      />
                    }
                    label="수요일"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={study_gatherday.Thursday}
                        onChange={handleGatherdayChange}
                        name="Thursday"
                        color="primary"
                        value="목"
                      />
                    }
                    label="목요일"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={study_gatherday.Friday}
                        onChange={handleGatherdayChange}
                        name="Friday"
                        color="primary"
                        value="금"
                      />
                    }
                    label="금요일"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={study_gatherday.Saturday}
                        onChange={handleGatherdayChange}
                        name="Saturday"
                        color="primary"
                        value="토"
                      />
                    }
                    label="토요일"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={study_gatherday.Sunday}
                        onChange={handleGatherdayChange}
                        name="Sunday"
                        color="primary"
                        value="일"
                      />
                    }
                    label="일요일"
                  />
                </FormGroup>
              </td>
            </tr>
            <tr style={trStyle}>
              <td style={{ width: 200 }}>제목</td>
              <td>
                <input
                  type="text"
                  value={study_subject}
                  onChange={handleSubjectChange}
                  style={{
                    width: 1000,
                    height: "40px",
                    textAlign: "left",
                    border: "0px",
                  }}
                />
              </td>
            </tr>
            <tr style={trStyle}>
              <td>소개</td>
              <td style={{ textAlign: "left" }}>
                <TextField
                  id="outlined-multiline-static"
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  style={{
                    width: "1000px",
                    border: "0px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  onChange={handleIntrChange}
                />
              </td>
            </tr>
            <tr style={trStyle}>
              <td>목표</td>
              <td>
                <input
                  type="text"
                  required
                  onChange={handleGoalChange}
                  style={{
                    width: "1000px",
                    height: "40px",
                    textAlign: "left",
                    border: "0px",
                  }}
                />
              </td>
            </tr>
            <tr style={trStyle}>
              <td>진행 방식</td>
              <td>
                <TextField
                  id="outlined-multiline-static"
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  style={{
                    width: "1000px",
                    border: "0px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  onChange={handleProgressChange}
                />
              </td>
            </tr>
            <tr style={trStyle}>
              <td>대표 이미지</td>
              <td style={{ textAlign: "left" }}>
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<PhotoCamera />}
                    style={{ marginTop: "10px", marginbottom: "10px" }}
                  >
                    대표 이미지
                  </Button>
                </label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  name="study_mainimage"
                  onChange={handleImageChange}
                />
                <br />
                <br />
                {previewimg}
              </td>
            </tr>
            <tr style={trStyle}>
              <td>장소</td>
              <td style={{ textAlign: "left" }}>
                <TextField
                  id="outlined-read-only-input"
                  className="detailaddr"
                  readOnly
                  label="기본 주소"
                  variant="outlined"
                  style={{
                    width: 600,
                    border: "0px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={study_address}
                  onChange={handleAddressChange}
                  required
                />
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="contained"
                  color="primary"
                  onClick={post}
                  style={{ marginTop: "20px", width: 80, height: 40 }}
                >
                  검색
                </Button>
                <br />
                <TextField
                  id="outlined-read-only-input"
                  label="상세 주소"
                  variant="outlined"
                  style={{ marginBottom: "10px", width: 700 }}
                  onChange={handleDetailAddrChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ paddingTop: "20px" }}></div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div id="map" style={{ width: 1200, height: 300 }}></div>
        </div>
        <div style={{ paddingTop: "20px" }}></div>
        <button type="submit" style={buttonStyle}>
          <i className="fas fa-plus"></i>&nbsp;&nbsp; 등록
        </button>
        &nbsp;&nbsp;
        <Link
          to="/studylist"
          style={{
            textDecoration: "none",
          }}
        >
          <button type="button" style={buttonStyle}>
            <i className="fas fa-bars"></i>&nbsp;&nbsp; 목록
          </button>
        </Link>
      </form>
      <div style={{ paddingTop: "100px" }}></div>
    </div>
  );
}
