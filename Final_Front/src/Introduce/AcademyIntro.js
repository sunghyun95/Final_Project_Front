import React, { Component } from "react";
import { Link } from "react-router-dom";
import IntroduceMenu from "../Introduce/IntroduceMenu";
import "./AcademyIntro.scss";
import Map from "./AcademyMap";
import Facility from "./AcademyFacility";
import AcademyLink from "./AcademyLink";

class AcademyIntro extends Component {
  render() {
    return (
      <div id="academyintro" style={{ width: "100%" }}>
        <IntroduceMenu />

        <div id="academyintroback" style={{ width: "100%" }}>
          <div id="academyintrobox" style={{ width: "100%" }}>
            <AcademyLink></AcademyLink>
          </div>
          <div id="academyintrobox2">
            <div>
              <Facility></Facility>
            </div>
          </div>
          <div id="academyintrobox3">
            <Map></Map>
          </div>
        </div>
      </div>
    );
  }
}
export default AcademyIntro;
