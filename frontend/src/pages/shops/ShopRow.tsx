import React from "react";
import { API_URL, SHOP_CATEGORIES, Shop } from "../../config";
import { Link } from "react-router-dom";
import No_Image_Available from "../../assets/imgs/No_Image_Available.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function ShopRow(shop: Shop) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <Link to={`/${shop.shopName}`}>
      <div className="flex py-2 gap-2 sm:gap-3 w-screen">
        <img
          className="shadow-2 border-round w-[25%] sm:w-[12%] h-auto"
          src={`${API_URL}${shop.logo}` || No_Image_Available}
          alt={`Image of ${shop.shopName}`}
        />
        <div className="flex flex-column align-items-start w-[65%] sm:w-[84%]">
          <div className="text-xl font-semibold truncate w-full">
            {shop.displayName}
          </div>
          <div className="truncate w-full">{shop.description}</div>
          <div>
            <i className="pi pi-tag mr-1"></i>
            <span className="truncate">
              {shop.categories
                .map((category) => SHOP_CATEGORIES[category][lang])
                .join(", ")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
