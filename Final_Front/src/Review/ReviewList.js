import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReviewBack from "./company.jpg";
import review from "./review.jpg";

const styles = (theme) => ({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

let planstot_value = 0;
let readytot_value = 0;
let commutot_value = 0;
let plansavg_value = 0;
let readyavg_value = 0;
let commuavg_value = 0;
let all_value = 0;

class ReviewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewList: [],
      path: "http://localhost:8000/project/uploadfile/",
      review_num: 0,
    };
  }

  list() {
    let url = "http://localhost:8000/project/review/reviewlist";
    axios
      .get(url)
      .then((res) => {
        res.data.map((element) => {
          planstot_value += element.review_plans;
          readytot_value += element.review_ready;
          commutot_value += element.review_commu;
        });
        plansavg_value = Math.round(planstot_value / (res.data.length + 1));
        readyavg_value = Math.round(readytot_value / (res.data.length + 1));
        commuavg_value = Math.round(commutot_value / (res.data.length + 1));
        all_value = Math.round(
          (plansavg_value + readyavg_value + commuavg_value) / 3.0
        );
        console.log("avg1=" + plansavg_value);
        console.log("avg2=" + readyavg_value);
        console.log("avg3=" + commuavg_value);
        console.log("allvalue=" + all_value);
        this.setState({
          reviewList: res.data,
        });
      })
      .catch((error) => {
        console.log("출력 오류:" + error);
      });
  }

  onDelete = (review_num) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제된 내용은 복원되지 않습니다",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.value) {
        let url =
          "http://localhost:8000/project/review/deletereview?review_num=" +
          review_num;
        axios
          .get(url)
          .then((res) => {
            this.list();
          })
          .catch((err) => {
            console.log("삭제 에러:" + err);
          });
      }
    });
  };
  componentWillMount() {
    this.list();
  }
  render() {
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
      //borderTop: "1px solid black",
    };
    const tableStyle1 = {
      textAlign: "center",
      fontSize: "16px",
      width: "1200px",
      border: "0px",
      borderCollapse: "collapse",
      borderTop: "1px solid #D5D5D5",
    };
    const trStyle = {
      borderBottom: "1px solid #D5D5D5",
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
    const url = "http://localhost:8000/project/uploadfile/";
    return (
      <div style={{ textAlign: "center" }} align="center">
        <div style={{ paddingTop: "75px" }}></div>
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
        <table style={tableStyle} align="center">
          <caption style={{ textAlign: "left", marginBottom: "15px" }}>
            <span style={{ fontSize: "38px", textAlign: "left" }}>
              리뷰({this.state.reviewList.length})
            </span>
            <span></span>
          </caption>
          <tbody>
            <tr
              style={{
                backgroundColor: "#F6F6F6",
                borderTop: "0px solid gray",
                width: "800px",
                height: "120px",
              }}
            >
              <td colSpan="2">
                <Rating
                  name="All"
                  value={all_value}
                  readOnly
                  style={{ fontSize: "50px" }}
                />
                &nbsp;&nbsp;
                <span style={{ fontSize: "25px" }}>{all_value.toFixed(1)}</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ height: "100px" }}>
                <span style={{ fontSize: "20px" }}>
                  커리큘럼&nbsp;
                  <Rating name="Curri" value={plansavg_value} readOnly />
                  &nbsp;&nbsp;&nbsp;&nbsp; 전달력&nbsp;
                  <Rating name="Commu" value={commuavg_value} readOnly />
                  &nbsp;&nbsp;&nbsp;&nbsp; 준비성&nbsp;
                  <Rating name="Ready" value={readyavg_value} readOnly />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ paddingTop: "50px" }}></div>
        <table style={tableStyle1} align="center">
          {localStorage.type !== "매니저" && localStorage.type !== "강사" && localStorage.type !== "일반" && localStorage.num != null && (
            <caption style={{ textAlign: "right", marginBottom: "10px" }}>
              <Link to="/addreview">
                <button style={buttonStyle}>
                  <i className="fas fa-pencil-alt"></i> 작성
              </button>
              </Link>
            </caption>
          )}
          <tbody>
            {this.state.reviewList.map((item, idx) => (
              <tr key={idx} style={trStyle}>
                <td
                  style={{
                    width: 200,
                    paddingTop: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  <img
                    src={url + item.member_profile}
                    alt=""
                    style={{
                      Width: 100,
                      height: 100,
                      maxWidth: 100,
                      border: "0px",
                      borderRadius: "50%",
                      marginBottom: "5px",
                    }}
                  />
                  <br />

                  <span>{item.review_member_name}</span>
                </td>
                <td style={{ width: 1000, textAlign: "left" }}>
                  <span>{item.review_process}</span>
                  <br />
                  <span style={{ fontSize: "20px" }}>
                    {item.review_subject}
                  </span>
                  <br />
                  <span>
                    <pre style={{ fontWeight: "bold" }}>
                      {item.review_content}
                    </pre>
                  </span>
                  <br />
                  <span>
                    커리큘럼&nbsp;
                    <Rating name="Curri" value={item.review_plans} readOnly />
                    &nbsp;&nbsp;&nbsp;&nbsp; 전달력&nbsp;
                    <Rating name="Commu" value={item.review_commu} readOnly />
                    &nbsp;&nbsp;&nbsp;&nbsp; 준비성&nbsp;
                    <Rating name="Ready" value={item.review_ready} readOnly />
                  </span>
                  <br />
                  <span style={{ color: "#BDBDBD" }}>
                    {item.review_writeday}
                  </span>
                  <span style={{ float: "right" }}>
                    {localStorage.name === item.review_member_name && (
                      <Link
                        to={{
                          pathname: "/updatereview",
                          state: { reviewList: item },
                        }}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <span style={{ fontSize: "18px" }}>
                          <i className="fas fa-pencil-alt"></i>
                        </span>
                      </Link>
                    )}

                    {localStorage.name === item.review_member_name && (
                      <span
                        onClick={this.onDelete.bind(this, item.review_num)}
                        style={{ fontSize: "18px" }}
                      >
                        &nbsp;&nbsp;<i className="far fa-trash-alt"></i>
                      </span>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ paddingBottom: "100px" }}></div>
      </div>
    );
  }
}
export default withStyles(styles)(ReviewList);
