import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import axios from "axios";
import Swal from "sweetalert2";
// import SaveIcon from "@material-ui/icons/Save"

import "./updatedata.scss";

const styles = (theme) => ({
  input: {
    display: "none",
  },
});

const uploadFiles = [];

class UpdateData extends Component {
  state = {
    classdata: this.props.location.state.classdata,
    classdatafile: this.props.location.state.classdatafile,
    process_num: this.props.match.params.process_num,
    delfile: [],
    uploadFile: [],
    filelist: [],
    fileName: [],
    uploadlength: 0,
  };
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleSubjectChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("제목: " + this.state.classdata_subject);
  };

  handleImageChange = (e) => {
    let length = 0;
    for (let i = 0; i < e.target.files.length; i++) {
      this.state.uploadFile.push(e.target.files[i]);
      this.state.fileName.push(e.target.files[i].name);
      length++;
    }
    this.setState({
      uploadlength: length,
    });

    console.log(this.state.uploadFile);
  };

  handleIntrChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("자료 소개: " + this.state.classdata_content);
  };

  classdataFile = () => {
    this.setState({
      filelist: this.state.classdatafile.map((item, idx) => (
        <span key={idx} id={idx + item}>
          <span id={idx} name="cdfiles" value={item}>
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

  isUpdate = (e) => {
    e.preventDefault();

    const data = new FormData();

    for (let i = 0; i < this.state.uploadFile.length; i++) {
      data.append(`classdata_files[${i}]`, this.state.uploadFile[i]);
    }
    for (var f = 0; f < this.state.delfile.length; f++) {
      console.log(this.state.delfile.length);
      console.log(this.state.delfile[f]);
      data.append(`classdata_delfile[${f}]`, this.state.delfile[f]);
    }
    data.append("classdata_subject", e.target.classdata_subject.value);
    data.append("classdata_content", e.target.classdata_content.value);
    data.append("classdata_filename", this.state.fileName);
    data.append("classdata_member_num", localStorage.num);
    data.append("classdata_writer", localStorage.name);
    data.append("classdata_num", this.state.classdata.classdata_num);
    let url = "http://localhost:8000/project/classdata/classdataupdate";
    axios
      .post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("classdata update");
        Swal.fire({
          icon: "success",
          title: "수정 완료",
          text: "수업자료 수정이 완료되었습니다",
        }).then((result) => {
          window.location.href = "/classdata/" + this.state.process_num;
        });
      })
      .catch((err) => {
        console.log("업로드 오류: " + err);
      });
  };

  componentWillMount() {
    this.classdataFile();
    console.log(this.state.classdatafile);
  }

  componentDidMount() {
    this.setState({
      classdata_subject: this.state.classdata.classdata_subject,
      classdata_content: this.state.classdata.classdata_content,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="updatedata">
        <form
          id="updatedataback"
          className="writeinsert"
          onSubmit={this.isUpdate.bind(this)}
        >
          {/* 여기서 부터 시작  */}
          <div id="classdatanav">
            {/* 이미지 박스  */}
            <div id="classdataimgbox">
              <img src={require("./note.jpg")} id="classdataimg"></img>
            </div>
            {/* 검은 배경  */}
            <div id="classdataimgback"></div>

            {/* 텍스트 박스 */}
            <div id="classdatatextbox">
              <div id="classdatatit">Lecture Room</div>
              <div id="classdatasub">Note for study</div>
            </div>
          </div>

          <h1>수업 자료</h1>
          <br></br>
          <TextField
            id="outlined-read-only-input"
            label="제목"
            name="classdata_subject"
            variant="outlined"
            onChange={this.handleSubjectChange.bind(this)}
            required
            style={{ margin: "8px", width: "400px" }}
            value={this.state.classdata_subject}
          />
          <hr />
          <Fragment>
            <input
              className={classes.input}
              id="icon-button-photo"
              onChange={this.handleImageChange.bind(this)}
              type="file"
              name="classdata_filename"
              multiple
            />
            <label htmlFor="icon-button-photo">
              <Button
                color="primary"
                component="span"
                startIcon={<DescriptionIcon />}
              >
                파일 선택
              </Button>
            </label>
            {this.state.filelist}
          </Fragment>
          {this.state.filelist}
          <b style={{ color: "blue" }}>
            {this.state.filelist.length}개의 파일이 선택되었습니다
          </b>
          <hr />

          <TextField
            id="outlined-multiline-static"
            label="소개"
            required
            multiline
            rows={9}
            name="classdata_content"
            variant="outlined"
            style={{ width: "800px", zIndex: "0" }}
            onChange={this.handleIntrChange.bind(this)}
            value={this.state.classdata_content}
          />
          <br></br>
          <br></br>

          <div style={{ marginLeft: "650px" }}>
            <Button variant="contained" color="primary" type="submit">
              등록
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              href={"/classdata/" + this.state.process_num}
            >
              목록
            </Button>{" "}
            <div style={{ height: "60px", width: "100%" }}></div>
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(styles)(UpdateData);
