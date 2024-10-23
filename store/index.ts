import { configureStore } from "@reduxjs/toolkit";

import ThemeReducer from "features/themeSlice";
import UserReducer from "features/user/userSlice";
import PropertyReducer from 'features/property/propertySlice'
export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    user: UserReducer,
    property: PropertyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
