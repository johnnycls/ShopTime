import React, { useState } from "react";
import { ADMIN_PRODUCTS_LANG } from "../../lang";
import { InputText } from "primereact/inputtext";
import {
  InputNumber,
  InputNumberChangeEvent,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Option } from "../../config";
import { Accordion, AccordionTab } from "primereact/accordion";

export default function NewOption({ setOptions }) {
  const [newOption, setNewOption] = useState<Option>({
    name: "",
    minSelect: null,
    maxSelect: null,
    options: [],
  });
  const [newOptionOption, setNewOptionOption] = useState<string>("");
  const [newOptionPrice, setNewOptionPrice] = useState<number | null>(null);
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const shop = useSelector((state: RootState) => state.shop.shop);

  return (
    <>
      <InputText
        className="w-full"
        value={newOption.name}
        onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
        placeholder={ADMIN_PRODUCTS_LANG[15][lang]}
      />

      <Accordion multiple className="w-full mt-2">
        {newOption.options.map((option, index) => (
          <AccordionTab
            key={index}
            header={
              <div className="w-full flex justify-between items-center">
                <span>{option.label}</span>
                <Button
                  icon="pi pi-trash"
                  text
                  className=""
                  onClick={() => {
                    setNewOption((prev) => ({
                      ...prev,
                      options: [
                        ...prev.options.slice(0, index),
                        ...prev.options.slice(index + 1),
                      ],
                    }));
                  }}
                />
              </div>
            }
          >
            <InputText
              className="w-full"
              value={newOption.options[index].label}
              onChange={(e) =>
                setNewOption({
                  ...newOption,
                  options: [
                    ...newOption.options.slice(0, index),
                    {
                      label: e.target.value,
                      price: newOption.options[index].price,
                      isHidden: newOption.options[index].isHidden,
                    },
                    ...newOption.options.slice(index + 1),
                  ],
                })
              }
              placeholder={ADMIN_PRODUCTS_LANG[14][lang]}
            />

            <InputNumber
              inputClassName="w-full"
              className="w-full"
              value={newOption.options[index].price}
              placeholder={ADMIN_PRODUCTS_LANG[21][lang]}
              mode="currency"
              currency={shop.currency || "HKD"}
              onValueChange={(e: InputNumberValueChangeEvent) => {
                if (e.target.value !== null && e.target.value !== undefined)
                  setNewOption((prev) => ({
                    ...prev,
                    options: [
                      ...prev.options.slice(0, index),
                      {
                        label: prev.options[index].label,
                        price: e.target.value,
                        isHidden: prev.options[index].isHidden,
                      },
                      ...prev.options.slice(index),
                    ],
                  }));
              }}
            />
          </AccordionTab>
        ))}

        <AccordionTab header={ADMIN_PRODUCTS_LANG[31][lang]}>
          <InputText
            className="w-full"
            value={newOptionOption}
            onChange={(e) => setNewOptionOption(e.target.value)}
            placeholder={ADMIN_PRODUCTS_LANG[31][lang]}
          />

          <div className="flex flex-row gap-1 mt-1">
            <InputNumber
              mode="currency"
              currency={shop.currency || "HKD"}
              inputClassName="w-full"
              className="w-full"
              value={newOptionPrice}
              placeholder={ADMIN_PRODUCTS_LANG[21][lang]}
              onChange={(e: InputNumberChangeEvent) => {
                setNewOptionPrice(e.value);
              }}
            />
            <Button
              icon="pi pi-plus"
              text
              disabled={newOptionOption === "" || newOptionPrice === null}
              onClick={() => {
                setNewOption((prev) => ({
                  ...prev,
                  options: [
                    ...prev.options,
                    {
                      label: newOptionOption,
                      price: newOptionPrice!,
                      isHidden: false,
                    },
                  ],
                }));
                setNewOptionOption("");
                setNewOptionPrice(null);
              }}
            />
          </div>
        </AccordionTab>
      </Accordion>

      <InputNumber
        className="w-full"
        inputClassName="w-full"
        value={newOption.minSelect}
        onChange={(e: InputNumberChangeEvent) => {
          setNewOption((prev) => ({ ...prev, minSelect: e.value }));
        }}
        showButtons
        min={0}
        max={newOption.options.length}
        placeholder={ADMIN_PRODUCTS_LANG[16][lang]}
      />
      <InputNumber
        className="w-full"
        inputClassName="w-full mt-1"
        value={newOption.maxSelect}
        onChange={(e: InputNumberChangeEvent) => {
          setNewOption((prev) => ({ ...prev, maxSelect: e.value }));
        }}
        showButtons
        min={0}
        max={newOption.options.length}
        placeholder={ADMIN_PRODUCTS_LANG[17][lang]}
      />
      <Button
        icon="pi pi-plus"
        className="mt-1 w-full"
        disabled={
          newOption.minSelect === null ||
          newOption.maxSelect === null ||
          newOption.name === "" ||
          newOption.options.length === 0 ||
          newOption.options.find(
            (opt) => opt.label === "" || opt.price === null
          ) !== undefined
        }
        label={ADMIN_PRODUCTS_LANG[14][lang]}
        onClick={() => {
          setOptions((prev) => [...prev, newOption]);
          setNewOption({
            name: "",
            minSelect: 0,
            maxSelect: 0,
            options: [],
          });
        }}
      />
    </>
  );
}
