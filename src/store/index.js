import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth-slice";
import darkSliceReducer from "./dark-slice";

const store = configureStore({
  reducer: { auth: authSliceReducer, dark: darkSliceReducer },
});

export default store;
