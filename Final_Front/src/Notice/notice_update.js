import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import noticeimg from "./noticeback.jpg";
import Swal from "sweetalert2";

class Notice_Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticedata: this.props.location.state.noticedata,
      noticefile: this.props.location.state.noticefile,
      currentPage: this.props.location.state.page,
      fileName: [],
      uploadFile: [],
      filelist: [],
      delfile: [],
      notice: 1,
    };
  }

  componentWillMount() {
    this.fileList();
  }
  componentDidMount() {
    if (this.state.noticedata.notice_type === 1) {
      this.setState({
        check: "checked",
      });
    }
    this.setState({
      notice_subject: this.state.noticedata.notice_subject,
      notice_content: this.state.noticedata.notice_content,
    });
  }
  onKeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onImageChange = (e) => {
    console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      //uploadFile.push("{idx:uploadFile_" + i + " name:" + e.target.files[i] + "}");
      //uploadFile[i] = { idx: i.toString(), name: e.target.files[i] };
      this.state.uploadFile.push(e.target.files[i]);
      this.state.fileName.push(e.target.files[i].name);
    }
    console.log(this.state.fileName);
  };
  fileList = () => {
    this.setState({
      filelist: this.state.noticefile.map((item, idx) => (
        <span key={idx} id={idx + item}>
          <span id={idx} name="nfiles" value={item}>
            {item}
          </span>
          &nbsp;&nbsp;
          <span
            onClick={this.filedelete.bind(this, idx, item)}
            style={{ cursor: "pointer" }}
          >
            <i class="far fa-trash-alt"></i>
          </span>
          <br />
        </span>
      )),
    });
  };

  delfileplus = (item) => {
    let s = this.state.delfile;
    s.push(item);
    this.setState({
      delfile: s,
    });
  };

  filedelete = (idx, item) => {
    console.log("삭제" + idx);
    document.getElementById(idx + item).style.display = "none";
    this.delfileplus(item);

    document.getElementById(idx).setAttribute("name", "deleteFile");
    console.log(this.state.delfile);
  };
  onCheckboxhandler = (e) => {
    if (e.target.checked) {
      this.setState({
        check: e.target.checked,
        notice: 1,
      });
    } else {
      this.setState({
        check: e.target.unchecked,
        notice: 0,
      });
    }
  };
  updateNotice = (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    for (var i = 0; i < this.state.uploadFile.length; i++) {
      dataForm.append(`notice_file[${i}]`, this.state.uploadFile[i]);
    }
    for (var f = 0; f < this.state.delfile.length; f++) {
      console.log(this.state.delfile.length);
      console.log(this.state.delfile[f]);
      dataForm.append(`notice_delfile[${f}]`, this.state.delfile[f]);
    }
    dataForm.append("notice_num", this.state.noticedata.notice_num);
    dataForm.append("notice_subject", e.target.notice_subject.value);
    dataForm.append("notice_content", e.target.notice_content.value);
    dataForm.append("notice_filename", this.state.fileName);
    dataForm.append("notice_type", this.state.notice);
    console.log("notice_type=" + this.state.notice);
    let url = "http://localhost:8000/project/notice/noticeupdate";
    Axios.post(url, dataForm, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("notice update");
        Swal.fire({
          icon: "success",
          title: "수정 완료",
          text: "공지사항 수정이 완료되었습니다",
        }).then((result) => {
          window.location.href = "/noticelist";
        });
      })
      .catch((err) => {
        console.log("notice update error=" + err);
      });
  };
  render() {
    const backimage = {
      width: "100%",
      height: "500px",
      backgroundImage: `url(${noticeimg})`,
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
      borderBottom: "0px",
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
      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "100px" }}></div>
        <div style={backimage}>
          <span style={{ fontSize: "70px" }}>공지사항</span>
          <br />
          <span style={{ fontSize: "18px" }}>
            IT Campus의 새로운 소식을 알려드립니다.
          </span>
        </div>
        <div style={{ paddingTop: "100px" }}></div>
        <span style={{ fontSize: "40px" }}>공지사항</span>
        <br />
        <div style={{ paddingTop: "100px" }}></div>
        <form onSubmit={this.updateNotice.bind(this)}>
          <input
            type="hidden"
            name="notice_member_num"
            value={this.state.noticedata.notice_member_num}
          />
          <table style={tableStyle} Align="center">
            <tbody>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>제목</td>
                <input
                  type="text"
                  name="notice_subject"
                  ref="notice_subjects"
                  id="notice_subject"
                  style={{ width: "1000px", height: "40px", border: "0px" }}
                  onChange={this.onKeyChange.bind(this)}
                  value={this.state.notice_subject}
                  required
                />
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>구분</td>
                <td Align="left">
                  <input
                    type="checkbox"
                    value="1"
                    checked={this.state.check}
                    onChange={this.onCheckboxhandler.bind(this)}
                  />
                  맨 위로
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>내용</td>
                <td>
                  <textarea
                    style={{
                      width: "1000px",
                      height: "500px",
                      marginTop: "30px",
                      border: "0px",
                    }}
                    name="notice_content"
                    ref="notice_contents"
                    onChange={this.onKeyChange.bind(this)}
                    value={this.state.notice_content}
                    required
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td style={{ width: "100px" }}>파일</td>
                <td
                  Align="left"
                  style={{ paddingTop: "8px", paddingBottom: "8px" }}
                >
                  <input
                    type="file"
                    multiple="multiple"
                    name="notice_filename"
                    onChange={this.onImageChange.bind(this)}
                    style={{ marginBottom: "5px" }}
                  />
                  <br />
                  {this.state.filelist}
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingBottom: "20px" }}></div>
          <button type="submit" style={buttonStyle}>
            <i class="fas fa-pencil-alt"></i>&nbsp;&nbsp; 저장
          </button>
          &nbsp;&nbsp;
          <Link
            to={{
              pathname: `/noticedetail`,
              state: {
                num: this.state.noticedata.notice_num,
                currentPage: this.state.currentPage,
                pageNum: this.state.pageNum,
              },
            }}
            style={{ color: "black", textDecoration: "none" }}
          >
            <button type="button" style={buttonStyle}>
              <i class="fas fa-undo-alt"></i>&nbsp;&nbsp; 뒤로
            </button>
          </Link>
        </form>
        <div style={{ paddingBottom: "100px" }}></div>
      </div>
    );
  }
}
export default Notice_Update;
