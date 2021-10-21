import { createSlice } from "@reduxjs/toolkit";

const initialDarkModeState = {
  isDark: localStorage.getItem("darkMode") === "true" ? true : false,
};

const darkSlice = createSlice({
  name: "dark",
  initialState: initialDarkModeState,
  reducers: {
    switch(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("darkMode", state.isDark);
    },
  },
});

export const darkModeActions = darkSlice.actions;

export default darkSlice.reducer;
