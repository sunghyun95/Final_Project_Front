import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Paper } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import img1 from "./member1.png";
import img2 from "./member2.png";
import Mypagelist from "../MyPage/mypagelist";

export default function MemberList_Form() {
  // 검색 필터 값 받는 변수
  const [member_type, setMember_type] = React.useState("");
  const [field, setField] = React.useState("member_type");

  //선택값에 따라 필터값 바뀌는 이벤트
  const handleChange = (event) => {
    setField(event.target.value);
    console.log(event.target.value);
  };

  // 검색어 값 받는 변수
  const [search, setSearch] = React.useState("");

  //입력할때마다 검색어 바뀌는 이벤트
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  //멤버 목록 담는 변수
  let memberList = [];

  //멤버 목록 출력시 담는 변수
  const [asd, setAsd] = React.useState([]);

  //전체 목록 출력
  const list = () => {
    let url = "http://localhost:8000/project/member/memberlist";
    axios
      .get(url)
      .then((res) => {
        memberList = res.data;

        setAsd(memberList);

        console.log(memberList);
      })
      .catch((err) => {
        console.log("list 에러:" + err);
      });
  };
  //검색 멤버 출력
  const searchMember = () => {
    let url =
      "http://localhost:8000/project/member/memberlist?field=" +
      field +
      "&search=" +
      search;
    axios
      .get(url)
      .then((res) => {
        memberList = res.data;

        setAsd(memberList);
        console.log(memberList);
      })
      .catch((err) => {
        console.log("search 에러:" + err);
      });
  };
  //멤버 삭제

  const onBoardDelete = (member_num) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "회원과 관련된 정보가 모두 삭제됩니다",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.value) {
        let url =
          "http://localhost:8000/project/member/memberdelete?member_num=" +
          member_num;
        axios
          .delete(url)
          .then((res) => {
            list();
          })
          .catch((err) => {
            console.log(member_num);
            console.log("삭제 오류:" + err);
          });
      }
    });
  };
  const trash = (item) => {
    if (item.member_name !== "매니저") {
      return select(item);
    }
  };

  const onMemberUpdate = (member_num) => {
    let url = "http://localhost:8000/project/member/memberlistupdate";
    const data = new FormData();
    data.append("member_num", member_num);
    data.append("member_type", member_type);
    axios.post(url, data)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: '변경 완료',
          text: '회원 유형의 변경이 완료되었습니다',
        }).then((result) => {
          list();
        })

      })
      .catch((err) => {
        console.log(member_num);
        console.log("수정 오류:" + err);
      });
  };

  const update = (item) => (
    <span onClick={onMemberUpdate.bind(this, item.member_num)}
      style={{ cursor: "pointer" }}>
      <i className="fa fa-pencil fa-fw" style={{ fontSize: "20px" }} />
    </span>
  )

  const changeTypeHandler = (e) => {
    setMember_type(e.target.value);
    console.log(e.target.value);
  }


  const select = (item) => (
    <span
      onClick={onBoardDelete.bind(this, item.member_num)}
      style={{ cursor: "pointer" }}
    >
      <i className="far fa-trash-alt" style={{ fontSize: "20px" }} />
    </span>
  );
  const tableStyle = {
    textAlign: "center",
    fontSize: "16px",
    width: "1250px",
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
  }

  const searchStyle1 = {
    fontSize: "16px",
    textAlign: "center",
    backgroundColor: "white",
    width: "100px",
    height: "40px",
    cursor: "pointer",
    border: "1px solid gray",
  };
  const searchStyle2 = {
    fontSize: "16px",
    textAlign: "left",
    backgroundColor: "white",
    width: "400px",
    height: "37px",
    cursor: "pointer",
    border: "1px solid gray",
  };
  const searchStyle3 = {
    fontSize: "16px",
    textAlign: "left",
    backgroundColor: "white",
    width: "100px",
    height: "37px",
    cursor: "pointer",
    border: "1px solid gray",
  };

  //라이프싸이클
  useEffect(() => {
    list();
  }, []);
  return (
    <div style={{ textAlign: "center" }} align="center">
      <Mypagelist />
      <div style={{ paddingTop: "100px" }}></div>
      <span style={{ fontSize: "40px" }}>회원 목록</span>
      <div style={{ paddingTop: "200px" }}></div>
      {/* 검색 유형 선택 창 */}
      <div align="center">
        <span>
          <select value={field} onChange={handleChange} style={searchStyle1}>
            <option value="member_type">구분</option>
            <option value="member_name">이름</option>
            <option value="member_phone">핸드폰</option>
            <option value="member_email">이메일</option>
            <option value="member_address">주소</option>
          </select>
        </span>
        &nbsp;&nbsp;
        {/* 검색어 입력 창 */}
        <input
          type="text"
          required="required"
          placeholder="검색어를 입력하세요."
          onChange={handleSearch}
          value={search}
          style={searchStyle2}
        />
        &nbsp;&nbsp;
        <button type="button" style={searchStyle3} onClick={searchMember}>
          <i className="fas fa-search"></i>
          &nbsp;&nbsp; 검색
        </button>
      </div>
      <div style={{ paddingTop: "50px" }}></div>
      {/* 테이블 반복 출력 부분 */}

      <div align="center">
        <table style={tableStyle}>
          <thead>
            <tr style={trStyle}>
              <td style={{ textAlign: "center", width: 150 }}>구분</td>
              <td style={{ textAlign: "center", width: 100 }}>이름</td>
              <td style={{ textAlign: "center", width: 150 }}>핸드폰</td>
              <td style={{ textAlign: "center", width: 200 }}>이메일</td>
              <td style={{ textAlign: "center", width: 550 }}>주소</td>
              <td style={{ textAlign: "center", width: 100 }}>비고</td>
            </tr>
          </thead>
          <tbody>
            {asd.map((item, idx) => (
              <tr style={trStyle}>
                <td>
                  {item.member_type === "일반" && (
                    <select name="typechange" onChange={changeTypeHandler}>
                      <option>{item.member_type}</option>
                      <option value="매니저">매니저</option>
                      <option value="강사">강사</option>
                    </select>
                  )}
                  {item.member_type === "매니저" && (
                    <select name="typechange" onChange={changeTypeHandler}>
                      <option>{item.member_type}</option>
                      <option value="매니저">매니저</option>
                      <option value="강사">강사</option>
                    </select>
                  )}
                  {item.member_type === "강사" && (
                    <select name="typechange" onChange={changeTypeHandler}>
                      <option>{item.member_type}</option>
                      <option value="매니저">매니저</option>
                      <option value="강사">강사</option>
                    </select>
                  )}
                </td>
                <td>{item.member_name}</td>
                <td>{item.member_phone}</td>
                <td>{item.member_email}</td>
                <td style={{ textAlign: "left" }}>{item.member_address + " " + item.member_detailaddr}</td>
                <td>{update(item)}&nbsp;&nbsp;{trash(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ paddingBottom: "100px" }}></div>
    </div>
  );
}
