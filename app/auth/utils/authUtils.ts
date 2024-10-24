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
    const userData = storage.getString("userData");
    if (userData) {
      const userToken = storage.getString("userToken");
      const userObject: UserObject = {
        token: userToken!,  
        user: JSON.parse(userData), 
      };

      return userObject
    }
    return null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};
