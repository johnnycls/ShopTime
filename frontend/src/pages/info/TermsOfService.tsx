import React from "react";
import { GENERAL_HOME_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ShopsMenuBar from "../../components/ShopsMenuBar";
import { Card } from "primereact/card";
import BottomNav from "../../components/BottomNav";

export default function TermsOfService({}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <div>
      <ShopsMenuBar />

      <div className="p-3">
        <Card title={GENERAL_HOME_LANG[6][lang]}></Card>

        <Card title={GENERAL_HOME_LANG[8][lang]} className="mt-2">
          <p className="mb-2">{GENERAL_HOME_LANG[25][lang]}</p>
          <p className="mb-2">{GENERAL_HOME_LANG[26][lang]}</p>
          <p className="mb-2">{GENERAL_HOME_LANG[27][lang]}</p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
