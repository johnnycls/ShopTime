import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { RootState } from "../app/store";
import { GENERAL_HOME_LANG } from "../lang";
import { useSelector } from "react-redux";

export default function BottomNav() {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <div className="bg-[#ffc84c] flex p-5 flex-wrap justify-between gap-2 w-full">
      <div className="flex flex-col">
        <div className="font-bold underline">{GENERAL_HOME_LANG[3][lang]}</div>
        <Link to={"/createeshop"}>
          <Button label={GENERAL_HOME_LANG[1][lang]} className="p-0" />
        </Link>
        <Link to={"/userguide"}>
          <Button label={GENERAL_HOME_LANG[83][lang]} className="p-0" />
        </Link>
        <Link to={"/faq"}>
          <Button label={GENERAL_HOME_LANG[4][lang]} className="p-0" />
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="font-bold underline">{GENERAL_HOME_LANG[5][lang]}</div>
        <Link to={"/termsofservice"}>
          <Button label={GENERAL_HOME_LANG[6][lang]} className="p-0" />
        </Link>
        <Link to={"/privacypolicies"}>
          <Button label={GENERAL_HOME_LANG[7][lang]} className="p-0" />
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="font-bold underline">{GENERAL_HOME_LANG[0][lang]}</div>

        <Link to={"/"}>
          <Button label={GENERAL_HOME_LANG[84][lang]} className="p-0" />
        </Link>
        <Link to={"/aboutus"}>
          <Button label={GENERAL_HOME_LANG[9][lang]} className="p-0" />
        </Link>
        <Link to={"/contactus"}>
          <Button label={GENERAL_HOME_LANG[2][lang]} className="p-0" />
        </Link>
        <a href={"https://www.instagram.com/shoptimebusiness/"}>
          <Button
            icon="pi pi-instagram"
            className="p-0"
            badge=" "
            badgeClassName="p-badge-secondary"
          />
        </a>
      </div>
    </div>
  );
}
