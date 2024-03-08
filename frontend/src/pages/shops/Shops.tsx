import React, { useEffect, useState } from "react";
import { SHOPS_LANG } from "../../lang";
import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { SHOP_CATEGORIES, Shop } from "../../config";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { DataView } from "primereact/dataview";
import ShopRow from "./ShopRow";
import { getShops } from "../../slices/shopsSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import ShopsMenuBar from "../../components/ShopsMenuBar";
import BottomNav from "../../components/BottomNav";

export function isSearchMatch(searchString: string, shop: Shop) {
  return (
    !searchString ||
    shop.displayName.toLowerCase().includes(searchString.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchString.toLowerCase())
  );
}

export function isCategorySelected(
  selectedCategories: { id; chi; eng }[],
  shopCategories: number[]
) {
  const selectedCategoriesId = selectedCategories?.map(
    (category) => category.id
  );

  return (
    selectedCategoriesId.filter((id) => shopCategories.includes(id)).length > 0
  );
}

export default function Shops() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const [selectedCategories, setSelectedCategories] =
    useState<{ id; chi; eng }[]>(SHOP_CATEGORIES);

  const lang = useSelector((state: RootState) => state.preferences.lang);
  const shops = useSelector((state: RootState) => state.shops.shops);
  const isLoading = useSelector((state: RootState) => state.shops.isLoading);

  useEffect(() => {
    dispatch(getShops({}));
  }, []);

  return (
    <div className="width-screen min-h-screen flex flex-col justify-between">
      <div>
        <ShopsMenuBar />

        <div className="p-3 pb-0">
          <span className="p-input-icon-left w-full mb-1">
            <i className="pi pi-search" />
            <InputText
              placeholder={SHOPS_LANG[0][lang]}
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>

          <div className="card flex justify-content-center mb-1">
            <MultiSelect
              value={selectedCategories}
              onChange={(e: MultiSelectChangeEvent) =>
                setSelectedCategories(e.value)
              }
              options={SHOP_CATEGORIES}
              optionLabel={lang}
              display="chip"
              placeholder={SHOPS_LANG[1][lang]}
              className="w-full"
            />
          </div>

          <div className="w-full h-full">
            {isLoading ? (
              <ProgressSpinner />
            ) : (
              <DataView
                className="w-full"
                value={shops.filter(
                  (shop) =>
                    isSearchMatch(search, shop) &&
                    isCategorySelected(selectedCategories, shop.categories)
                )}
                itemTemplate={ShopRow}
                paginator
                rows={10}
                paginatorTemplate={{
                  layout: "PrevPageLink PageLinks NextPageLink",
                }}
              />
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
