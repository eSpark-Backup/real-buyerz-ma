// auth.ts
import { storage } from "store/mmkv";

export const checkLoggedInUser = (): boolean => {
  // Retrieve user state from MMKV
  const userState = storage.getString("user");
  const isLoggedIn = !!userState; // Check if userState exists

  return isLoggedIn;
};
