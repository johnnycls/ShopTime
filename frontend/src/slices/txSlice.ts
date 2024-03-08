import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, Tx } from "../config";
import { RootState } from "../app/store";
import axios from "axios";

export const makeTx = createAsyncThunk<
  any,
  {
    customerIGName;
    memo;
    datetime;
    seatNum;
    contactNum;
    deliveryAddress;
    pickupAddress;
  },
  { state: RootState }
>(
  "tx/makeTx",
  async (
    {
      customerIGName,
      memo,
      datetime,
      seatNum,
      contactNum,
      deliveryAddress,
      pickupAddress,
    },
    { getState }
  ) => {
    const state = getState();
    return axios({
      method: "post",
      url: `${API_URL}tx/`,
      headers: {
        Authorization: state.shop.token,
      },
      data: {
        shopName: state.shop.shop.shopName,
        items: state.tx.items,
        customerIGName,
        memo,
        datetime,
        seatNum,
        contactNum,
        deliveryAddress,
        pickupAddress,
      },
    }).then((response) => response.data);
  }
);

const initialState = {
  _id: "-1",
  shopName: "",
  name: "",
  email: "",
  customerIGName: "",
  items: [],
  memo: "",
  datetime: "",
  status: -1,
  isLoading: false,
};

export const txSlice = createSlice({
  name: "tx",
  initialState,
  reducers: {
    getCartFromLocalStorage: (state, action) => {
      const { shopName } = action.payload;
      const cartItems = localStorage.getItem(shopName + "CartItems");
      if (cartItems) {
        state.items = JSON.parse(cartItems);
      }
    },
    addToCart: (state, action) => {
      const { items, shopName } = action.payload;
      state.items.push(items);
      localStorage.setItem(shopName + "CartItems", JSON.stringify(state.items));
    },
    changeQuantity: (state, action) => {
      const { index, quantity, shopName } = action.payload;
      if (quantity < 1) {
        state.items = [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1),
        ];
      } else {
        const originalItem = state.items[index];
        state.items = [
          ...state.items.slice(0, index),
          {
            ...originalItem,
            quantity,
            price: (originalItem.price / originalItem.quantity) * quantity,
          },
          ...state.items.slice(index + 1),
        ];
      }
      localStorage.setItem(shopName + "CartItems", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeTx.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(makeTx.fulfilled, (state, action) => {
      const { url } = action.payload;
      window.location = url;
      state.isLoading = false;
    });
    builder.addCase(makeTx.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { getCartFromLocalStorage, addToCart, changeQuantity } =
  txSlice.actions;

export default txSlice.reducer;
