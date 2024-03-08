import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Shop } from "../config";
import axios from "axios";
import { API_URL } from "../config";
import { RootState } from "../app/store";

interface ShopState {
  shop: Shop;
  isSignedIn: boolean;
  hasLoaded: boolean;
  isLoading: boolean;
  token: string;
}

const initialState: ShopState = {
  shop: {
    shopName: "",
    logo: "",
    description: "",
    categories: [],
    productCategories: [],
    products: [],
    noteToCustomers: "",
    link: "",
    displayName: "",
    isHidden: true,
    currency: "",
    discounts: [],
    igNameRequired: false,
    seatNumRequired: false,
    contactNumRequired: false,
    deliveryAddressRequired: false,
    pickupAddressRequired: false,
    minCharge: 0,
  },
  token: "",
  isSignedIn: false,
  hasLoaded: false,
  isLoading: false,
};

export const register = createAsyncThunk<
  any,
  { shopName: string; rootPassword: string; password: string }
>("shop/register", async ({ shopName, rootPassword, password }) => {
  return axios({
    method: "post",
    url: `${API_URL}auth/register`,
    data: {
      shopName,
      rootPassword,
      password,
    },
  }).then((response) => response.data);
});

export const login = createAsyncThunk<
  any,
  { shopName: string; password: string }
>("shop/login", async ({ shopName, password }) => {
  return axios({
    method: "post",
    url: `${API_URL}auth/login`,
    data: {
      shopName,
      password,
    },
  }).then((response) => response.data);
});

export const checkToken = createAsyncThunk<any, {}, { state: RootState }>(
  "shop/checkToken",
  async ({}, { getState }) => {
    const state = getState();
    return axios({
      method: "get",
      url: `${API_URL}auth/`,
      headers: {
        Authorization: state.shop.token,
      },
    }).then((response) => response.data);
  }
);

export const changePassword = createAsyncThunk<
  any,
  { password },
  { state: RootState }
>("shop/changePassword", async ({ password }, { getState }) => {
  const state = getState();
  return axios({
    method: "post",
    url: `${API_URL}auth/changePassword/`,
    headers: {
      Authorization: state.shop.token,
    },
    data: { password },
  }).then((response) => response.data);
});

export const updateShop = createAsyncThunk<
  any,
  {
    description: string | undefined;
    categories: number[] | undefined;
    isHidden: boolean | undefined;
    noteToCustomers: string | undefined;
    link: string | undefined;
    displayName: string | undefined;
    currency: string | undefined;
    discounts: { min: number; percentageOff: number }[];
    igNameRequired: boolean | undefined;
    seatNumRequired: boolean | undefined;
    contactNumRequired: boolean | undefined;
    deliveryAddressRequired: boolean | undefined;
    pickupAddressRequired: boolean | undefined;
    minCharge: number | undefined;
  },
  { state: RootState }
>(
  "shop/updateShop",
  async (
    {
      description,
      categories,
      isHidden,
      noteToCustomers,
      link,
      displayName,
      currency,
      discounts,
      igNameRequired,
      seatNumRequired,
      contactNumRequired,
      deliveryAddressRequired,
      pickupAddressRequired,
      minCharge,
    },
    { getState }
  ) => {
    const state = getState();
    return axios({
      method: "patch",
      url: `${API_URL}shop/`,
      headers: {
        Authorization: state.shop.token,
      },
      data: {
        description,
        categories,
        isHidden,
        noteToCustomers,
        link,
        displayName,
        currency,
        discounts,
        igNameRequired,
        seatNumRequired,
        contactNumRequired,
        deliveryAddressRequired,
        pickupAddressRequired,
        minCharge,
      },
    }).then((response) => response.data);
  }
);

export const updateLogo = createAsyncThunk<
  any,
  { logo: File },
  { state: RootState }
>("shop/updateLogo", async ({ logo }, { getState }) => {
  const state = getState();
  const formData = new FormData();
  formData.append("logo", logo);

  return axios({
    method: "patch",
    url: `${API_URL}shop/logo/`,
    headers: {
      Authorization: state.shop.token,
    },
    data: formData,
  }).then((response) => response.data);
});

export const addProductCategories = createAsyncThunk<
  any,
  { productCategories: [{ name: string }] },
  { state: RootState }
>("shop/addProductCategories", async ({ productCategories }, { getState }) => {
  const state = getState();
  return axios({
    method: "post",
    url: `${API_URL}shop/productCategories/`,
    headers: {
      Authorization: state.shop.token,
    },
    data: { productCategories },
  }).then((response) => response.data);
});

export const updateProductCategories = createAsyncThunk<
  any,
  { productCategories: [{ _id: string; name: string }] },
  { state: RootState }
>(
  "shop/updateProductCategories",
  async ({ productCategories }, { getState }) => {
    const state = getState();
    return axios({
      method: "patch",
      url: `${API_URL}shop/productCategories/`,
      headers: {
        Authorization: state.shop.token,
      },
      data: { productCategories },
    }).then((response) => response.data);
  }
);

export const removeProductCategories = createAsyncThunk<
  any,
  { productCategoryIds: [string] },
  { state: RootState }
>(
  "shop/removeProductCategories",
  async ({ productCategoryIds }, { getState }) => {
    const state = getState();
    return axios({
      method: "delete",
      url: `${API_URL}shop/productCategories/`,
      headers: {
        Authorization: state.shop.token,
      },
      data: { productCategoryIds },
    }).then((response) => response.data);
  }
);

export const getShop = createAsyncThunk<
  any,
  { shopName: string },
  { state: RootState }
>("shop/getShop", async ({ shopName }, { getState }) => {
  const state = getState();
  return axios({
    method: "get",
    url: `${API_URL}shop/${shopName}/`,
  }).then((response) => response.data);
});

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getTokenFromLocalStorage: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = JSON.parse(token);
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
      state.isLoading = false;
      state.isSignedIn = false;
      state.hasLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
      state.hasLoaded = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSignedIn = true;
      state.hasLoaded = true;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.token = action.payload.token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isSignedIn = false;
      state.hasLoaded = true;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.hasLoaded = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSignedIn = true;
      state.hasLoaded = true;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.token = `${action.payload.token}`;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isSignedIn = false;
      state.hasLoaded = true;
    });
    builder.addCase(checkToken.pending, (state, action) => {
      state.isLoading = true;
      state.isSignedIn = false;
      state.hasLoaded = false;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSignedIn = true;
      state.hasLoaded = true;
      localStorage.setItem("token", JSON.stringify(state.token));
      state.shop = action.payload;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.isLoading = false;
      state.hasLoaded = true;
    });
    builder.addCase(updateShop.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateShop.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shop = action.payload;
    });
    builder.addCase(updateShop.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateLogo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateLogo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shop.logo = action.payload.logo;
    });
    builder.addCase(updateLogo.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addProductCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addProductCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shop.productCategories = action.payload;
    });
    builder.addCase(addProductCategories.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateProductCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shop.productCategories = action.payload;
    });
    builder.addCase(updateProductCategories.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(removeProductCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeProductCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shop.productCategories = action.payload;
    });
    builder.addCase(removeProductCategories.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getShop.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getShop.fulfilled, (state, action) => {
      state.shop = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getShop.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(changePassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { getTokenFromLocalStorage, logout } = shopSlice.actions;

export default shopSlice.reducer;
