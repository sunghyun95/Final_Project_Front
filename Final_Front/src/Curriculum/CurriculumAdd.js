import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./CurriculumAdd.scss";
import "./CurriculumSchedule.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function CurriculumAdd() {
  const classes = useStyles();
  const [process_subject, setProcess_subject] = React.useState(
    "과정명을 입력해주세요"
  );
  const [searchBook, setSearchBook] = React.useState("");
  const [process_teacher, setProcess_teacher] = React.useState("담당 강사님");

  const handleChange = (event) => {
    setProcess_subject(event.target.value);
  };
  const handleTeacherChange = (event) => {
    setProcess_teacher(event.target.value);
  };

  const onFocusSubject = (event) => {
    event.preventDefault();
    setProcess_subject("");
  };

  const [process_type, setProcess_type] = React.useState("인공지능");

  const selectChange = (event) => {
    setProcess_type(event.target.value);
    event.target.helperText = "";
  };

  const currencies = [
    {
      value: "빅데이터",
      label: "빅데이터",
    },
    {
      value: "클라우드",
      label: "클라우드",
    },
    {
      value: "인공지능",
      label: "인공지능",
    },
  ];

  const [process_startdate, setProcess_startdate] = React.useState(
    getFormatDate(new Date())
  );
  const [process_enddate, setProcess_enddate] = React.useState(
    getFormatDate(new Date())
  );

  const [startDateMonth, setStartDateMonth] = React.useState("");
  const handleStartDateChange = (date) => {
    setProcess_startdate(getFormatDate(date));

    if (date <= new Date()) {
      alert("현재보다 이전날짜는 설정할 수 없습니다");
      return false;
    }
  };
  const handleEndDateChange = (date) => {
    setProcess_enddate(getFormatDate(date));

    if (date <= new Date()) {
      alert("현재보다 이전날짜는 설정할 수 없습니다");
      return false;
    }

    if (date <= process_startdate) {
      alert("시작날짜보다 이전날짜는 설정할 수 없습니다");
      return false;
    }
  };

  const [process_peoples, setProcess_peoples] = React.useState("");

  const handleSelectChange = (event) => {
    setProcess_peoples(event.target.value);
  };

  const peoplesData = [
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
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ];

  const peoples = peoplesData.map((item, index) => {
    return <MenuItem value={item}>{item}</MenuItem>;
  });

  //   const teacherList = teacherLet.map((item) => {
  //     return <MenuItem>{item.member_name}</MenuItem>;
  //   });
  const [teacherList, setTeacerList] = React.useState([]);

  const teachers = teacherList.map((item) => {
    return <MenuItem value={item.member_num}>{item.member_name}</MenuItem>;
  });

  const [previewURL, setPreviewURL] = React.useState("");
  const [previewimg, setPreviewImg] = React.useState("");
  useEffect(() => {
    let url = "http://localhost:8000/project/process/searchTeacher";
    axios
      .get(url)
      .then((res) => {
        setTeacerList(res.data);
      })
      .catch((err) => {
        console.log("강사목록 불러오기 에러 :" + err);
      });

    setPreviewImg(<img alt="" src={previewURL} width="400"></img>);
  }, [previewURL]);

  const [books, setBooks] = React.useState([]);
  const [findBooks, setFindBooks] = React.useState([]);
  const [findData, setFindData] = React.useState([]);
  const [filesLength, setFilesLength] = React.useState(0);
  const bookListChange = (e) => {
    setSearchBook(e.target.value);
    let a = [];
    books.map((item) => {
      if (item.books_name.indexOf(e.target.value) >= 0) {
        console.log(item);
        a.push(item);
      }
    });
    setFindData(a);
  };

  const getBooksList = (e) => {
    e.preventDefault();
    let url = "http://localhost:8000/project/process/getBooksList";
    axios
      .get(url)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log("제공 교재 목록 불러오기 에러:" + err);
      });
  };

  useEffect(() => {
    setPreviewImg(<img alt="" src={previewURL} width="400"></img>);
  }, [previewURL]);

  const ProcessSubmit = (e) => {
    e.preventDefault();
    if (process_subject === "" || process_subject === "과정명을 입력해주세요") {
      Swal.fire({
        icon: "error",
        title: "실패!",
        text: "수강 과정명을 작성해주세요!",
      });
      return false;
    }
    if (process_intr === "") {
      Swal.fire({
        icon: "error",
        title: "실패!",
        text: "수강 과정 소개를 작성해주세요!",
      });
      return false;
    }
    if (process_peoples === "") {
      Swal.fire({
        icon: "error",
        title: "실패!",
        text: "수강 과정에 참여할 수강생 총 인원을 선택해주세요!",
      });
      return false;
    }
    if (process_teacher === "" || process_teacher === "담당 강사님") {
      Swal.fire({
        icon: "error",
        title: "실패!",
        text: "수강 과정 담당 강사님을 선택해주세요!",
      });
      return false;
    }

    const startdateArr = process_startdate.split("-");
    const enddateArr = process_enddate.split("-");

    let startdateStr = startdateArr[0] + startdateArr[1] + startdateArr[2];
    let enddateStr = enddateArr[0] + enddateArr[1] + enddateArr[2];

    if (startdateStr >= enddateStr) {
      Swal.fire({
        icon: "error",
        title: "실패!",
        text: "과정 끝날짜가 시작날짜보다 이전일 수 없습니다!",
      });
      return false;
    }

    let data = new FormData();
    data.append("process_type", process_type);
    data.append("process_subject", process_subject);
    data.append("process_intr", process_intr);
    data.append("process_peoples", process_peoples);
    data.append("process_startdate", process_startdate);
    data.append("process_enddate", process_enddate);
    data.append("process_teacher", process_teacher);
    data.append("process_writer", localStorage.name2);
    data.append("process_member_num", localStorage.num);
    for (let i = 0; i < uploadFiles.length; i++) {
      data.append("process_uploadfiles", uploadFiles[i]);
    }

    axios({
      method: "post",
      url: "http://localhost:8000/project/process/insert",
      data: data,
      header: { "Content-Type": "Multipart/Form-data" },
    })
      .then((res) => {
        bookTag.map((item, index) => {
          let bookdata = new FormData();
          bookdata.append("books_brand", item.books_brand);
          bookdata.append("books_name", item.books_name);
          bookdata.append("books_writer", item.books_writer);
          bookdata.append("books_process_num", res.data);
          let url2 = "http://localhost:8000/project/books/insert";
          axios
            .post(url2, bookdata)
            .then((res) => { })
            .catch((err) => {
              console.log("제공 교재 등록 에러 : " + err);
            });
        });
        Swal.fire({
          icon: "success",
          title: "성공!!",
          text: "수강 과정 등록이 성공적으로 처리되었습니다!",
        }).then((result) => {
          if (result.value) {
            window.location.href = "/curriculumschedule/2";
          }
        });

        redirectAfterInsert();
      })
      .catch((err) => {
        console.log("수강 과정 등록 에러 :" + err);
      });
  };

  const [process_intr, setProcess_intr] = React.useState("");

  const intrChange = (e) => {
    setProcess_intr(e.target.value);
  };

  const [bookTag, setBookTag] = React.useState([]);
  let s = [];
  const plusBook = (book, i) => {
    setBookTag(bookTag.concat(book));
  };

  let a = [];

  const deleteBooks = (book, i) => {
    bookTag.map((item, index) => {
      if (item.books_name !== book.books_name) {
        console.log("index:" + index);
        a.push(item);
      }
      setBookTag(a);
    });
  };
  const [uploadFiles, setUploadFiles] = React.useState([]);

  const [files, setFiles] = useState([]);

  const getFileMetadata = (file) => {
    /**
     * The way we are handling uploads does not allow us to
     * turn the uploaded [object File] into JSON.
     *
     * Therefore, we have to write our own "toJSON()" method.
     */
    return {
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
      webkitRelativePath: file.webkitRelativePath,
    };
  };

  const selectFiles = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setUploadFiles(files);
    const reader = new FileReader();

    let newstate = [];
    for (let i = 0; i < e.target.files.length; i++) {
      setFilesLength(i + 1);
      let file = e.target.files[i];
      let metadata = getFileMetadata(file);
      let url = URL.createObjectURL(file);
      newstate = [...newstate, { url, metadata }];
    }
    setFiles(newstate);

    // for (let i = 0; i < e.target.files.length; i++) {
    //   const reader = new FileReader();
    //   const files =[];
    //   files.push(e.target.files[i]);
    //   console.log("----------!");
    //   console.log(upload);

    //   reader.onloadend = () => {
    //     setPreviewURL(reader.result);
    //     reader.readAsDataURL(uploadFiles);
    //   };
    // }
  };

  const handleSave = () => {
    alert(`POST Files Here..\n\n ${JSON.stringify(files, null, 2)}`);
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
  };
  return (
    <div align="center">
      <div id="curriSchimgbox">
        <img src={require("../image/keyboard.jpg")} id="curriSchimg"></img>
        <div id="curriSchimgback"></div>
        <div id="curriSchimgtextbox">
          <div id="curriSchimgtitbox">
            <div>IT Campus CurriCulum</div>
            <div className="margin10">
              <i className="far fa-calendar-alt"></i>
            </div>
          </div>
          <div id="curriSchimgsubbox">
            <div id="marginbottom10">
              기업이 "신입" 에게 바라는 것은 "SW 개발의 기본을 출실히 알고
              있는가?"입니다.
            </div>
            <div>6개월이 지난 후 기업 실무현장에서의 당신은 "당당합니다."</div>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "100px" }}></div>
      <span style={{ fontSize: "40px" }}>수강 과정 등록</span>
      <br />
      <br />
      <span style={{ fontSize: "18px" }}>
        IT Campus의 수강 과정을 등록하실 수 있습니다.
      </span>
      <div style={{ paddingTop: "100px" }}></div>
      <form
        // className={classes.root}
        // noValidate
        // autoComplete="off"
        onSubmit={ProcessSubmit}
      >
        <table style={tableStyle} align="center">
          <caption style={{ textAlign: "right", marginBottom: "20px" }}>
            <button
              style={buttonStyle}
              type="submit"
              className={classes.margin}
            >
              <i className="fas fa-plus"></i>&nbsp;&nbsp; 등록
            </button>
          </caption>
          <tbody>
            <tr style={trStyle}>
              <td style={{ width: 150 }}>과정명</td>
              <td align="left">
                <input
                  type="text"
                  value={process_subject}
                  onChange={handleChange}
                  onFocus={onFocusSubject}
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
              <td>분류</td>
              <td align="left" style={{ textAlign: "left" }}>
                <TextField
                  id="standard-select-currency"
                  select
                  value={process_type}
                  onChange={selectChange}
                  style={{ width: "200px" }}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>시작 날짜</td>
              <td align="left" style={{ textAlign: "left" }}>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  style={{ width: "200px" }}
                >
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={process_startdate}
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
              <td align="left" style={{ textAlign: "left" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={process_enddate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>인원</td>
              <td align="left" style={{ textAlign: "left" }}>
                <FormControl
                  className={classes.formControl}
                  style={{ width: "200px" }}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={process_peoples}
                    onChange={handleSelectChange}
                  >
                    {peoples}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>담당 강사</td>
              <td align="left" style={{ textAlign: "left" }}>
                <FormControl
                  className={classes.formControl}
                  style={{ width: "200px" }}
                >
                  <Select
                    labelId="teacherlabel"
                    id="demo-simple-select"
                    onChange={handleTeacherChange}
                    value={process_teacher}
                  >
                    {teachers}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr style={trStyle}>
              <td>소개</td>
              <td align="left" style={{ textAlign: "left" }}>
                <textarea
                  rowsMax={8}
                  aria-label="maximum height"
                  placeholder="해당 수강과정의 소개를 작성해주세요"
                  onChange={intrChange}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: "1000px",
                    height: "400px",
                    border: "0px",
                  }}
                />
              </td>
            </tr>
            <tr style={trStyle}>
              <td>파일</td>
              <td align="left" style={{ textAlign: "left" }}>
                <span style={{ marginTop: "10px" }}>
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      파일 첨부
                    </Button>
                  </label>
                  &nbsp;&nbsp;
                  {filesLength}개
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={selectFiles}
                    style={{ visibility: "hidden" }}
                  />
                </span>
                <br />
                <br />
                {files.map((f) => {
                  return (
                    <span>
                      <img
                        alt=""
                        src={f.url}
                        style={{ height: "100px", width: "100px" }}
                      />
                    </span>
                  );
                })}
              </td>
            </tr>
            <tr style={trStyle}>
              <td rowSpan="2">교재</td>
              <td align="left" style={{ textAlign: "left" }}>
                {bookTag.map((item) => (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      deleteBooks(item);
                    }}
                  >
                    <b>{item.books_name}</b>&nbsp;
                    {item.books_writer}&nbsp;
                    {item.books_brand}
                    <br />
                  </span>
                ))}
                <br />
                <input
                  type="text"
                  value={searchBook}
                  placeholder="교재명을 검색하세요."
                  onFocus={getBooksList}
                  onChange={bookListChange}
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
              <td>
                <table style={{ width: "1000px" }}>
                  <thead>
                    <th>책 이름</th>
                    <th>저자</th>
                    <th>출판사</th>
                  </thead>
                  <tbody>
                    {findData.map((item, index) => (
                      <tr>
                        <td style={{ textAlign: "left" }}>
                          <span
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              plusBook(item, index);
                            }}
                          >
                            {item.books_name}
                          </span>
                        </td>
                        <td>{item.books_writer}</td>
                        <td>{item.books_brand}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div style={{ paddingTop: "100px" }}></div>
    </div>
  );
}

function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "-" + month + "-" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

function redirectAfterInsert() {
  return <Redirect to="/" />;
}

export default CurriculumAdd;
