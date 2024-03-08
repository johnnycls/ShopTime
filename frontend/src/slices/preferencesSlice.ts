import { createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
  lang: string;
}
const initialState: PreferencesState = {
  lang: "chi",
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      const { lang } = action.payload;
      state.lang = lang;
    },
  },
});

export const { changeLang } = preferencesSlice.actions;

export default preferencesSlice.reducer;
