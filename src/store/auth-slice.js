import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  photo: null,
  accessToken: null,
  name: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.photo = action.payload.userPhoto;
      state.accessToken = action.payload.accessToken;
      state.name = action.payload.name;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.photo = null;
      state.accessToken = null;
      state.name = null;
      state.refreshToken = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
