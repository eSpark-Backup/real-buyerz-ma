import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeOptions {
  theme: "Default" | "Dark";
}

interface ThemeState {
  value: ThemeOptions["theme"];
}

const initialState: ThemeState = {
  value: "Default",
};

type ThemePayload = {
  type: string; // Define your specific types for the action here
  payload: ThemeOptions["theme"]; // Assuming ThemeOptions is defined somewhere
};

export const themeSlice = createSlice({
  name: "AppTheme",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<ThemeOptions["theme"]>) => {
      switch (action.type) {
        case "ADD":
          state.value = action.payload;
          break;
        default:
          break;
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
