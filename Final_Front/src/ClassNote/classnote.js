import React, { Component } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Swal from "sweetalert2";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import HtmlParser from "react-html-parser";

import Axios from "axios";
import "./classnote.scss";

const socket = io.connect("http://localhost:5000");
class classnote extends Component {
  editorRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      searchgroup: [{ asd: "" }, { asd: 0 }, { fdf: "분야" }],
      classcontent: "",
      roomnum: 0,
      roomname: "",
      memeocontent: "",
      classList: [],
    };
  }

  updateContent = (e) => {
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });

    this.setState({
      classcontent: this.editorRef.current.getInstance().getHtml(),
    });
    console.log(this.state.classcontent);

    this.sendMessage(this.state.classcontent);
  };

  sendMessage(msg) {
    socket.emit("update-msg", localStorage.room, msg);
  }

  updateMemo = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    console.log(this.state.memocontent);
  };

  classSave = (e) => {
    e.preventDefault();

    if (this.state.classcontent.indexOf("<img") > 0) {
      Swal.fire({
        icon: "error",
        title: "강의 저장 실패!",
        text: "사진을 같이 저장할 수 없습니다!, tomcat 헤드 에러",
      }).then((res) => {
        if (res) {
          return false;
        }
      });
      return false;
    }

    let str = this.state.classcontent.replace(/</g, "*");
    const str2 = str.replace(/>/g, "@");
    console.log("str2:" + str2);
    console.log("str2.typeof:" + typeof str2);
    console.log(this.state.classcontent);
    /* let bytes = [];
    for (let i = 0; i < this.state.classcontent.length; i++) {
      var code = this.state.classcontent.charCodeAt(i);

      bytes = bytes.concat([code]);
      console.log(bytes);
    }*/

    window.open(
      "http://localhost:8000/project/word/save?content=" +
        str2 +
        "&process_num=" +
        this.state.roomnum,
      "",
      "width=500,height=500"
    );

    // const script = document.createElement("script");
    // script.src = "https://use.typekit.net/foobar.js";
    // script.async = true;
    // document.body.appendChild(script);
  };

  memoSave = (e) => {
    e.preventDefault();

    console.log("content:" + this.state.content);

    let url = "http://localhost:8000/project/memo/insert";
    let formData = new FormData();
    formData.append("memo_member_num", localStorage.num);
    formData.append("memo_content", this.state.memocontent);
    Axios.post(url, formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "메모 저장 성공!",
          text: "메모가 성공적으로 저장되었습니다!",
        });
        this.setState({
          memocontent: "",
        });
      })
      .catch((err) => {
        console.log("메모 저장 에러 :" + err);
      });
  };

  componentWillMount() {
    let url =
      "http://localhost:8000/project/processclass/opennote?member_num=" +
      localStorage.num;
    Axios.get(url)
      .then((res) => {
        this.setState({
          roomnum: res.data.process_num,
          roomname: res.data.process_subject,
        });

        console.log("roomnum:" + this.state.roomnum);
        console.log("roomname:" + this.state.roomname);
        localStorage.room = this.state.roomname;

        //지난 수업 목록 불러오기
        let listUrl =
          "http://localhost:8000/project/processclass/classlist?process_num=" +
          this.state.roomnum;
        Axios.get(listUrl)
          .then((res) => {
            console.log(res.data);
            this.setState({
              classList: res.data,
            });
            console.log(this.state.classList);
          })
          .catch((err) => {
            console.log("지난 수업 목록 불러오기 에러 :" + err);
          });
      })
      .catch((err) => {
        console.log("수강 과정 번호 불러오기 에러 :" + err);
      });

    socket.emit("join", localStorage.room);
    socket.on("roomnum", (msg) => {
      console.log(msg);
    });
  }

  componentDidMount() {
    socket.on("chat-msg", (msg) => {
      console.log("did msg:" + msg);
      this.setState({
        classcontent: msg,
      });
    });
  }

  handleClick = () => {
    this.setState({
      classcontent: this.editorRef.getInstance().getHtml(),
    });
    console.log(this.state.classcontent);
  };

  render() {
    const filelist = this.state.classList.map((item) => (
      <tr>
        <td>{item}</td>
      </tr>
    ));

    return (
      <div id="classnote">
        <div id="classnoteback">
          {/* 여기서 시작 */}
          <table style={{ width: "100%" }}>{filelist}</table>
          <br></br>
          {localStorage.type === "강사" && (
            <div>
              <Editor
                previewStyle="tab"
                height="700px"
                initialEditType="wysiwyg"
                onChange={this.updateContent.bind(this)}
                initialValue={this.state.classcontent}
                ref={this.editorRef}
              />
              <br />
              {/* <a
                href={document.getElementsByClassName("tui-editor-contents")}
                alt=""
                download
              >
                SAVE CLASS
              </a> */}
              <div id="classnotebtnbox">
                <button onClick={this.classSave.bind(this)} id="classnotebtn">
                  SAVE CLASS
                </button>
              </div>
            </div>
          )}
          {localStorage.type === this.state.roomname && (
            <div id="viewer" style={{ border: "1px solid black" }}>
              {HtmlParser(this.state.classcontent)}
            </div>
          )}
          {/* <textarea
          rows="20"
          cols="30"
          name="classcontent"
          onChange={this.updateContent.bind(this)}
          value={this.state.classcontent}
        ></textarea> */}
          {/* <input type="text" readOnly value={this.state.classcontent} />
        <input
          type="text"
          name="classcontent"
          onChange={this.updateContent.bind(this)}
        /> */}

          <div style={{ width: "100%", height: "60px" }}></div>

          {/* 여기가 끝 */}
        </div>
      </div>
    );
  }
}
export default classnote;
