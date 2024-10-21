import { configureStore } from "@reduxjs/toolkit";

import ThemeReducer from "features/themeSlice";
import UserReducer from "features/userSlice";

export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
