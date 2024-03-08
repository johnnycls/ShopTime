import React, { useEffect } from "react";
import { CART_LANG, LANG } from "../../lang";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Message } from "primereact/message";
import { Column } from "primereact/column";
import { changeQuantity, getCartFromLocalStorage } from "../../slices/txSlice";
import { getShop } from "../../slices/shopSlice";
import { getProductsByShop } from "../../slices/productsSlice";
import { Item, MIN_CHARGE } from "../../config";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import { changeLang } from "../../slices/preferencesSlice";
import BottomNav from "../../components/BottomNav";

export default function Cart() {
  const { shopName, isFail } = useParams();
  const dispatch = useAppDispatch();
  const shop = useSelector((state: RootState) => state.shop);
  const products = useSelector((state: RootState) => state.products.products);
  const isShopLoading = useSelector((state: RootState) => state.shop.isLoading);
  const isProductLoading = useSelector(
    (state: RootState) => state.products.isLoading
  );
  const tx = useSelector((state: RootState) => state.tx);
  const lang = useSelector((state: RootState) => state.preferences.lang);

  const quantityDict = tx.items.reduce((prev, cur) => {
    if (prev.hasOwnProperty(cur.productId))
      prev[cur.productId] = prev[cur.productId] + cur.quantity;
    else prev[cur.productId] = cur.quantity;
    return prev;
  }, {});
  const noInventory = Object.keys(quantityDict).reduce((prev, cur) => {
    const product = products.find((product) => product._id === cur);
    return product?.inventory < quantityDict[cur] || prev;
  }, false);

  useEffect(() => {
    if (shopName !== undefined) {
      dispatch(getCartFromLocalStorage({ shopName }));
      dispatch(getShop({ shopName }));
      dispatch(getProductsByShop({ shopName }));
    }
  }, [shopName]);

  const nameBodyTemplate = (item, { rowIndex }) => {
    return (
      <div className="flex items-center">
        <Button
          icon="pi pi-trash"
          text
          className="p-0"
          onClick={(e) => {
            dispatch(
              changeQuantity({ index: rowIndex, quantity: 0, shopName })
            );
          }}
        />
        {products.find((product) => product._id === item.productId)?.name}
      </div>
    );
  };

  const optionBodyTemplate = (item: Item) => {
    const product = products.find((product) => product._id === item.productId);
    return Object.entries(item.optionIds)
      .map(([optionId, optionIds]) =>
        optionIds
          .map(
            (optionId2) =>
              product?.options
                .find((opt) => opt._id === optionId)
                ?.options.find((opt) => opt._id === optionId2)?.label
          )
          .join(", ")
      )
      .filter((ids) => ids.length > 0)
      .join(", ");
  };

  const quantityBodyTemplate = (item, { rowIndex }) => {
    const product = products.find((product) => product._id === item.productId);

    return (
      <>
        <InputNumber
          value={item.quantity}
          onValueChange={(e: InputNumberValueChangeEvent) => {
            dispatch(
              changeQuantity({ index: rowIndex, quantity: e.value, shopName })
            );
          }}
          showButtons
          buttonLayout="horizontal"
          step={1}
          inputClassName="text-center"
          decrementButtonClassName="p-button-danger m-0 p-2"
          incrementButtonClassName="p-button-success m-0 p-2"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          min={1}
          size={1}
        />

        {product && product.inventory < quantityDict[item.productId] && (
          <span className="text-red-600">{CART_LANG[11][lang]}</span>
        )}
      </>
    );
  };

  const memoBodyTemplate = (item) => {
    return item.memo;
  };

  const priceBodyTemplate = (item) => {
    return (
      shop.shop.currency !== "" &&
      item.price.toLocaleString("en-US", {
        style: "currency",
        currency: shop.shop.currency,
      })
    );
  };

  const footer = () => {
    const originalTotal = tx.items.reduce((acc, cur) => acc + cur.price, 0);

    const percentageOff = shop.shop.discounts.reduce((prev, cur) => {
      if (originalTotal >= cur.min) {
        return Math.max(cur.percentageOff, prev);
      } else return prev;
    }, 0);

    const total =
      percentageOff > 0
        ? (originalTotal * (100 - percentageOff)) / 100
        : originalTotal;

    const priceString = (price) =>
      shop.shop.currency !== "" &&
      price.toLocaleString("en-US", {
        style: "currency",
        currency: shop.shop.currency,
      });

    return (
      <>
        <div className="text-right">
          <div>
            {percentageOff > 0 && (
              <div className="line-through">
                {`${CART_LANG[7][lang]} ${priceString(originalTotal)}`}
              </div>
            )}
            <div>{`${CART_LANG[7][lang]} ${priceString(total)}`}</div>
            {MIN_CHARGE[shop.shop.currency] &&
              total < MIN_CHARGE[shop.shop.currency].min &&
              `${CART_LANG[9][lang](
                priceString(MIN_CHARGE[shop.shop.currency].min),
                priceString(MIN_CHARGE[shop.shop.currency].surcharge)
              )} ${CART_LANG[7][lang]} ${priceString(
                total + MIN_CHARGE[shop.shop.currency].surcharge
              )}`}
          </div>

          {total < shop.shop.minCharge ? (
            <>
              <span>
                {CART_LANG[10][lang] +
                  shop.shop.minCharge.toLocaleString("en-US", {
                    style: "currency",
                    currency: shop.shop.currency,
                  })}
              </span>
            </>
          ) : (
            !noInventory && (
              <Link to={`/${shopName}/form`}>
                <Button label={CART_LANG[6][lang]} text className="p-0 mt-2" />
              </Link>
            )
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen">
      <Menubar
        model={[]}
        start={
          <Link to={`/${shopName}`}>
            <Button
              icon="pi pi-angle-left"
              label={CART_LANG[5][lang]}
              className="p-2"
            />
          </Link>
        }
        end={
          <Dropdown
            value={lang}
            onChange={(e) => dispatch(changeLang({ lang: e.value }))}
            options={LANG}
            optionLabel="name"
            className="m-0 p-0 mr-1"
          />
        }
      />

      {isFail && (
        <Message
          severity="error"
          text={CART_LANG[8][lang]}
          className="w-full"
        />
      )}

      {isProductLoading || isShopLoading ? (
        <ProgressSpinner />
      ) : (
        <DataTable value={tx.items} footer={footer} scrollable>
          <Column header={CART_LANG[0][lang]} body={nameBodyTemplate}></Column>
          <Column
            header={CART_LANG[1][lang]}
            body={optionBodyTemplate}
          ></Column>
          <Column
            header={CART_LANG[2][lang]}
            body={quantityBodyTemplate}
          ></Column>
          <Column header={CART_LANG[3][lang]} body={memoBodyTemplate}></Column>
          <Column header={CART_LANG[4][lang]} body={priceBodyTemplate}></Column>
        </DataTable>
      )}

      <BottomNav />
    </div>
  );
}
