import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  password: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: "",
  password: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLoggedIn = true;
    },
    clearLoggedInUser: (state) => {     
      state.email = "";
      state.password = "";
      state.isLoggedIn = false; 
    },
  },
});

export const { setLoggedInUser, clearLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
