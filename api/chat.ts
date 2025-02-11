import { store } from "@store";
import { create } from "apisauce";
import { router } from "expo-router";
import { resetTheme } from "features/themeSlice";
import { setUserData, setUserToken } from "features/user/userSlice";
import Toast from "react-native-toast-message";
import { storage } from "store/mmkv";

export const BASE_URL = "https://dev-express-realbuyerz.esparkconsultants.com/";

export const api = create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${storage.getString("userToken")}`,
  },
});

api.addRequestTransform((request) => {
  const token = storage.getString("userToken");
  request.headers = request.headers ?? {};
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
});

api.addResponseTransform((response) => {
  if (!response.ok) {
    switch (response.status) {
      case 401:
        Toast.show({
          text1: "Session Expired",
          text2: "Please log in again.",
          type: "error",
        });
        storage.set("userData", "");
        storage.set("userToken", "");
        storage.set("theme", false);
        storage.set("isRememberMe", false);
        store.dispatch(resetTheme());
        store.dispatch(setUserToken(""));
        store.dispatch(setUserData(""));
        router.replace("/auth/SignIn/signIn"); // Redirect user to sign-in screen
        break;
      case 500:
        // Handle server error
        Toast.show({
          text1: "Server Error",
          text2: "Please try again later.",
          type: "error",
        });
        break;
      case 404:
        Toast.show({
          text1: "Not Found",
          text2: "The requested resource was not found.",
          type: "error",
        });
        break;
      default:
        // Handle other types of errors
        Toast.show({
          text1: "Error",
          text2: response.problem || "An unexpected error occurred.",
          type: "error",
        });
        break;
    }
  }
});
