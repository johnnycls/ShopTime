import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import AdminMenuBar from "../../components/AdminMenuBar";
import { RootState, useAppDispatch } from "../../app/store";
import ProductFilter from "./ProductFilter";
import { Product, ProductCategory } from "../../config";
import { isCategorySelected, isSearchMatch } from "./functions";
import { DataView } from "primereact/dataview";
import ProductRow from "./ProductRow";
import EditCategoryDialog from "./EditCategoryDialog";
import EditProductDialog from "./EditProductDialog";
import { ADMIN_PRODUCTS_LANG } from "../../lang";
import { TabView, TabPanel } from "primereact/tabview";
import { ProgressSpinner } from "primereact/progressspinner";
import BottomNav from "../../components/BottomNav";

export default function AdminProducts() {
  const { shopName } = useParams();
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const shop = useSelector((state: RootState) => state.shop);
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const isShopLoading = useSelector((state: RootState) => state.shop.isLoading);
  const isProductLoading = useSelector(
    (state: RootState) => state.products.isLoading
  );

  const [search, setSearch] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const filteredProducts = products.filter(
    (product) =>
      isSearchMatch(search, product) &&
      isCategorySelected(selectedCategories, product.categories) &&
      product.status === activeIndex
  );

  const [productVisible, setProductVisible] = useState<boolean>(false);
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [selectingProduct, setSelectingProduct] = useState<Product | null>(
    null
  );

  useEffect(() => {
    setSelectedCategories(shop.shop.productCategories);
  }, [shop.shop.productCategories]);

  return (
    <div className="min-h-screen w-full">
      <AdminMenuBar shopName={shopName} />

      <div className="p-3 w-full h-full">
        {isShopLoading || isProductLoading ? (
          <ProgressSpinner />
        ) : (
          <>
            <div className="w-full sm:flex sm:gap-2">
              <div className="sm:w-full">
                <ProductFilter
                  setSearch={setSearch}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  shop={shop.shop}
                />
              </div>
              <div className="flex sm:flex-col gap-1">
                <Button
                  className="w-full whitespace-nowrap"
                  label={ADMIN_PRODUCTS_LANG[20][lang]}
                  icon="pi pi-plus"
                  onClick={() => {
                    setProductVisible(true);
                  }}
                />
                <Button
                  className="w-full whitespace-nowrap"
                  label={ADMIN_PRODUCTS_LANG[22][lang]}
                  icon="pi pi-plus"
                  onClick={() => {
                    setCategoryVisible(true);
                  }}
                />
              </div>
            </div>

            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
              className="w-full"
              panelContainerClassName="m-0 p-0"
            >
              <TabPanel header={ADMIN_PRODUCTS_LANG[0][lang]}></TabPanel>
              <TabPanel header={ADMIN_PRODUCTS_LANG[1][lang]}></TabPanel>
            </TabView>
            <DataView
              className="w-full"
              value={filteredProducts}
              itemTemplate={(product) => (
                <ProductRow
                  product={product}
                  handleClick={() => {
                    setSelectingProduct(product);
                    setProductVisible(true);
                  }}
                />
              )}
              paginator
              rows={10}
              paginatorTemplate={{
                layout: "PrevPageLink PageLinks NextPageLink",
              }}
            />
          </>
        )}
      </div>

      <EditCategoryDialog
        visible={categoryVisible}
        onHide={() => {
          setCategoryVisible(false);
        }}
      />

      <EditProductDialog
        visible={productVisible}
        onHide={() => {
          setProductVisible(false);
          setSelectingProduct(null);
        }}
        product={selectingProduct}
        shop={shop.shop}
      />

      <BottomNav />
    </div>
  );
}
