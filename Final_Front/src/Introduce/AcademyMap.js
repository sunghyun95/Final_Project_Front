import React, { Component } from "react";
import "./AcademyMap.scss";

const { kakao } = window;

var { map } = window;

class AcademyMap extends Component {
  componentDidMount() {
    // 강남 본원 캠퍼스 지도
    const container = document.getElementById("academyMapImg"); //지도가 출력된 위치 설정
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.49878728932195, 127.03168719903918), //지도의 중심 좌표
      level: 4, //지도의 레밸( 확대 축소 정도)
    };
    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //마커 표시 위치 설정
    var coords = new kakao.maps.LatLng(37.49878728932195, 127.03168719903918);
    var marker = new kakao.maps.Marker({
      map: this.map,
      position: coords,
    });

    // 인포윈도우로 장소에 대한 설명을 표시합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: "<div id='academyMapMarker'>IT Campus 강남</div>",
    });

    infowindow.open(this.map, marker);
  }
  render() {
    return (
      <div id="academyMaplastback">
        <div id="academyMapback">
          <div id="academyMapback2"></div>
        </div>
        <div id="academyMap">
          {/* 1번 위치  */}
          <div id="academyMaptext">
            <span>
              오시는길 <span className="academyMapi">|</span>
            </span>{" "}
            강남 본원 캠퍼스
          </div>
          <div id="academyMapBox">
            <div id="academyMapImg">{/*여기에 지도 출력 자리 */}</div>
            <div id="academyMapImgtext">
              <div id="academyMapbox">
                <div id="academyMapsubbox">
                  <div className="academyMapsubNav">
                    <div className="academyMapsubNavTit">주소</div>
                    <div className="academyMapsubNavsub">
                      <span className="academyMapi">|</span> 서울특별시 강남구
                      테헤란로 124길 삼원타워 5층
                    </div>
                  </div>
                  <div className="academyMapsubNav">
                    <div className="academyMapsubNavTit">TEL</div>
                    <div className="academyMapsubNavsub">
                      <span className="academyMapi">|</span> 02-538-0958
                    </div>
                  </div>
                  <div className="academyMapsubNav">
                    <div className="academyMapsubNavTit">상담시간</div>
                    <div className="academyMapsubNavsub">
                      <span className="academyMapi">|</span> 평일 09:00~21:30
                      토요일 09:30~18:00
                    </div>
                  </div>
                  <div className="academyMapsubNav2">
                    <div id="academyMapsubstation">
                      <div className="academyMapsubNavTit">지하철역</div>
                      <div>
                        <div id="academyMapsubstation2">
                          <span className="academyMapi">|</span>{" "}
                          <span className="academyMapStationnum2">2</span>{" "}
                          2호선(강남,역삼)
                        </div>
                        <div id="academyMapsubstation3">
                          <span className="academyMapStationnumsin">
                            신분당선
                          </span>{" "}
                          신분당선(강남)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="academyMapsubNav">
                    <div className="academyMapsubNavTit">홈페이지</div>
                    <div className="academyMapsubNavsub">
                      <span className="academyMapi">|</span> www.itcampus.co.kr
                    </div>
                  </div>
                </div>
              </div>
              <div id="academyMapsubbox2">
                <img
                  src={require("../image/minimg.jpg")}
                  className="academyMapMinimg"
                ></img>
                <img
                  src={require("../image/minimg2.jpg")}
                  className="academyMapMinimg"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AcademyMap;
