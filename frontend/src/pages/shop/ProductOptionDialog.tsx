import React from "react";
import { SHOP_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import OptionSelect from "./OptionSelect";
import { addToCart } from "../../slices/txSlice";
import { API_URL, Product } from "../../config";
import ProductImages from "./ProductImages";

export default function ProductOptionDialog(
  selectingProduct: Product | null,
  visible,
  quantity,
  setQuantity,
  memo,
  selectedOptions: { _id: string; label: string; price: number }[][],
  setVisible,
  setSelectedOptions,
  setMemo,
  shopName
) {
  const dispatch = useAppDispatch();
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <Dialog
      header={selectingProduct?.name}
      visible={visible}
      onHide={() => setVisible(false)}
      footer={
        <>
          {selectingProduct?.inventory < quantity && (
            <div className="text-left text-red-600">{SHOP_LANG[14][lang]}</div>
          )}
          <div className="w-full pt-3 flex flex-col gap-2 items-center sm:flex-row sm:justify-between ">
            <InputNumber
              value={quantity}
              onValueChange={(e) => e.value && setQuantity(e.value)}
              showButtons
              buttonLayout="horizontal"
              step={1}
              className="w-full"
              inputClassName="w-full"
              decrementButtonClassName="p-button-danger m-0 p-2"
              incrementButtonClassName="p-button-success p-2"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              min={1}
            />

            <Button
              className="w-full"
              label={SHOP_LANG[3][lang]}
              icon="pi pi-check"
              onClick={() => {
                dispatch(
                  addToCart({
                    shopName,
                    items: {
                      productId: selectingProduct?._id,
                      quantity,
                      memo,
                      optionIds: selectedOptions
                        .map((option, index) => ({
                          [selectingProduct!.options[index]._id!]: option.map(
                            (opt) => opt._id
                          ),
                        }))
                        .reduce((prev, cur) => ({ ...prev, ...cur }), {}),
                      price:
                        ((selectingProduct!.priceAfterDiscount === -1
                          ? selectingProduct!.price
                          : selectingProduct!.priceAfterDiscount) +
                          selectedOptions.reduce(
                            (acc, cur) =>
                              cur.reduce((acc2, cur2) => cur2.price + acc2, 0) +
                              acc,
                            0
                          )) *
                        quantity,
                    },
                  })
                );
                setVisible(false);
              }}
              autoFocus
              disabled={
                selectingProduct === null ||
                !selectedOptions.reduce(
                  (prev, cur, index) =>
                    prev &&
                    cur.length >= selectingProduct.options[index].minSelect &&
                    cur.length <= selectingProduct.options[index].maxSelect,
                  true
                ) ||
                selectingProduct.inventory < quantity
              }
            />
          </div>
        </>
      }
      className="h-full w-4/5 overflow-auto"
    >
      {selectingProduct !== null && (
        <div className="w-full flex justify-center">
          <ProductImages
            images={selectingProduct.images.map((img) => API_URL + img)}
          />
        </div>
      )}

      <div className="text-sm mb-2 overflow-auto">
        {selectingProduct?.description}
      </div>

      <div className="flex flex-column w-full gap-2">
        {selectingProduct?.options.map((option, index) => (
          <OptionSelect
            key={option._id}
            option={option}
            selectedOptions={selectedOptions[index]}
            setSelectedOptions={(newValue) =>
              setSelectedOptions((prev) => [
                ...prev.slice(0, index),
                newValue,
                ...prev.slice(index + 1),
              ])
            }
          />
        ))}

        <div className="font-semibold truncate">{SHOP_LANG[4][lang]}</div>
        <InputTextarea
          autoResize
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={5}
          cols={30}
        />
      </div>
    </Dialog>
  );
}
