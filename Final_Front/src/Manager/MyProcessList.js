import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default class MyProcessList extends Component {
  state = {
    processdata: [],
  };

  list() {
    let url =
      "http://localhost:8000/project/process/managerlist?member_num=" +
      localStorage.num;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          processdata: res.data,
        });

        console.log(this.state.processdata);
      })
      .catch((err) => {
        console.log("담당 수강 과정 목록 불러오기 에러:" + err);
      });
  }

  componentWillMount() {
    this.list();
  }
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ align: "center" }} width="60%">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">과정명</TableCell>
                  <TableCell align="center">기간</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.processdata.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell align="center">{row.process_subject}</TableCell>
                    <TableCell align="center">
                      {row.process_startdate} - {row.process_enddate}
                    </TableCell>
                    <TableCell align="center">{row.process_status}</TableCell>
                    <TableCell align="center">
                      <NavLink exact to={"/AlertList/" + row.process_num}>
                        <button>알림</button>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
