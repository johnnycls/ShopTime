import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { RootState, useAppDispatch } from "../app/store";
import { ADMIN_TX_LANG, LANG } from "../lang";
import { useDispatch, useSelector } from "react-redux";
import {
  checkToken,
  getTokenFromLocalStorage,
  logout,
} from "../slices/shopSlice";
import { API_URL } from "../config";
import { getProductsByShop } from "../slices/productsSlice";
import No_Image_Available from "../assets/imgs/No_Image_Available.jpg";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { changeLang } from "../slices/preferencesSlice";

export default function AdminMenuBar({ shopName }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const isSignedIn = useSelector((state: RootState) => state.shop.isSignedIn);
  const hasLoaded = useSelector((state: RootState) => state.shop.hasLoaded);
  const isLoading = useSelector((state: RootState) => state.shop.isLoading);
  const token = useSelector((state: RootState) => state.shop.token);
  const shop = useSelector((state: RootState) => state.shop.shop);

  React.useEffect(() => {
    !isSignedIn && dispatch(getTokenFromLocalStorage());
  }, [isSignedIn]);

  React.useEffect(() => {
    if (!token) {
      navigate(`/${shopName}/admin/login`, { replace: true });
    } else if (!isSignedIn) {
      dispatch(checkToken({}));
    }
  }, [token]);

  React.useEffect(() => {
    if (!isSignedIn && hasLoaded) {
      navigate(`/${shopName}/admin/login`, { replace: true });
    } else {
      dispatch(getProductsByShop({ shopName }));
    }
  }, [isSignedIn, hasLoaded]);

  return (
    <Menubar
      model={[]}
      start={
        <div className="w-full flex items-center gap-2">
          <Link to={`/${shopName}/admin`}>
            <img
              alt="logo"
              src={shop.logo ? `${API_URL}${shop.logo}` : No_Image_Available}
              className="mr-2 h-8"
            />
          </Link>
          <Link to={`/${shopName}/admin/tx`}>
            <Button label={ADMIN_TX_LANG[0][lang]} className="p-0" />
          </Link>
          <Link to={`/${shopName}/admin/products`}>
            <Button label={ADMIN_TX_LANG[1][lang]} className="p-0" />
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
          <Link to={`/${shopName}/admin/login`}>
            <Button
              label={ADMIN_TX_LANG[2][lang]}
              className="p-0"
              onClick={() => dispatch(logout())}
            />
          </Link>
        </div>
      }
    />
  );
}
