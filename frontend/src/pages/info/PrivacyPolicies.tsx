import React from "react";
import { GENERAL_HOME_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ShopsMenuBar from "../../components/ShopsMenuBar";
import { Card } from "primereact/card";
import BottomNav from "../../components/BottomNav";

export default function PrivacyPolicies({}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <div>
      <ShopsMenuBar />

      <div className="p-3">
        <Card title={GENERAL_HOME_LANG[7][lang]}>
          <p className="mb-4">{GENERAL_HOME_LANG[30][lang]}</p>
          <h2 className="font-bold text-lg">{GENERAL_HOME_LANG[31][lang]}</h2>
          <p className="mb-4">{GENERAL_HOME_LANG[32][lang]}</p>
          <h2 className="font-bold text-lg">{GENERAL_HOME_LANG[33][lang]}</h2>
          <p className="mb-2">{GENERAL_HOME_LANG[34][lang]}</p>
          <p className="mb-2">{GENERAL_HOME_LANG[35][lang]}</p>
          <p className="mb-2">{GENERAL_HOME_LANG[36][lang]}</p>
          <p className="mb-4">{GENERAL_HOME_LANG[37][lang]}</p>
          <h2 className="font-bold text-lg">{GENERAL_HOME_LANG[38][lang]}</h2>
          <p className="mb-2">{GENERAL_HOME_LANG[39][lang]}</p>
          <p className="mb-4">{GENERAL_HOME_LANG[40][lang]}</p>
          <h2 className="font-bold text-lg">{GENERAL_HOME_LANG[41][lang]}</h2>
          <p className="mb-4">{GENERAL_HOME_LANG[42][lang]}</p>
          <h2 className="font-bold text-lg">{GENERAL_HOME_LANG[43][lang]}</h2>
          <p>{GENERAL_HOME_LANG[44][lang]}</p>
          <p>{GENERAL_HOME_LANG[45][lang]}</p>
          <p>{GENERAL_HOME_LANG[46][lang]}</p>
          <p>{GENERAL_HOME_LANG[47][lang]}</p>
          <p>{GENERAL_HOME_LANG[48][lang]}</p>
          <p>{GENERAL_HOME_LANG[49][lang]}</p>
          <p>{GENERAL_HOME_LANG[50][lang]}</p>
          <p>{GENERAL_HOME_LANG[51][lang]}</p>
          <p className="mb-4">{GENERAL_HOME_LANG[52][lang]}</p>
          <h2 className="font-bold text-lg">{GENERAL_HOME_LANG[53][lang]}</h2>
          <p className="mb-4">{GENERAL_HOME_LANG[54][lang]}</p>
          <h2 className="font-bold text-lg">{GENERAL_HOME_LANG[55][lang]}</h2>
          <p className="mb-4">{GENERAL_HOME_LANG[56][lang]}</p>
          <h2 className="font-bold text-lg">{GENERAL_HOME_LANG[57][lang]}</h2>
          <p>{GENERAL_HOME_LANG[58][lang]}</p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
