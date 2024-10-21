import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeTypes } from "@types";
import { storage } from "store/mmkv";

interface ThemeState {
  value: ThemeTypes;
}

const initialState: ThemeState = {
  value: "Default",
};

export const themeSlice = createSlice({
  name: "AppTheme",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<ThemeTypes, string>) => {
      state.value = action.payload;
      storage.set("theme", action.payload === "Dark");
    },
    resetTheme: (state) => {
      state.value = "Default";
      storage.set("theme", false);
    },
  },
});

export const { toggleTheme, resetTheme } = themeSlice.actions;

export default themeSlice.reducer;
