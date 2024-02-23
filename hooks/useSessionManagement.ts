import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storage } from "store/mmkv";
import { setLoggedInUser, clearLoggedInUser } from "../features/userSlice"; // Import actions from userSlice

const useSessionManagement = () => {
  const dispatch = useDispatch();

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

  return { updateUserInSession, clearSession };
};

export default useSessionManagement;
