import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, Product } from "../config";
import { RootState } from "../app/store";
import axios from "axios";

interface ProductsState {
  products: Product[];
  isLoading: boolean;
}

export const getProductsByShop = createAsyncThunk<
  any,
  {
    shopName: string;
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    statuses?: number[];
  },
  { state: RootState }
>(
  "products/getProductsByShop",
  async (
    { shopName, categories, minPrice, maxPrice, statuses },
    { getState }
  ) => {
    const state = getState();
    return axios({
      method: "get",
      url: `${API_URL}product/${shopName}/`,
      params: { categories, minPrice, maxPrice, statuses },
    }).then((response) => response.data);
  }
);

export const createProduct = createAsyncThunk<
  any,
  {
    name;
    images: File[];
    description;
    categories;
    price;
    priceAfterDiscount;
    options;
    status;
    inventory;
  },
  { state: RootState }
>(
  "products/createProduct",
  async (
    {
      name,
      images,
      description,
      categories,
      price,
      priceAfterDiscount,
      options,
      status,
      inventory,
    },
    { getState }
  ) => {
    const state = getState();
    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append(
      "data",
      JSON.stringify({
        name,
        description,
        categories,
        price: price || 0,
        priceAfterDiscount,
        options,
        status,
        inventory,
      })
    );

    return axios({
      method: "post",
      url: `${API_URL}product/`,
      headers: {
        Authorization: state.shop.token,
      },
      data: formData,
    }).then((response) => response.data);
  }
);

export const updateProduct = createAsyncThunk<
  any,
  {
    _id;
    name;
    images: File[];
    description;
    categories;
    price;
    priceAfterDiscount;
    options;
    status;
    inventory;
  },
  { state: RootState }
>(
  "products/updateProduct",
  async (
    {
      _id,
      name,
      images,
      description,
      categories,
      price,
      priceAfterDiscount,
      options,
      status,
      inventory,
    },
    { getState }
  ) => {
    const state = getState();
    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append(
      "data",
      JSON.stringify({
        _id,
        name,
        description,
        categories,
        price,
        priceAfterDiscount,
        options,
        status,
        inventory,
      })
    );

    return axios({
      method: "patch",
      url: `${API_URL}product/`,
      headers: {
        Authorization: state.shop.token,
      },
      data: formData,
    }).then((response) => response.data);
  }
);

const initialState: ProductsState = {
  products: [],
  isLoading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsByShop.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsByShop.fulfilled, (state, action) => {
      const { products } = action.payload;
      state.products = products;
      state.isLoading = false;
    });
    builder.addCase(getProductsByShop.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      const { product } = action.payload;

      state.products = [...state.products, product];
      state.isLoading = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const { product } = action.payload;
      state.products = [
        ...state.products.filter((prod) => prod._id !== product._id),
        product,
      ];
      state.isLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
