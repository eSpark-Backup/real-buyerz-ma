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

  useEffect(() => {
    const storedUser = storage.getString("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setLoggedInUser(user));
    }
  }, [dispatch]);

  const updateUserInSession = (user: any) => {
    storage.set("user", JSON.stringify(user));
    dispatch(setLoggedInUser(user));
  };

  const clearSession = () => {
    storage.set("user", "");
    dispatch(clearLoggedInUser());
  };

  const updateThemeInSession = (value: ThemeTypes) => {
    storage.set("theme", true);
    dispatch(toggleTheme(value));
  };

  const clearTheme = () => {
    console.log("clearing theme");
    storage.set("theme", false);
    dispatch(resetTheme());
    console.log(storage.getBoolean("theme"));
  };
  return {
    updateUserInSession,
    clearSession,
    updateThemeInSession,
    clearTheme,
  };
};

export default useSessionManagement;
