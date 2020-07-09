import React, { useEffect } from "react";
import { Feed, Comment, Header, Form } from "semantic-ui-react";
import {
  TextField,
  Paper,
  makeStyles,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import SemanticButton from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import queryStirng from "query-string";
import Axios from "axios";
import useIntersect from "./useIntersect";
import BeatLoader from "react-spinners/BeatLoader";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ClearIcon from "@material-ui/icons/Clear";
import Swal from "sweetalert2";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import studyimg from "../Study/study.jpg";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const paperStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(40),
    },
  },
}));

const avatarStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: theme.spacing(1),
  },
}));

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

export default function MyStudyTeam(props) {
  const [state, setState] = React.useState({ itemCount: 0, isLoading: false });
  /* fake async fetch */
  const fetchItems = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fakeFetch();
    setState((prev) => ({
      itemCount: prev.itemCount + 3,
      isLoading: false,
    }));
  };
  /* initial fetch */
  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    getFeedList(state.itemCount);
  }, [state.itemCount]);
  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});
  const { itemCount, isLoading } = state;

  const paperClasses = paperStyles();
  const avatarclasses = avatarStyles();

  const { search } = props.location;
  const queryObj = queryStirng.parse(search);
  const { studyfeed_studygroup_num } = queryObj;
  const [studymembercount, setStudyMemberCount] = React.useState([]);
  const [studymemberlist, setStudyMemberList] = React.useState([]);
  const [studyfeed_content, setStudyFeedContent] = React.useState("");
  const [uploadfile, setUploadFile] = React.useState([]);
  const [
    studyfeedfiles_studyfeed_filename,
    setStudyFeedFileName,
  ] = React.useState([]);
  const [filecount, setFileCount] = React.useState(0);
  const [feedlist, setFeedList] = React.useState([]);
  const [filelist, setFileList] = React.useState([]);
  const [reply_content, setReplyContent] = React.useState("");
  const [replylist, setReplyList] = React.useState([]);
  const [file_num, setFileNum] = React.useState(0);
  const [updatefilecount, setUpdateFileCount] = React.useState(0);
  const [feedsubject, setFeedsubject] = React.useState("");

  const handleContentChange = (event) => {
    setStudyFeedContent(event.target.value);
    console.log(studyfeed_content);
  };

  const handleFileChange = (event) => {
    console.log(event.target.files.length);
    setFileCount(event.target.files.length);
    for (let i = 0; i < event.target.files.length; i++) {
      uploadfile.push(event.target.files[i]);
      studyfeedfiles_studyfeed_filename.push(event.target.files[i].name);
    }
    console.log(uploadfile);
    console.log(studyfeedfiles_studyfeed_filename);
  };

  const getStudyMember = () => {
    const url = `http://localhost:8000/project/studyfeed/member?studyfeed_studygroup_num=${studyfeed_studygroup_num}`;

    Axios.get(url)
      .then((res) => {
        setStudyMemberCount(res.data.membercount);
        setStudyMemberList(res.data.memberlist);
        setFeedsubject(res.data.subject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFeedList = (itemCount) => {
    const url = `http://localhost:8000/project/studyfeed/feedlist?studyfeed_studygroup_num=${studyfeed_studygroup_num}&offset=${itemCount}`;

    Axios.get(url)
      .then((res) => {
        var array = res.data;
        for (let index = 0; index < array.length; index++) {
          feedlist.push(array[index]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFileList = (studyfeedfiles_studyfeed_num) => {
    const url =
      "http://localhost:8000/project/studyfeed/filelist?studyfeedfiles_studyfeed_num=" +
      studyfeedfiles_studyfeed_num;

    setFileNum(studyfeedfiles_studyfeed_num);

    Axios.get(url)
      .then((res) => {
        setFileList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const url = "http://localhost:8000/project/studyfeed/add";
    const formData = new FormData();

    for (var i = 0; i < uploadfile.length; i++) {
      formData.append(`uploadfile[${i}]`, uploadfile[i]);
    }
    formData.append(
      "studyfeedfiles_studyfeed_filename",
      studyfeedfiles_studyfeed_filename
    );
    formData.append("studyfeed_content", studyfeed_content);
    formData.append("studyfeed_studygroup_num", studyfeed_studygroup_num);
    formData.append("studyfeed_member_num", localStorage.num);

    Axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        window.location.href = window.location.href;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReplyContentChange = (event) => {
    setReplyContent(event.target.value);
    console.log(reply_content);
  };

  const onCommentSubmit = (event, studyfeed_num) => {
    event.preventDefault();
    console.log(studyfeed_num);
    const url = "http://localhost:8000/project/reply/add";

    Axios.post(url, {
      reply_member_num: localStorage.num,
      reply_studyfeed_num: studyfeed_num,
      reply_content: reply_content,
    })
      .then((res) => {
        getReplyList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReplyList = (et) => {
    const url = "http://localhost:8000/project/reply/list";

    Axios.get(url)
      .then((res) => {
        setReplyList(res.data);

        if (et.nextElementSibling.style.display === "none") {
          et.nextElementSibling.style.display = "block";
        } else {
          et.nextElementSibling.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUpdateForm = (event, idx) => {
    if (document.getElementById("update" + idx).style.display === "none") {
      document.getElementById("feed" + idx).style.display = "none";
      document.getElementById("update" + idx).style.display = "block";
    }
  };

  const getFeedForm = (event, idx) => {
    if (document.getElementById("feed" + idx).style.display === "none") {
      document.getElementById("update" + idx).style.display = "none";
      document.getElementById("feed" + idx).style.display = "block";
    }
  };

  const handleFileDelete = (filename, i) => {
    const url =
      "http://localhost:8000/project/studyfeed/filedelete?studyfeedfiles_studyfeed_filename=" +
      filename;

    Axios.delete(url)
      .then((res) => {
        document.getElementById("file" + i).style.display = "none";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateFileChange = (event) => {
    console.log(event.target.files.length);
    setUpdateFileCount(event.target.files.length);
    for (let i = 0; i < event.target.files.length; i++) {
      uploadfile.push(event.target.files[i]);
      studyfeedfiles_studyfeed_filename.push(event.target.files[i].name);
    }
    console.log(uploadfile);
    console.log(studyfeedfiles_studyfeed_filename);
  };

  const onUpdateSubmit = (event, studyfeed_num) => {
    event.preventDefault();

    const url = "http://localhost:8000/project/studyfeed/update";
    const formData = new FormData();

    for (var i = 0; i < uploadfile.length; i++) {
      formData.append(`uploadfile[${i}]`, uploadfile[i]);
    }
    formData.append(
      "studyfeedfiles_studyfeed_filename",
      studyfeedfiles_studyfeed_filename
    );
    formData.append("studyfeed_content", studyfeed_content);
    formData.append("studyfeed_num", studyfeed_num);

    Axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        window.location.href = window.location.href;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteFeed = (event, idx, studyfeed_num) => {
    const url =
      "http://localhost:8000/project/studyfeed/delete?studyfeed_num=" +
      studyfeed_num;

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
            document.getElementById("feedcontent" + idx).style.display = "none";
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("삭제 성공!", "정상적으로 삭제되었습니다", "success");
      }
    });
  };

  const onDeleteComment = (reply_num, i) => {
    const url =
      "http://localhost:8000/project/reply/delete?reply_num=" + reply_num;

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
            document.getElementById("comment" + i).style.display = "none";
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("삭제 성공!", "정상적으로 삭제되었습니다", "success");
      }
    });
  };

  useEffect(() => {
    getStudyMember();
  }, []);
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
    width: "230px",
    border: "0px",
    borderCollapse: "collapse",
    borderTop: "1px solid #D5D5D5",
    marginTop: 20,
  };
  const tableStyle1 = {
    textAlign: "center",
    fontSize: "16px",
    width: "750px",
    border: "0px",
    borderCollapse: "collapse",
    borderTop: "0px solid #D5D5D5",
    marginTop: 20,
  };
  const trStyle = {
    //borderBottom: "1px solid #D5D5D5",
    height: "40px",
  };
  const trStyle1 = {
    borderBottom: "1px solid #D5D5D5",
    height: "40px",
  };
  if (!itemCount) return null;
  return (
    <div
      style={{ textAlign: "center", backgroundColor: "#F6F6F6" }}
      aling="center"
    >
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
      <span style={{ fontSize: "40px" }}>{feedsubject}</span>
      <div style={{ paddingTop: "80px" }}></div>
      <div style={{ display: "inline-block" }}>
        {/* 피드 */}
        <div
          style={{
            border: "0px solid gray",
            width: 800,
            height: "auto",
            float: "left",
            backgroundColor: "white",
          }}
        >
          <div style={{ paddingTop: "30px" }}></div>
          {/* 피드 작성 */}
          <form onSubmit={onSubmit}>
            <table style={tableStyle1} align="center">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <TextField
                      id="outlined-multiline-static"
                      label="내용을 입력하세요."
                      multiline
                      rows={5}
                      style={{ width: "750px" }}
                      variant="outlined"
                      required
                      onChange={handleContentChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        size="small"
                      >
                        파일 선택
                      </Button>
                      &nbsp;
                      {filecount !== 0 ? filecount + " 개 첨부됨" : ""}
                    </label>
                    <input
                      style={{ display: "none" }}
                      id="contained-button-file"
                      multiple
                      onChange={handleFileChange}
                      type="file"
                    />
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Button
                      variant="text"
                      color="primary"
                      type="submit"
                      style={{ marginLeft: "570px", fontSize: "12pt" }}
                    >
                      작성
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          {/*  */}
          <table style={tableStyle1} align="center">
            <tbody>
              <tr style={trStyle1}>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "left",
                    paddingTop: "20px",
                    paddingBottom: "10px",
                  }}
                >
                  {"피드 (" + feedlist.length + ")"}
                </td>
              </tr>
              {feedlist.map((row, idx) => (
                <tr key={idx}>
                  <td colSpan="2">
                    <Feed
                      style={{ overflowX: "hidden" }}
                      id={"feedcontent" + idx}
                    >
                      <Feed.Event id={"feed" + idx}>
                        <Avatar
                          alt={row.member_name}
                          src={
                            "http://localhost:8000/project/uploadfile/" +
                            row.member_profile
                          }
                          className={avatarclasses.small}
                        />
                        <Feed.Content>
                          <Feed.Summary>
                            {row.member_name}
                            <Feed.Date>
                              {new Date(
                                row.studyfeed_writeday
                              ).toLocaleDateString()}
                            </Feed.Date>
                            {localStorage.num == row.studyfeed_member_num ? (
                              <span style={{ marginLeft: 550 }} align="right">
                                <CreateIcon
                                  style={{ color: "gray", cursor: "pointer" }}
                                  onClick={(event) => {
                                    getUpdateForm(event, idx);
                                  }}
                                />
                                &nbsp;&nbsp;
                                <DeleteOutlineIcon
                                  style={{ color: "gray", cursor: "pointer" }}
                                  onClick={(event) => {
                                    onDeleteFeed(event, idx, row.studyfeed_num);
                                  }}
                                />
                              </span>
                            ) : (
                                ""
                              )}
                          </Feed.Summary>
                          <Feed.Extra text>{row.studyfeed_content}</Feed.Extra>
                          &nbsp;&nbsp;
                          <Button
                            variant="text"
                            color="primary"
                            type="button"
                            size="small"
                            style={{ textAlign: "right" }}
                            align="right"
                            onClick={() => {
                              getFileList(row.studyfeed_num);
                            }}
                          >
                            첨부파일
                          </Button>
                          {filelist.map((ele, i) => (
                            <Typography variant="body1">
                              {row.studyfeed_num === file_num ? (
                                // 다운로드
                                <a
                                  alt=""
                                  href={`http://localhost:8000/project/uploadfile/${ele}`}
                                  download
                                >
                                  {ele}
                                </a>
                              ) : (
                                  ""
                                )}
                            </Typography>
                          ))}
                        </Feed.Content>
                      </Feed.Event>
                      <Feed.Event
                        style={{ display: "none" }}
                        id={"update" + idx}
                      >
                        <Feed.Content>
                          <form
                            onSubmit={(event) => {
                              onUpdateSubmit(event, row.studyfeed_num);
                            }}
                          >
                            <ArrowBackIcon
                              style={{ color: "gray", cursor: "pointer" }}
                              onClick={(event) => {
                                getFeedForm(event, idx);
                              }}
                            />
                            <br />
                            <TextField
                              id="outlined-multiline-static"
                              label="내용"
                              multiline
                              rows={5}
                              style={{ width: "650px" }}
                              variant="outlined"
                              onChange={handleContentChange}
                              defaultValue={row.studyfeed_content}
                            />
                            <br />
                            <br />
                            <div>
                              <input
                                style={{ display: "none" }}
                                id="contained-button-updatefile"
                                multiple
                                onChange={handleUpdateFileChange}
                                type="file"
                              />
                              <label htmlFor="contained-button-updatefile">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                  size="small"
                                >
                                  파일 선택
                                </Button>
                                &nbsp;
                                {updatefilecount !== 0
                                  ? updatefilecount + " 개 첨부됨"
                                  : ""}
                                <br />
                                <Button
                                  variant="text"
                                  color="primary"
                                  size="small"
                                  style={{ marginLeft: "480px" }}
                                  onClick={() => {
                                    getFileList(row.studyfeed_num);
                                  }}
                                >
                                  파일 내역
                                </Button>
                              </label>
                              {filelist.map((ele, i) => (
                                <Typography variant="body1">
                                  {row.studyfeed_num === file_num ? (
                                    <span id={"file" + i}>
                                      {ele}
                                      <ClearIcon
                                        style={{
                                          cursor: "pointer",
                                          paddingTop: "10px",
                                          color: "red",
                                          textAlign: "right",
                                        }}
                                        onClick={() => {
                                          handleFileDelete(ele, i);
                                        }}
                                      />
                                    </span>
                                  ) : (
                                      ""
                                    )}
                                </Typography>
                              ))}
                            </div>
                            <Button
                              variant="text"
                              color="primary"
                              type="submit"
                              style={{ textAlign: "right", fontSize: "12pt" }}
                            >
                              수정
                            </Button>
                          </form>
                        </Feed.Content>
                      </Feed.Event>
                      <Header
                        as="h3"
                        dividing
                        style={{
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "12px",
                        }}
                        onClick={(e) => {
                          getReplyList(e.target);
                        }}
                      >
                        댓글
                      </Header>

                      <Comment.Group
                        id={"reply" + row.studyfeed_num}
                        key={idx}
                        style={{ display: "none" }}
                      >
                        {replylist.map((ele, i) =>
                          ele.reply_studyfeed_num === row.studyfeed_num ? (
                            <Comment id={"comment" + i}>
                              <Avatar
                                alt={ele.member_name}
                                style={{ float: "left" }}
                                src={
                                  "http://localhost:8000/project/uploadfile/" +
                                  ele.member_profile
                                }
                                className={avatarclasses.small}
                              />
                              <Comment.Content>
                                <Comment.Author as="a">
                                  {ele.member_name}
                                </Comment.Author>
                                <Comment.Metadata>
                                  <div>
                                    {new Date(
                                      ele.reply_writeday
                                    ).toLocaleDateString()}
                                  </div>
                                  {ele.reply_member_num == localStorage.num ? (
                                    <HighlightOffIcon
                                      style={{
                                        marginLeft: "450px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        onDeleteComment(ele.reply_num, i);
                                      }}
                                    />
                                  ) : (
                                      ""
                                    )}
                                </Comment.Metadata>
                                <Comment.Text>{ele.reply_content}</Comment.Text>
                              </Comment.Content>
                            </Comment>
                          ) : (
                              ""
                            )
                        )}
                        <Form
                          reply
                          onSubmit={(event) => {
                            onCommentSubmit(event, row.studyfeed_num);
                          }}
                        >
                          <Form.TextArea
                            style={{ height: "100px", width: "650px" }}
                            onChange={handleReplyContentChange}
                          />
                          <SemanticButton
                            content="댓글 작성"
                            labelPosition="left"
                            icon="edit"
                            primary
                            type="submit"
                            style={{ marginLeft: "509.8px" }}
                          />
                        </Form>
                      </Comment.Group>
                    </Feed>
                  </td>
                </tr>
              ))}
              <br />
              <div ref={setRef} className="Loading">
                {isLoading && (
                  <div style={{ marginLeft: "280px" }}>
                    <BeatLoader color="#5AAEFF" />
                  </div>
                )}
              </div>
            </tbody>
          </table>
        </div>
        <div
          style={{ border: "1px solid #F6F6F6", width: 30, float: "left" }}
        ></div>
        {/* 참여중인 인원 */}
        <div
          style={{
            border: "0px solid gray",
            width: 250,
            height: 400,
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
              <b>참여중인 인원({studymembercount})</b>
            </caption>
            <tbody>
              {studymemberlist.map((row, idx) => (
                <tr key={idx} style={trStyle}>
                  <Avatar
                    alt={row.member_name}
                    src={
                      "http://localhost:8000/project/uploadfile/" +
                      row.member_profile
                    }
                    style={{ float: "left" }}
                    className={avatarclasses.large}
                  >
                    {row.member_name}
                  </Avatar>
                  <br />
                  {row.member_name}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ paddingTop: "100px" }}></div>
    </div>
  );
}
