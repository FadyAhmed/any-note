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
import firebaseConfig from "./firebase_config.json";

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth();
setPersistence(auth, browserLocalPersistence).then((user) => {});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default app;
