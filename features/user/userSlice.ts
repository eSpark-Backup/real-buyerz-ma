import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  landlineNumber: string;
  city: string;
  bio: string;
  whatsapp: string;
  country: string;
  address: string;
  isVerified: boolean;
  socialId: string;
  profileImage: string;
  profileVisibility: boolean;
  role: string;
  preferences: null;
};

export interface UserState {
  token: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
  userData: User | null
}

const initialState: UserState = {
  token: "",
  userData: null,
  email: "",
  password: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
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

export const {setUserToken, setUserData, setLoggedInUser, clearLoggedInUser} = userSlice.actions;

export default userSlice.reducer;