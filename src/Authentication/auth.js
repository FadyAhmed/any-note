import * as firebase from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const signIn = async (providerName) => {
  let user = null;
  let error = null;

  let auth;
  if (firebase.getApps().length) {
    auth = getAuth();
  }

  let provider;
  if (providerName === "Facebook") {
    provider = new FacebookAuthProvider();
  } else if (providerName === "Google") {
    provider = new GoogleAuthProvider();
  }

  provider.setCustomParameters({
    display: "popup",
  });

  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
  } catch (e) {
    error = e;
  }
  return { user, error };
};

export const logout = () => {
  let error;
  const auth = getAuth();

  signOut(auth)
    .then(() => {})
    .catch((err) => {
      console.log(err);

      error = err;
    });

  return error;
};
