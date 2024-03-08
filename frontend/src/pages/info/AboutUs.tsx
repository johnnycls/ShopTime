import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ShopsMenuBar from "../../components/ShopsMenuBar";
import BottomNav from "../../components/BottomNav";
import HomePage from "../../assets/imgs/HomePage.svg";
import HomePage2 from "../../assets/imgs/HomePage2.svg";
import HomePage3 from "../../assets/imgs/HomePage3.svg";
import HomePage4 from "../../assets/imgs/HomePage4.svg";
import HomePage5 from "../../assets/imgs/HomePage5.svg";
import HomePage6 from "../../assets/imgs/HomePage6.png";

export default function AboutUs({}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <div>
      <ShopsMenuBar />

      <div>
        <img alt="homepage" src={HomePage} className="w-full h-auto" />
        <img alt="homepage" src={HomePage2} className="w-full h-auto" />
        <img alt="homepage" src={HomePage3} className="w-full h-auto" />
        <img alt="homepage" src={HomePage4} className="w-full h-auto" />
        <img alt="homepage" src={HomePage5} className="w-full h-auto" />
        <a href="https://forms.gle/ADXEpHzbR1NBk1QYA">
          <img alt="homepage" src={HomePage6} className="w-full h-auto" />
        </a>
      </div>

      <BottomNav />
    </div>
  );
}
