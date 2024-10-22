import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storage } from "store/mmkv";
import { setLoggedInUser, clearLoggedInUser } from "../features/userSlice"; // Import actions from userSlice
import { resetTheme, toggleTheme } from "features/themeSlice";
import { useTheme } from "@react-navigation/native";
import { MyTheme, ThemeTypes } from "@types";

const useSessionManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme() as MyTheme;

  const updateUserInSession = (user: any, userToken:string) => {
    storage.set("userData", JSON.stringify(user));
    storage.set("userToken", JSON.stringify(userToken));
  };

  const updateUserIsLoggedInSession = (isRememberMe:boolean) => {
    storage.set("isRememberMe", isRememberMe);
    console.log(storage.getBoolean("isRememberMe"))
  };

  const clearSession = () => {
    storage.set("userData", "");
    storage.set("userToken", "");
  };

  const updateThemeInSession = (value: ThemeTypes) => {
    storage.set("theme", true);
    dispatch(toggleTheme(value));
  };

  const clearTheme = () => {
    storage.set("theme", false);
    storage.set("isRememberMe", false);
    dispatch(resetTheme());
    console.log(storage.getBoolean("theme"));
  };
  return {
    updateUserInSession,
    updateUserIsLoggedInSession,
    clearSession,
    updateThemeInSession,
    clearTheme,
  };
};

export default useSessionManagement;
