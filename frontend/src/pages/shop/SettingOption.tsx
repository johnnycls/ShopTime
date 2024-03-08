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
import { Accordion, AccordionTab } from "primereact/accordion";
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";

export default function SettingOption({ option, setOptions, options, index }) {
  const [settingOptionOption, setSettingOptionOption] = useState<string>("");
  const [settingOptionPrice, setSettingOptionPrice] = useState<number | null>(
    null
  );
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <>
      <div className="flex flex-row gap-1 items-center mt-2">
        <div className="flex justify-start w-full">
          <span className="p-float-label w-full">
            <InputText
              className="w-full"
              value={option.name}
              onChange={(e) =>
                setOptions((prev) => [
                  ...prev.slice(0, index),
                  { ...prev[index], name: e.target.value },
                  ...prev.slice(index + 1),
                ])
              }
            />
            <label>{ADMIN_PRODUCTS_LANG[15][lang]}</label>
          </span>
        </div>
      </div>

      <Accordion multiple className="w-full mt-2">
        {option.options.map((opt, idx) => (
          <AccordionTab
            className="w-full"
            key={idx}
            header={
              <div className="w-full flex justify-between items-center">
                <span>{opt.label}</span>
                <Button
                  icon="pi pi-trash"
                  text
                  className="m-0 p-0"
                  onClick={() => {
                    setOptions((prev) => [
                      ...prev.slice(0, index),
                      {
                        ...prev[index],
                        options: [
                          ...prev[index].options.slice(0, idx),
                          ...prev[index].options.slice(idx + 1),
                        ],
                      },
                      ...prev.slice(index + 1),
                    ]);
                  }}
                />
              </div>
            }
          >
            <div className="flex justify-start w-full mt-2">
              <span className="p-float-label w-full">
                <InputText
                  className="w-full"
                  value={opt.label}
                  onChange={(e) =>
                    setOptions((prev) => [
                      ...prev.slice(0, index),
                      {
                        ...prev[index],
                        options: [
                          ...prev[index].options.slice(0, idx),
                          {
                            label: e.target.value,
                            price: opt.price,
                            isHidden: opt.isHidden,
                          },
                          ...prev[index].options.slice(idx + 1),
                        ],
                      },
                      ...prev.slice(index + 1),
                    ])
                  }
                />
                <label>{ADMIN_PRODUCTS_LANG[14][lang]}</label>
              </span>
            </div>

            <div className="flex justify-start w-full mt-4">
              <span className="p-float-label w-full">
                <InputNumber
                  mode="currency"
                  currency="HKD"
                  inputClassName="w-full"
                  className="w-full"
                  value={opt.price}
                  onValueChange={(e: InputNumberValueChangeEvent) => {
                    e.target.value &&
                      setOptions((prev) => [
                        ...prev.slice(0, index),
                        {
                          ...prev[index],
                          options: [
                            ...prev[index].options.slice(0, idx),
                            {
                              label: opt.label,
                              price: e.target.value,
                              isHidden: opt.isHidden,
                            },
                            ...prev[index].options.slice(idx + 1),
                          ],
                        },
                        ...prev.slice(index + 1),
                      ]);
                  }}
                  min={0}
                />
                <label>{ADMIN_PRODUCTS_LANG[21][lang]}</label>
              </span>
            </div>

            <ToggleButton
              className="mt-1  w-full"
              checked={!opt.isHidden}
              onChange={(e: ToggleButtonChangeEvent) =>
                setOptions((prev) => [
                  ...prev.slice(0, index),
                  {
                    ...prev[index],
                    options: [
                      ...prev[index].options.slice(0, idx),
                      {
                        label: opt.label,
                        price: opt.price,
                        isHidden: !e.value,
                      },
                      ...prev[index].options.slice(idx + 1),
                    ],
                  },
                  ...prev.slice(index + 1),
                ])
              }
              onLabel={ADMIN_PRODUCTS_LANG[26][lang]}
              offLabel={ADMIN_PRODUCTS_LANG[27][lang]}
            />
          </AccordionTab>
        ))}

        <AccordionTab header={ADMIN_PRODUCTS_LANG[31][lang]}>
          <div className="flex justify-start w-full mt-2">
            <span className="p-float-label w-full">
              <InputText
                className="w-full"
                value={settingOptionOption}
                onChange={(e) => setSettingOptionOption(e.target.value)}
              />
              <label>{ADMIN_PRODUCTS_LANG[31][lang]}</label>
            </span>
          </div>

          <div className="flex justify-start w-full mt-4">
            <span className="p-float-label w-full">
              <InputNumber
                mode="currency"
                currency="HKD"
                inputClassName="w-full"
                className="w-full"
                value={settingOptionPrice}
                onChange={(e: InputNumberChangeEvent) => {
                  setSettingOptionPrice(e.value);
                }}
                min={0}
              />
              <label>{ADMIN_PRODUCTS_LANG[21][lang]}</label>
            </span>
            <Button
              icon="pi pi-plus"
              disabled={
                settingOptionOption === "" || settingOptionPrice === null
              }
              text
              onClick={() => {
                setOptions((prev) => [
                  ...prev.slice(0, index),
                  {
                    ...prev[index],
                    options: [
                      ...prev[index].options,
                      {
                        label: settingOptionOption,
                        price: settingOptionPrice,
                        isHidden: false,
                      },
                    ],
                  },
                  ...prev.slice(index + 1),
                ]);
                setSettingOptionOption("");
                setSettingOptionPrice(null);
              }}
            />
          </div>
        </AccordionTab>
      </Accordion>

      <div className="flex flex-col sm:flex-row ">
        <div className="flex justify-start w-full mt-4">
          <span className="p-float-label w-full">
            <InputNumber
              inputClassName="w-full"
              value={option.minSelect}
              onChange={(e: InputNumberChangeEvent) => {
                setOptions((prev) => [
                  ...prev.slice(0, index),
                  {
                    ...prev[index],
                    minSelect: e.value,
                  },
                  ...prev.slice(index + 1),
                ]);
              }}
              showButtons
              min={0}
              max={option.length}
            />
            <label>{ADMIN_PRODUCTS_LANG[16][lang]}</label>
          </span>
        </div>

        <div className="flex justify-start w-full mt-4">
          <span className="p-float-label w-full">
            <InputNumber
              inputClassName="w-full"
              value={option.maxSelect}
              onChange={(e: InputNumberChangeEvent) => {
                setOptions((prev) => [
                  ...prev.slice(0, index),
                  {
                    ...prev[index],
                    maxSelect: e.value,
                  },
                  ...prev.slice(index + 1),
                ]);
              }}
              showButtons
              min={0}
              max={option.length}
            />
            <label>{ADMIN_PRODUCTS_LANG[17][lang]}</label>
          </span>
        </div>
      </div>
    </>
  );
}
