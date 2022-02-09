import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth-slice";
import darkSliceReducer from "./dark-slice";
import languageSliceReducer from "./language-slice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    dark: darkSliceReducer,
    language: languageSliceReducer,
  },
});

export default store;
