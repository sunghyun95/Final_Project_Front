import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import Swal from "sweetalert2";
import review from "./review.jpg";
import { Link } from "react-router-dom";
// import SaveIcon from "@material-ui/icons/Save"

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

class UpdateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: this.props.location.state.reviewList,
      review_ready: this.props.location.state.reviewList.review_ready,
      review_plans: this.props.location.state.reviewList.review_plans,
      review_commu: this.props.location.state.reviewList.review_commu,
      review_content: this.props.location.state.reviewList.review_content,
      review_subject: this.props.location.state.reviewList.review_subject,
      review_num: this.props.location.state.reviewList.review_num,
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    console.log(this.state.reviewList);
    this.setState({});
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
      review_plans: e2.target.value,
    });
    console.log("커리큘럼:" + this.state.review_plans);
  };
  isSetCommuValue = (e3) => {
    this.setState({
      review_commu: e3.target.value,
    });
    console.log("전달력:" + this.state.review_commu);
  };
  isSetReadyValue = (e4) => {
    this.setState({
      review_ready: e4.target.value,
    });
    console.log("준비성" + this.state.review_ready);
  };

  isSetHover = (event) => {
    this.setState({
      hover: event.target.hover,
    });
    console.log(this.state.hover);
  };

  isUpdate = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("review_num", this.state.review_num);
    data.append("review_subject", this.state.review_subject);
    data.append("review_content", this.state.review_content);
    data.append("review_member_num", localStorage.num);
    data.append("review_member_name", localStorage.name);
    data.append("review_process", "교육과정");
    data.append("review_plans", this.state.review_plans);
    data.append("review_commu", this.state.review_commu);
    data.append("review_ready", this.state.review_ready);
    let url = "http://localhost:8000/project/review/updatereview";
    axios
      .post(url, data)
      .then((res) => {
        Swal.fire("수정 완료", "수정이 완료되었습니다", "success").then(
          (result) => {
            if (result.value) {
              window.location.href = "/reviewlist";
            }
          }
        );
      })
      .catch((err) => {
        console.log("리뷰수정 오류: " + err);
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
        <form className="reviewinsert" onSubmit={this.isUpdate.bind(this)}>
          <table style={tableStyle} align="center">
            <tbody>
              <tr style={trStyle}>
                <td style={{ width: "200px" }}>제목</td>
                <td style={{ width: "900px", textAlign: "left" }}>
                  <TextField
                    id="outlined-read-only-input"
                    variant="outlined"
                    value={this.state.review_subject}
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
                    value={this.state.review_content}
                    onChange={this.handleContChange.bind(this)}
                  />
                </td>
              </tr>
              <tr style={trStyle}>
                <td>평점</td>
                <td style={{ textAlign: "left" }}>
                  <b>커리큘럼</b> &nbsp;
                  <Rating
                    name="hover-feedback1"
                    value={this.state.review_plans}
                    precision={1}
                    onChange={this.isSetPlansValue.bind(this)}
                    onChangeActive={this.isSetHover.bind(this)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>준비성</b> &nbsp;
                  <Rating
                    name="hover-feedback2"
                    value={this.state.review_ready}
                    precision={1}
                    onChange={this.isSetReadyValue.bind(this)}
                    onChangeActive={this.isSetHover.bind(this)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>전달력</b> &nbsp;
                  <Rating
                    name="hover-feedback3"
                    value={this.state.review_commu}
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
            <i className="fas fa-pencil-alt"></i>&nbsp;&nbsp;수정
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
export default withStyles(styles)(UpdateReview);
