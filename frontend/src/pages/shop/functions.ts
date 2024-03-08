import { Product, ProductCategory } from "../../config";

export function isSearchMatch(searchString: string, product: Product) {
  return (
    !searchString ||
    product.name.toLowerCase().includes(searchString.toLowerCase()) ||
    product.description.toLowerCase().includes(searchString.toLowerCase())
  );
}

export function isCategorySelected(
  selectedCategories: ProductCategory[],
  productCategories: string[]
) {
  const selectedCategoriesId = selectedCategories?.map(
    (category) => category._id
  );
  return (
    productCategories.length === 0 ||
    selectedCategories.length === 0 ||
    selectedCategoriesId.filter((id) => productCategories.includes(id)).length >
      0
  );
}
