import React from "react";
import "./AcademyFacility.scss";

const AcademyFacility = () => {
  return (
    <div id="academyfacil">
      <div id="academyfacilbox">
        {/* 이미지 */}
        <img src={require("../image/hand.jpg")} id="academyfacilbackimg"></img>

        {/* 백  */}
        <div id="academyfacilback"></div>

        {/* 텍스트 박스 */}
        <div id="academyfacilnav">
          <div id="academyfaciltit">IT Campus Of</div>
          <div className="academyfacilsub">
            내가 하는 일에 대한 기여와 보상으로 내일을 꿈꾸며
          </div>
          <div className="academyfacilsub">
            직원 모두가 보람과 가치를 찾을 수 있는 행복한 회사를 함께 만들고
            있습니다.
          </div>

          {/* 이미지 박스 */}

          <div id="academyfacilbgbox">
            {/* 1번 박스 */}
            <div id="academyfacilnav2" style={{ marginRight: "5px" }}>
              <div id="academyfacilimgbox">
                <div
                  className="academyfacilsubbox"
                  style={{ marginRight: "5px" }}
                >
                  <img
                    src={require("./img/bbild.jpg")}
                    className="academyfacilimgs"
                  ></img>
                </div>
                <div
                  className="academyfacilsubbox"
                  style={{ marginRight: "5px" }}
                >
                  <img
                    src={require("./img/bbild4.jpg")}
                    className="academyfacilimgs"
                  ></img>
                </div>
                <div className="academyfacilsubbox">
                  <img
                    src={require("./img/bbild12.jpg")}
                    className="academyfacilimgs"
                  ></img>
                </div>
              </div>
              <div id="academyfacilimgbox2">
                <div
                  className="academyfacilsubboxbg"
                  style={{ marginRight: "5px" }}
                >
                  <img
                    src={require("./img/bbild11.jpg")}
                    className="academyfacilimgs"
                  ></img>
                </div>
                <div className="academyfacilimgboxsub">
                  <div
                    className="academyfacilimgboxsubimg"
                    style={{ marginBottom: "5px" }}
                  >
                    <img
                      src={require("./img/bbild3.jpg")}
                      className="academyfacilimgs"
                    ></img>
                  </div>
                  <div className="academyfacilimgboxsubimg">
                    <img
                      src={require("./img/bbild5.jpg")}
                      className="academyfacilimgs"
                    ></img>
                  </div>
                </div>
              </div>
            </div>

            {/* 2번 박스 */}
            <div id="academyfacilnav2" style={{ marginRight: "5px" }}>
              <div id="academyfacilimgbox">
                <div
                  className="academyfacilsubbox"
                  style={{ marginRight: "5px" }}
                >
                  <img
                    src={require("./img/bbild6.jpg")}
                    className="academyfacilimgs"
                  ></img>
                </div>
                <div
                  className="academyfacilsubbox"
                  style={{ marginRight: "5px" }}
                >
                  <img
                    src={require("./img/bbild7.jpg")}
                    className="academyfacilimgs"
                  ></img>
                </div>
                <div className="academyfacilsubbox">
                  <img
                    src={require("./img/bbild12.jpg")}
                    className="academyfacilimgs"
                  ></img>
                </div>
              </div>
              <div id="academyfacilimgbox2">
                <div
                  className="academyfacilsubboxbg"
                  style={{ marginRight: "5px" }}
                >
                  <img
                    src={require("./img/bbild10.jpg")}
                    className="academyfacilimgs"
                  ></img>
                </div>
                <div className="academyfacilimgboxsub">
                  <div
                    className="academyfacilimgboxsubimg"
                    style={{ marginBottom: "5px" }}
                  >
                    <img
                      src={require("./img/bbild9.jpg")}
                      className="academyfacilimgs"
                    ></img>
                  </div>
                  <div className="academyfacilimgboxsubimg">
                    <img
                      src={require("./img/bbild8.jpg")}
                      className="academyfacilimgs"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 여기가 박스 끝 */}
        </div>
      </div>
    </div>
  );
};

export default AcademyFacility;
