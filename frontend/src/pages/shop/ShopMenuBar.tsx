import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { getProductsByShop } from "../../slices/productsSlice";
import { getShop } from "../../slices/shopSlice";
import No_Image_Available from "../../assets/imgs/No_Image_Available.jpg";
import { API_URL } from "../../config";
import { Dropdown } from "primereact/dropdown";
import { LANG, SHOP_LANG } from "../../lang";
import { changeLang } from "../../slices/preferencesSlice";

export default function ShopMenuBar({ shopName }) {
  const dispatch = useAppDispatch();
  const shop = useSelector((state: RootState) => state.shop.shop);
  const tx = useSelector((state: RootState) => state.tx);
  const lang = useSelector((state: RootState) => state.preferences.lang);

  useEffect(() => {
    if (shopName !== undefined) {
      dispatch(getShop({ shopName }));
      dispatch(getProductsByShop({ shopName }));
    }
  }, [shopName]);

  return (
    <Menubar
      model={[]}
      start={
        <img
          alt="logo"
          src={shop.logo ? `${API_URL}${shop.logo}` : No_Image_Available}
          className="mr-2 h-10"
        />
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
          <Link to={`cart`}>
            <Button
              icon="pi pi-shopping-cart"
              className="p-0"
              badge={tx.items.length.toString()}
            />
          </Link>
        </div>
      }
    />
  );
}
