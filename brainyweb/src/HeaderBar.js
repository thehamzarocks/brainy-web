import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectSignedInUser } from "./store/fileSlice";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

function HeaderBar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const signedInUser = useSelector(selectSignedInUser);

  const signIn = () => {
    Auth.federatedSignIn();
  };

  useEffect(checkUser);

  function checkUser() {
    if (!signedInUser) {
      Auth.currentCredentials().then(response => {
        console.log("current credentials:");
        console.log(response);
      })
      Auth.currentSession().then(response => {
        console.log("current session:");
        console.log(response);
      })
      Auth.currentAuthenticatedUser()
        .then((user) => {
          console.log({ user });
          dispatch(
            updateUser({
              email: user.attributes.email,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function signOut() {
    Auth.signOut()
      .then((data) => {
        console.log(data);
        dispatch(updateUser(null));
      })
      .catch((err) => console.log(err));
  }

  const loginButton = () => {
    if (!signedInUser) {
      return (
        <Button onClick={signIn} color="inherit">
          Login
        </Button>
      );
    } else {
      return (
        <Button onClick={signOut} color="inherit">
          Log Out
        </Button>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          component={Link}
          to={"/"}
          color="inherit"
          className={classes.title}
        >
          BrainyLog
        </Button>
        <div className={classes.grow} />
        {loginButton()}
      </Toolbar>
    </AppBar>
  );
}
export default HeaderBar;
