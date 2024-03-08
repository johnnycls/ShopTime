import React from "react";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import { SHOP_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function OptionSelect({
  option,
  selectedOptions,
  setSelectedOptions,
}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const currency = useSelector((state: RootState) => state.shop.shop.currency);

  const isMultiple = option.maxSelect > 1;
  const options = option.options.map((option) => ({
    ...option,
    label: `${option.label} +${
      currency !== "" &&
      option.price.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
      })
    }`,
  }));

  return (
    <div className="w-full" key={option.name}>
      <span className="font-semibold overflow-auto">{option.name}</span>
      <span
        className={`overflow-auto ${
          (selectedOptions.length < option.minSelect ||
            selectedOptions.length > option.maxSelect) &&
          "text-red-500"
        }`}
      >{` (${SHOP_LANG[0][lang]} ${
        option.minSelect === option.maxSelect
          ? option.minSelect
          : option.minSelect + " - " + option.maxSelect
      })
      `}</span>
      <ListBox
        id="item"
        name="option"
        className="w-full"
        multiple={isMultiple}
        value={isMultiple ? selectedOptions : selectedOptions[0]}
        options={options}
        optionLabel="label"
        onChange={(e: ListBoxChangeEvent) => {
          setSelectedOptions(isMultiple ? e.value : e.value ? [e.value] : []);
        }}
        optionDisabled="isHidden"
      />
    </div>
  );
}
