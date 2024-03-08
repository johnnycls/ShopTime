import React from "react";
import { GENERAL_HOME_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ShopsMenuBar from "../../components/ShopsMenuBar";
import { Card } from "primereact/card";
import BottomNav from "../../components/BottomNav";

export default function ContactUs({}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <div>
      <ShopsMenuBar />

      <div className="p-3">
        <Card title={GENERAL_HOME_LANG[2][lang]}>
          <h2 className="text-lg">{GENERAL_HOME_LANG[28][lang]}</h2>
          <a href={"https://www.instagram.com/shoptimebusiness/"}>
            <h2 className="text-lg">{GENERAL_HOME_LANG[29][lang]}</h2>
          </a>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
