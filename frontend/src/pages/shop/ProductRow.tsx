import React from "react";
import { API_URL, Product, ProductCategory } from "../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import No_Image_Available from "../../assets/imgs/No_Image_Available.jpg";
import { SHOP_LANG } from "../../lang";

const ProductRow = ({
  product,
  handleClick,
}: {
  product: Product;
  handleClick: () => void;
}) => {
  const productCategories = useSelector(
    (state: RootState) => state.shop.shop.productCategories
  );
  const currency = useSelector((state: RootState) => state.shop.shop.currency);
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <div className="flex py-2 gap-2 w-full" onClick={handleClick}>
      <img
        className="shadow-2 border-round w-1/5 sm:w-[10%]"
        src={
          product.images[0]
            ? `${API_URL}${product.images[0]}`
            : No_Image_Available
        }
        alt={`Image of ${product.name}`}
      />
      <div className="flex flex-col w-3/5 sm:w-[70%]">
        <div className="font-semibold truncate">{product.name}</div>
        <div className="text-sm truncate">{product.description}</div>
        <div>
          <i className="pi pi-tag mr-1"></i>
          <span className="text-sm truncate">
            {product.categories
              .map(
                (catId) =>
                  productCategories.find((cat) => cat._id === catId)?.name
              )
              .join(", ")}
          </span>
        </div>
      </div>

      <div className="flex flex-col w-1/5 sm:w-1/5">
        <div className="h-full text-right truncate">
          {currency !== "" &&
            (product.priceAfterDiscount === -1 ? (
              product.price.toLocaleString("en-US", {
                style: "currency",
                currency: currency,
              })
            ) : (
              <>
                <div>
                  {product.priceAfterDiscount.toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                  })}
                </div>
                <div className="line-through">
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                  })}
                </div>
              </>
            ))}

          <div>{SHOP_LANG[8][lang] + ": " + product.inventory}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductRow;
