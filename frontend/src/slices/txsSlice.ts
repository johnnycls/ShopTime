import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, Tx } from "../config";
import { RootState } from "../app/store";
import axios from "axios";

export const getTxs = createAsyncThunk<
  any,
  { minPrice?; maxPrice?; minDateTime?; maxDateTime?; statuses?; key },
  { state: RootState }
>(
  "shop/getTxs",
  async (
    { minPrice, maxPrice, minDateTime, maxDateTime, statuses, key },
    { getState }
  ) => {
    const state = getState();
    return axios({
      method: "get",
      headers: {
        Authorization: state.shop.token,
      },
      url: `${API_URL}tx/`,
      params: { minPrice, maxPrice, minDateTime, maxDateTime, statuses, key },
    }).then((response) => response.data);
  }
);

export const modifyTx = createAsyncThunk<
  any,
  { status?; memo?; datetime?; id },
  { state: RootState }
>("txs/modifyTx", async ({ status, memo, datetime, id }, { getState }) => {
  const state = getState();
  return axios({
    method: "patch",
    url: `${API_URL}tx/${id}/`,
    headers: {
      Authorization: state.shop.token,
    },
    data: {
      status,
      memo,
      datetime,
    },
  }).then((response) => response.data);
});

const initialState: {
  txs: Tx[];
  isLoading: boolean;
  income: number;
  refund: number;
} = {
  txs: [],
  isLoading: false,
  income: 0,
  refund: 0,
};

export const txsSlice = createSlice({
  name: "txs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTxs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTxs.fulfilled, (state, action) => {
      state.txs = action.payload.txs;
      if (action.payload.income) state.income = action.payload.income;
      if (action.payload.refund) state.refund = action.payload.refund;
      state.isLoading = false;
    });
    builder.addCase(getTxs.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(modifyTx.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(modifyTx.fulfilled, (state, action) => {
      const { tx } = action.payload;
      if (tx.status !== state.txs[0].status) {
        state.txs = state.txs.filter((t) => t._id !== tx._id);
      } else {
        state.txs = [...state.txs.filter((t) => t._id !== tx._id), tx];
      }
      state.isLoading = false;
    });
    builder.addCase(modifyTx.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

// export const {} = txsSlice.actions;

export default txsSlice.reducer;
