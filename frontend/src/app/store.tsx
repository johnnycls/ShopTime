import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "../slices/preferencesSlice";
import productsReducer from "../slices/productsSlice";
import shopReducer from "../slices/shopSlice";
import shopsReducer from "../slices/shopsSlice";
import txReducer from "../slices/txSlice";
import txsReducer from "../slices/txsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    products: productsReducer,
    shop: shopReducer,
    shops: shopsReducer,
    tx: txReducer,
    txs: txsReducer,
  },
  devTools: false,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
