import React from "react";
import { SHOP_LANG } from "../../lang";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { ProductCategory } from "../../config";

export default function ProductFilter({
  setSearch,
  selectedCategories,
  setSelectedCategories,
  shop,
}: {
  setSearch;
  selectedCategories: ProductCategory[];
  setSelectedCategories;
  shop;
}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <>
      <span className="p-input-icon-left w-full mb-1">
        <i className="pi pi-search" />
        <InputText
          placeholder={SHOP_LANG[1][lang]}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </span>

      <div className="card flex justify-content-center mb-1">
        <MultiSelect
          value={selectedCategories}
          onChange={(e: MultiSelectChangeEvent) =>
            setSelectedCategories(e.value)
          }
          options={shop.productCategories}
          optionLabel="name"
          display="chip"
          placeholder={SHOP_LANG[2][lang]}
          className="w-full"
        />
      </div>
    </>
  );
}
