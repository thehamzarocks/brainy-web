import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateUserToken, selectSignedInUser } from "./store/fileSlice";

// Amplify.configure({
//   Auth: {

//       // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//       identityPoolId: 'ap-southeast-1_68of3yAqm',

//       // REQUIRED - Amazon Cognito Region
//       region: 'ap-southeast-1',

//       // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
//       // Required only if it's different from Amazon Cognito Region
//       // identityPoolRegion: 'XX-XXXX-X',

//       // OPTIONAL - Amazon Cognito User Pool ID
//       userPoolId: 'ap-southeast-1_68of3yAqm',

//       // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//       userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',

//       // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//       mandatorySignIn: false,

//       // OPTIONAL - Configuration for cookie storage
//       // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//       cookieStorage: {
//       // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//           domain: '.yourdomain.com',
//       // OPTIONAL - Cookie path
//           path: '/',
//       // OPTIONAL - Cookie expiration in days
//           expires: 365,
//       // OPTIONAL - Cookie secure flag
//       // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//           secure: true
//       },

//       // OPTIONAL - customized storage object
//       storage: MyStorage,

//       // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//       authenticationFlowType: 'USER_PASSWORD_AUTH',

//       // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//       clientMetadata: { myCustomKey: 'myCustomValue' },

//        // OPTIONAL - Hosted UI configuration
//       oauth: {
//           domain: 'your_cognito_domain',
//           scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//           redirectSignIn: 'http://localhost:3000/',
//           redirectSignOut: 'http://localhost:3000/',
//           responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
//       }
//   }
// });

// // You can get the current config object
// const currentConfig = Auth.configure();

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
        dispatch(updateUserToken(response.getIdToken().getJwtToken()));
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
