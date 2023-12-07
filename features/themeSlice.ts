import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeTypes } from "@types";

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
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
