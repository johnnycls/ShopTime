import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import {
  MIN_CHARGE,
  Product,
  ProductCategory,
  SHOP_CATEGORIES,
} from "../../config";
import ProductRow from "./ProductRow";
import ProductOptionDialog from "./ProductOptionDialog";
import ProductFilter from "./ProductFilter";
import { isCategorySelected, isSearchMatch } from "./functions";
import ShopMenuBar from "./ShopMenuBar";
import { getCartFromLocalStorage } from "../../slices/txSlice";
import { SHOP_LANG } from "../../lang";
import { ProgressSpinner } from "primereact/progressspinner";
import BottomNav from "../../components/BottomNav";

export default function Shop() {
  const { shopName } = useParams();
  const dispatch = useAppDispatch();
  const shop = useSelector((state: RootState) => state.shop.shop);
  const isShopLoading = useSelector((state: RootState) => state.shop.isLoading);
  const isProductLoading = useSelector(
    (state: RootState) => state.products.isLoading
  );
  const products = useSelector((state: RootState) => state.products.products);
  const lang = useSelector((state: RootState) => state.preferences.lang);

  const [search, setSearch] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >([]);
  const filteredProducts = products.filter(
    (product) =>
      isSearchMatch(search, product) &&
      isCategorySelected(selectedCategories, product.categories) &&
      product.status === 0
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [selectingProduct, setSelectingProduct] = useState<Product | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<
    { _id: string; label: string; price: number }[][]
  >([]);
  const [memo, setMemo] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedCategories(shop.productCategories);
  }, [shop.productCategories]);

  useEffect(() => {
    dispatch(getCartFromLocalStorage({ shopName }));
  }, []);

  return (
    <div className="min-h-screen">
      <ShopMenuBar shopName={shopName} />

      <div className="p-3 w-full min-h-full">
        <Card
          title={shop.displayName}
          subTitle={
            <a className="w-full truncate" href={"//" + shop.link}>
              {shop.link}
            </a>
          }
          className="mb-1"
        >
          {isShopLoading ? (
            <ProgressSpinner />
          ) : (
            <>
              <div className="overflow-auto">{shop.description}</div>
              <div>{`${SHOP_LANG[7][lang]}: ${shop.categories
                .map((cat) => SHOP_CATEGORIES[cat][lang])
                .join(", ")}`}</div>

              <div>{`${SHOP_LANG[11][lang]}: ${shop.discounts
                .map((discount, idx) =>
                  SHOP_LANG[10][lang](
                    shop.currency
                      ? discount.min.toLocaleString("en-US", {
                          style: "currency",
                          currency: shop.currency,
                        })
                      : discount.min,
                    discount.percentageOff
                  )
                )
                .join(";\n")}`}</div>

              {MIN_CHARGE[shop.currency] && (
                <div>
                  {SHOP_LANG[13][lang] +
                    ": " +
                    SHOP_LANG[9][lang](
                      MIN_CHARGE[shop.currency].min.toLocaleString("en-US", {
                        style: "currency",
                        currency: shop.currency,
                      }),
                      MIN_CHARGE[shop.currency].surcharge.toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: shop.currency,
                        }
                      )
                    )}
                </div>
              )}

              {shop.minCharge > 0 && (
                <div>
                  {SHOP_LANG[12][lang] +
                    ": " +
                    shop.minCharge.toLocaleString("en-US", {
                      style: "currency",
                      currency: shop.currency,
                    })}
                </div>
              )}

              {shop.noteToCustomers !== "" && (
                <div>{`${SHOP_LANG[5][lang]}: ${shop.noteToCustomers}`}</div>
              )}
            </>
          )}
        </Card>

        <ProductFilter
          setSearch={setSearch}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          shop={shop}
        />

        <div className="card w-full h-full">
          {isProductLoading ? (
            <ProgressSpinner />
          ) : (
            <DataView
              className="w-full"
              value={filteredProducts}
              itemTemplate={(product) => (
                <ProductRow
                  product={product}
                  handleClick={() => {
                    setVisible(true);
                    setSelectingProduct(product);
                    setSelectedOptions(product.options.map((option) => []));
                    setQuantity(1);
                    setMemo("");
                  }}
                />
              )}
              paginator
              rows={10}
              paginatorTemplate={{
                layout: "PrevPageLink PageLinks NextPageLink",
              }}
            />
          )}
        </div>
      </div>

      {ProductOptionDialog(
        selectingProduct,
        visible,
        quantity,
        setQuantity,
        memo,
        selectedOptions,
        setVisible,
        setSelectedOptions,
        setMemo,
        shopName
      )}

      <BottomNav />
    </div>
  );
}
