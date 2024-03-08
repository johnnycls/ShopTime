import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, Shop } from "../config";
import { RootState } from "../app/store";
import axios from "axios";

export const getShops = createAsyncThunk<any, {}, { state: RootState }>(
  "shop/getShops",
  async ({}, { getState }) => {
    const state = getState();
    return axios({
      method: "get",
      url: `${API_URL}shop/`,
    }).then((response) => response.data);
  }
);

interface ShopsState {
  shops: Shop[];
  isLoading: boolean;
}
const initialState: ShopsState = {
  shops: [],
  isLoading: false,
};

export const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShops.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getShops.fulfilled, (state, action) => {
      state.shops = action.payload.shops;
      state.isLoading = false;
    });
  },
});

// export const {} = shopsSlice.actions;

export default shopsSlice.reducer;
