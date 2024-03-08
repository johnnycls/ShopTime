import React from "react";
import ShopsMenuBar from "../../components/ShopsMenuBar";
import BottomNav from "../../components/BottomNav";
import userGuide1 from "../../assets/imgs/userGuide/1.svg";
import userGuide2 from "../../assets/imgs/userGuide/2.svg";
import userGuide3 from "../../assets/imgs/userGuide/3.svg";
import userGuide4 from "../../assets/imgs/userGuide/4.svg";
import userGuide5 from "../../assets/imgs/userGuide/5.svg";
import userGuide6 from "../../assets/imgs/userGuide/6.svg";
import userGuide7 from "../../assets/imgs/userGuide/7.svg";
import userGuide8 from "../../assets/imgs/userGuide/8.svg";
import userGuide9 from "../../assets/imgs/userGuide/9.svg";
import userGuide10 from "../../assets/imgs/userGuide/10.svg";
import userGuide11 from "../../assets/imgs/userGuide/11.svg";

export default function UserGuide({}) {
  return (
    <div>
      <ShopsMenuBar />
      <img src={userGuide1} alt="" className="w-full h-auto" />
      <img src={userGuide2} alt="" className="w-full h-auto" />
      <img src={userGuide3} alt="" className="w-full h-auto" />
      <img src={userGuide4} alt="" className="w-full h-auto" />
      <img src={userGuide5} alt="" className="w-full h-auto" />
      <img src={userGuide6} alt="" className="w-full h-auto" />
      <img src={userGuide7} alt="" className="w-full h-auto" />
      <img src={userGuide8} alt="" className="w-full h-auto" />
      <img src={userGuide9} alt="" className="w-full h-auto" />
      <img src={userGuide10} alt="" className="w-full h-auto" />
      <img src={userGuide11} alt="" className="w-full h-auto" />
      <BottomNav />
    </div>
  );
}
