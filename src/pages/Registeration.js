import { getAuth } from "@firebase/auth";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  List,
  ListItem,
  Modal,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppleLoginButton,
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { logout, signIn } from "../Authentication/auth";
import { authActions } from "../store/auth-slice";
import classes from "./Registeration.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 16,
};

const Registeration = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [signingError, setSigningError] = useState(null);

  const signInHandler = async (provider) => {
    const { user, error } = await signIn(provider);
    setSigningError(error);

    if (!error) {
      handleClose();

      dispatch(
        authActions.login({
          userPhoto: user.photoURL,
          accessToken: user.accessToken,
          name: user.displayName,
          refreshToken: user.refreshToken,
        })
      );
    }
  };

  const signout = () => {
    logout();
    dispatch(authActions.logout());
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          authActions.login({
            userPhoto: user.photoURL,
            accessToken: user.accessToken,
            name: user.displayName,
            refreshToken: user.refreshToken,
          })
        );
      }
    });
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open || signingError}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <div className={classes.registerButtons}>
            {!isLoggedIn && (
              <List>
                <ListItem>
                <FontAwesomeIcon icon={['fab', 'apple']} />

                  <FacebookLoginButton
                    variant="contained"
                    style={{ width: "240px" }}
                    onClick={() => signInHandler("Facebook")}
                  >
                    Facebook
                  </FacebookLoginButton>
                </ListItem>
                <ListItem>
                  <GoogleLoginButton
                    variant="contained"
                    className={classes.button}
                    onClick={() => signInHandler("Google")}
                  >
                    Google
                  </GoogleLoginButton>
                </ListItem>
                <ListItem>
                  <AppleLoginButton
                    variant={isLoggedIn ? "contained" : "outlined"}
                    className={classes.button}
                  >
                    Apple
                  </AppleLoginButton>
                </ListItem>
              </List>
            )}
            {isLoggedIn && <Button onClick={() => signout()}>Logout</Button>}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Registeration;
