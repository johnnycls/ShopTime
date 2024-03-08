import React, { useEffect, useState } from "react";
import { SUCCESS_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { useParams } from "react-router-dom";
import { Message } from "primereact/message";

export default function Success({}) {
  const { shopName } = useParams();
  const lang = useSelector((state: RootState) => state.preferences.lang);

  useEffect(() => {
    shopName && localStorage.removeItem(shopName + "CartItems");
  }, [shopName]);

  return (
    <div>
      <Message text={SUCCESS_LANG[0][lang]} className="w-full" />
    </div>
  );
}
