import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { RootState, useAppDispatch } from "../app/store";
import { LANG, GENERAL_HOME_LANG } from "../lang";
import { useSelector } from "react-redux";
import No_Image_Available from "../assets/imgs/No_Image_Available.jpg";
import Logo_Rect from "../assets/imgs/Logo_Rect.png";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { changeLang } from "../slices/preferencesSlice";

export default function ShopsMenuBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <Menubar
      model={[]}
      start={
        <div className="w-full flex items-center gap-2">
          <Link to={"/"}>
            <img alt="logo" src={Logo_Rect} className="mr-2 h-8" />
          </Link>
          <Link to={"/aboutus"}>
            <Button label={GENERAL_HOME_LANG[0][lang]} className="p-0" />
          </Link>
          <Link to={"/createeshop"}>
            <Button label={GENERAL_HOME_LANG[1][lang]} className="p-0" />
          </Link>
          <Link to={"/contactus"}>
            <Button label={GENERAL_HOME_LANG[2][lang]} className="p-0" />
          </Link>
        </div>
      }
      end={
        <div className="flex items-center">
          <Dropdown
            value={lang}
            onChange={(e) => dispatch(changeLang({ lang: e.value }))}
            options={LANG}
            optionLabel="name"
            className="m-0 p-0 mr-2"
          />
        </div>
      }
    />
  );
}
