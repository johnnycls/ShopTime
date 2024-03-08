import React from "react";
import { GENERAL_HOME_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ShopsMenuBar from "../../components/ShopsMenuBar";
import { Card } from "primereact/card";
import BottomNav from "../../components/BottomNav";
import { Link } from "react-router-dom";
import img1 from "../../assets/imgs/createMyShop/1.png";
import img2 from "../../assets/imgs/createMyShop/2.png";
import img3 from "../../assets/imgs/createMyShop/3.png";
import img4 from "../../assets/imgs/createMyShop/4.png";
import img5 from "../../assets/imgs/createMyShop/5.png";

export default function CreateEShop({}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <div>
      <ShopsMenuBar />

      <img alt="create my e shop" src={img1} className="w-full h-auto" />

      <div className="flex flex-row flex-wrap">
        <a
          href="https://forms.gle/ADXEpHzbR1NBk1QYA"
          className="w-1/2 sm:w-1/4"
        >
          <img alt="" src={img2} className="w-full h-auto" />
        </a>
        <Link to={`/userguide`} className="w-1/2 sm:w-1/4">
          <img alt="" src={img3} className="w-full h-auto" />
        </Link>
        <img alt="" src={img4} className="w-1/2 sm:w-1/4 h-auto" />
        <img alt="" src={img5} className="w-1/2 sm:w-1/4 h-auto" />
      </div>

      <BottomNav />
    </div>
  );
}
