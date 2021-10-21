import * as firebase from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store/index";

const firebaseConfig = {
  apiKey: "AIzaSyCYMIX1EAIJeXlivFE9jr57qHrzf34LfPg",
  authDomain: "reactcoursetest-b6d20.firebaseapp.com",
  databaseURL: "https://reactcoursetest-b6d20-default-rtdb.firebaseio.com",
  projectId: "reactcoursetest-b6d20",
  storageBucket: "reactcoursetest-b6d20.appspot.com",
  messagingSenderId: "862786532651",
  appId: "1:862786532651:web:c35c8e017c79a15a90816e",
  measurementId: "G-TGH2SDHKTG",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth();
setPersistence(auth, browserLocalPersistence).then(() => {});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default app;
