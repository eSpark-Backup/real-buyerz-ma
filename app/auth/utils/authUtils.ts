// auth.ts
import { storage } from "store/mmkv";
import { UserObject } from "../SignIn/utils";

export const checkLoggedInUser = (): boolean => {
  const userState = storage.getBoolean("isRememberMe");
  const isLoggedIn = !!userState;   
  return isLoggedIn;
};
export const getLoggedInUserInfo = (): UserObject | null => {
  try {
    const userState = storage.getString("userData");
    if (userState) {
      return JSON.parse(userState) as UserObject;
    }
    return null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};
