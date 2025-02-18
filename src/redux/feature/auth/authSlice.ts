import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
// import { RootState } from "@reduxjs/toolkit/query";
type TAuthData = {
  email: string;
  role: string;
};
export type TAuthUser = {
  data: TAuthData;
  iat: string;
  exp: string;
};
export interface TAuthState {
  user: null | TAuthUser;
  token: string | null;
}

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.user = action.payload;
      // state.token = action.payload;
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
