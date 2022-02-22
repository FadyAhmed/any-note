import { createSlice } from "@reduxjs/toolkit";
import text from "../text";

const initialLanguageState = {
  language: localStorage.getItem("language") ?? "en",
  textContainer: localStorage.getItem("language") === "ar" ? text.ar : text.en,
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialLanguageState,
  reducers: {
    switchLanguage(state, actions) {
      state.language = actions.payload.language;
      state.textContainer = text[`${state.language}`];
      localStorage.setItem("language", state.language);
    },
  },
});

export const languageActions = languageSlice.actions;

export default languageSlice.reducer;
