import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
// import SaveIcon from "@material-ui/icons/Save"
import Swal from "sweetalert2";
import review from "./review.jpg";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
});

class AddReview extends Component {
  state = {
    review_subject: "",
    review_content: "",
    process_value: 2,
    plans_value: 2,
    ready_value: 2,
    commu_value: 2,
    hover: -1,
  };
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleSubjectChange = (e) => {
    e.preventDefault();
    this.setState({
      review_subject: e.target.value,
    });
    console.log("제목: " + this.state.review_subject);
  };

  handleContChange = (e) => {
    e.preventDefault();
    this.setState({
      review_content: e.target.value,
    });
    console.log("내용: " + this.state.review_content);
  };
  isSetPlansValue = (e2) => {
    this.setState({
      plans_value: e2.target.value,
    });
    console.log("커리큘럼:" + this.state.plans_value);
  };
  isSetCommuValue = (e3) => {
    this.setState({
      commu_value: e3.target.value,
    });
    console.log("전달력:" + this.state.commu_value);
  };
  isSetReadyValue = (e4) => {
    this.setState({
      ready_value: e4.target.value,
    });
    console.log("준비성" + this.state.ready_value);
  };

  isSetHover = (event) => {
    this.setState({
      hover: event.target.hover,
    });
    console.log(this.state.hover);
  };

  isUpload = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("review_subject", this.state.review_subject);
    data.append("review_content", this.state.review_content);
    data.append("review_member_num", localStorage.num);
    data.append("review_member_name", localStorage.name);
    data.append("review_process", localStorage.type);
    data.append("review_plans", this.state.plans_value);
    data.append("review_commu", this.state.commu_value);
    data.append("review_ready", this.state.ready_value);
    let url = "http://localhost:8000/project/review/addreview";
    axios
      .post(url, data)
      .then((res) => {
        Swal.fire("작성 완료", "소중한 리뷰 감사합니다", "success").then(
          (result) => {
            if (result.value) {
              window.location.href = "/reviewlist";
            }
          }
        );
      })
      .catch((err) => {
        console.log("리뷰작성 오류: " + err);
      });

    // FormData의 key 확인
    for (let key of data.keys()) {
      console.log(key);
    }

    // FormData의 value 확인
    for (let value of data.values()) {
      console.log(value);
    }
  };

  render() {
    const { classes } = this.props;
    const backimage = {
      width: "100%",
      height: "500px",
      backgroundImage: `url(${review})`,
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
      <div style={{ textAlign: "center" }} align="center">
        <div style={{ paddingTop: "100px" }}></div>
        <div style={backimage}>
          <span style={{ fontSize: "70px", color: "black" }}>
            IT Campus Review
          </span>
          <br />
          <span style={{ fontSize: "18px", color: "black" }}>
            IT Campus Review
          </span>
        </div>
        <div style={{ paddingTop: "100px" }}></div>
        <span style={{ fontSize: "40px" }}>리뷰 및 평점</span>
        <br />
        <br />
        <span style={{ fontSize: "18px" }}>
          IT Campus의 리뷰 및 평점을 등록 할 수 있습니다.
        </span>
        <div style={{ paddingTop: "100px" }}></div>
        <form className="reviewinsert" onSubmit={this.isUpload.bind(this)}>
          <table style={tableStyle} align="center">
            <tbody>
              <tr style={trStyle}>
                <td style={{ width: "200px" }}>제목</td>
                <td style={{ width: "900px", textAlign: "left" }}>
                  <TextField
                    id="outlined-read-only-input"
                    variant="outlined"
                    onChange={this.handleSubjectChange.bind(this)}
                    required
                    style={{
                      width: "900px",
                      border: "0px",
                      margin: "5px 0 5px 0",
                    }}
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td>내용</td>
                <td style={{ textAlign: "left" }}>
                  <TextField
                    id="outlined-multiline-static"
                    required
                    multiline
                    rows={9}
                    variant="outlined"
                    style={{ width: "900px", margin: "5px 0 5px 0" }}
                    onKeyUp={this.handleContChange.bind(this)}
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td>평점</td>
                <td style={{ textAlign: "left" }}>
                  <b>커리큘럼</b> &nbsp;
                  <Rating
                    name="hover-feedback1"
                    value={this.state.plans_value}
                    precision={1}
                    onChange={this.isSetPlansValue.bind(this)}
                    onChangeActive={this.isSetHover.bind(this)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>준비성</b> &nbsp;
                  <Rating
                    name="hover-feedback2"
                    value={this.state.ready_value}
                    precision={1}
                    onChange={this.isSetReadyValue.bind(this)}
                    onChangeActive={this.isSetHover.bind(this)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>전달력</b> &nbsp;
                  <Rating
                    name="hover-feedback3"
                    value={this.state.commu_value}
                    precision={1}
                    onChange={this.isSetCommuValue.bind(this)}
                    onChangeActive={this.isSetHover.bind(this)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingBottom: "20px" }}></div>
          <button type="submit" style={buttonStyle}>
            <i className="fas fa-plus"></i> &nbsp;&nbsp;등록
          </button>
          &nbsp;&nbsp;
          <Link to="/reviewlist">
            <button type="button" style={buttonStyle}>
              <i className="fas fa-bars"></i>&nbsp;&nbsp; 목록
            </button>
          </Link>
        </form>
        <div style={{ paddingBottom: "100px" }}></div>
      </div>
    );
  }
}
export default withStyles(styles)(AddReview);
