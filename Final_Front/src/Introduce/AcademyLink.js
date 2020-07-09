import React from "react";
import back from "./back.jpg";
import "./AcademyLink.scss";

const backimage = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${back})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const AcademyLink = () => {
  return (
    <div style={{ textAlign: "center", height: "100%" }}>
      <div style={backimage}>
        <span id="academylinktit">IT Campus</span>
        <br />
        <br />
        <span style={{ fontSize: "20px" }}>
          변화의 디지털 시대에 맞는 <br />
          <span style={{ color: "#2253B8" }}>고객의 최고의 파트너</span>가
          되고자 힘을 모았습니다.
        </span>
        <br />
        <br />
        <span style={{ fontSize: "18px", color: "#8C8C8C" }}>
          과거 ICT기술은 냉대,열대,아열대처럼 그 변화의 주기 및 속도가 우리의
          빠른 대응을 이끌어 내기에는 부족했습니다.
          <br />
          이제는 4계절이 분명한 기후 속에서 우리의 의식주가 바뀌듯이 모든 기업과
          개발자들이 가속화 되는 변화에서 살아남기 위해
          <br />
          새로운 것에 빨리 익숙해지고 미리 준비하고 대응해 나가야 합니다.
        </span>
      </div>
    </div>
  );
};

export default AcademyLink;
