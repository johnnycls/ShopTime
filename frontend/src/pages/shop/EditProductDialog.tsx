import React, { useEffect, useState } from "react";
import { ADMIN_PRODUCTS_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Dialog } from "primereact/dialog";
import { API_URL, Option, Product, ProductCategory, Shop } from "../../config";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Button } from "primereact/button";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { SelectButton } from "primereact/selectbutton";
import MultipleImageUpload from "./MultipleImageUpload";
import ProductImages from "./ProductImages";
import { createProduct, updateProduct } from "../../slices/productsSlice";
import NewOption from "./NewOption";
import SettingOption from "./SettingOption";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

export default function EditProductDialog({
  visible,
  onHide,
  product,
  shop,
}: {
  visible: boolean;
  onHide: () => void;
  product: Product | null;
  shop: Shop;
}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(product?.name || "");
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [price, setPrice] = useState<number | null>(product?.price || null);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number>(
    product?.priceAfterDiscount || -1
  );
  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >(
    product?.categories.map(
      (catId) => shop.productCategories.find((cat) => cat._id === catId)!
    ) || []
  );
  const statusOptions: string[] = [
    ADMIN_PRODUCTS_LANG[0][lang],
    ADMIN_PRODUCTS_LANG[1][lang],
    ADMIN_PRODUCTS_LANG[2][lang],
  ];
  const [status, setStatus] = useState<string>(
    statusOptions[product?.status || 0]
  );
  const [addedImages, setAddedImages] = useState<File[]>([]);
  const [options, setOptions] = useState<Option[]>(product?.options || []);
  const [inventory, setInventory] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setPriceAfterDiscount(product.priceAfterDiscount);
      setSelectedCategories(
        product.categories.map(
          (catId) => shop.productCategories.find((cat) => cat._id === catId)!
        )
      );
      setStatus(statusOptions[product.status || 0]);
      setOptions(product.options);
      setInventory(product.inventory);
    } else {
      setName("");
      setDescription("");
      setPrice(null);
      setPriceAfterDiscount(-1);
      setSelectedCategories([]);
      setStatus(statusOptions[0]);
      setOptions([]);
      setInventory(0);
    }
  }, [product]);

  return (
    <Dialog
      visible={visible}
      onHide={() => {
        onHide();
        setName("");
        setDescription("");
        setPrice(null);
        setPriceAfterDiscount(-1);
        setSelectedCategories([]);
        setStatus(statusOptions[0]);
        setOptions([]);
        setInventory(0);
      }}
      className="w-[90%]"
      header={
        product ? ADMIN_PRODUCTS_LANG[8][lang] : ADMIN_PRODUCTS_LANG[20][lang]
      }
    >
      <InputText
        placeholder={ADMIN_PRODUCTS_LANG[23][lang]}
        className="w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {product && product.images.length > 0 && (
        <div className="mt-2">
          <ProductImages images={product.images.map((img) => API_URL + img)} />
        </div>
      )}
      <div className="mt-2">
        <MultipleImageUpload
          setAddedImages={setAddedImages}
          emptyText={
            product === null
              ? ADMIN_PRODUCTS_LANG[13][lang]
              : ADMIN_PRODUCTS_LANG[25][lang]
          }
        />
      </div>

      <InputTextarea
        placeholder={ADMIN_PRODUCTS_LANG[9][lang]}
        className="w-full mt-1"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <MultiSelect
        value={selectedCategories}
        onChange={(e: MultiSelectChangeEvent) => {
          setSelectedCategories(e.value);
        }}
        options={shop.productCategories}
        optionLabel="name"
        display="chip"
        placeholder={ADMIN_PRODUCTS_LANG[11][lang]}
        className="w-full mb-1"
      />

      <InputNumber
        mode="currency"
        currency={shop.currency}
        placeholder={ADMIN_PRODUCTS_LANG[10][lang]}
        className="w-full"
        value={price}
        onValueChange={(e) => setPrice(e.value || 0)}
        min={0}
      />

      <div className="flex gap-1 items-center mt-1">
        <label>{ADMIN_PRODUCTS_LANG[29][lang]}</label>
        <InputSwitch
          checked={priceAfterDiscount !== -1}
          onChange={(e: InputSwitchChangeEvent) =>
            setPriceAfterDiscount(e.value ? 0 : -1)
          }
        />
      </div>

      {priceAfterDiscount !== -1 && (
        <>
          <label>{ADMIN_PRODUCTS_LANG[28][lang]}</label>
          <InputNumber
            mode="currency"
            currency={shop.currency}
            placeholder={ADMIN_PRODUCTS_LANG[28][lang]}
            className="w-full"
            value={priceAfterDiscount}
            onValueChange={(e) => setPriceAfterDiscount(e.value || -1)}
            min={-1}
          />
        </>
      )}

      <Card className="mt-2" title="選項">
        <div className="flex flex-col gap-1">
          <Accordion multiple className="w-full">
            {options.map((option, index) => (
              <AccordionTab
                header={
                  <div className="w-full flex justify-between items-center">
                    <span>{option.name}</span>
                    <Button
                      text
                      icon="pi pi-trash"
                      className="m-0 p-0"
                      onClick={() => {
                        setOptions((prev) => [
                          ...prev.slice(0, index),
                          ...prev.slice(index + 1),
                        ]);
                      }}
                    />
                  </div>
                }
                key={index}
              >
                <SettingOption
                  option={option}
                  setOptions={setOptions}
                  options={options}
                  index={index}
                />
              </AccordionTab>
            ))}
            <AccordionTab header={ADMIN_PRODUCTS_LANG[14][lang]}>
              <NewOption setOptions={setOptions} />
            </AccordionTab>
          </Accordion>
        </div>
      </Card>

      <SelectButton
        value={status}
        onChange={(e) => setStatus(e.value)}
        options={statusOptions}
        className="mt-1"
      />

      <div className="mt-1">
        <label>{ADMIN_PRODUCTS_LANG[30][lang]}</label>
        <InputNumber
          placeholder={ADMIN_PRODUCTS_LANG[30][lang]}
          className="w-full"
          value={inventory}
          onValueChange={(e) => setInventory(e.value || 0)}
        />
      </div>

      <div className="mt-2 flex justify-between sm:justify-end gap-1 w-full">
        <Button
          label={ADMIN_PRODUCTS_LANG[4][lang]}
          onClick={() => {
            if (product) {
              dispatch(
                updateProduct({
                  _id: product._id,
                  name,
                  images: addedImages,
                  description,
                  categories: selectedCategories.map((cat) => cat._id),
                  price,
                  priceAfterDiscount,
                  options,
                  status: statusOptions.indexOf(status),
                  inventory,
                })
              );
            } else {
              dispatch(
                createProduct({
                  name,
                  images: addedImages,
                  description,
                  categories: selectedCategories.map((cat) => cat._id),
                  price,
                  priceAfterDiscount,
                  options,
                  status: statusOptions.indexOf(status),
                  inventory,
                })
              );
            }
            onHide();
            setName("");
            setDescription("");
            setPrice(null);
            setPriceAfterDiscount(-1);
            setSelectedCategories([]);
            setStatus(statusOptions[0]);
            setOptions([]);
            setInventory(0);
          }}
        />
        <Button
          label={ADMIN_PRODUCTS_LANG[5][lang]}
          onClick={() => {
            onHide();
            setName("");
            setDescription("");
            setPrice(null);
            setPriceAfterDiscount(-1);
            setSelectedCategories([]);
            setStatus(statusOptions[0]);
            setOptions([]);
            setInventory(0);
          }}
        />
      </div>
    </Dialog>
  );
}
