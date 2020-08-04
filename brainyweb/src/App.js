import React, { useEffect } from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePageContent from "./HomePageContent";
import Layout from "./Layout";
import StartPage from "./StartPage";
import FileView from "./FileView";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToken, updateActionStatus, addFiles } from "./store/fileSlice";
import About from "./Tag";
import { createMuiTheme } from "@material-ui/core/styles";

import { Auth } from "aws-amplify";
import SimpleSnackbar from "./Snackbar";

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0b4644",
      secondary: "pink",
      text: "pink"
    },
  },
});

export const mainStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  textColor: {
    color: "pink"
  },
  sectionPlaceHolder: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = mainStyles();
  const dispatch = useDispatch();

  const userToken = useSelector(selectUserToken);

  useEffect(() => {
    if (!userToken) {
      return;
    }
    dispatch(updateActionStatus({status: "pending", statusMessage: "Fetching Your Files..."}));
    axios
      .get("https://lyjcnc.deta.dev/files/", {
        headers: {
          "google-auth-token": userToken
        }
      })
      .then(function (response) {
        dispatch(updateActionStatus({status: "success", statusMessage: "Fetched Your Files"}));
        dispatch(addFiles(response.data[0]));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateActionStatus({status: "error", statusMessage: "Error Fetching Your Files, using local data instead"}));
        const filesList = window.localStorage.getItem("filesList");
        if (!filesList) {
          dispatch(updateActionStatus({status: "error", statusMessage: "Unable to fetch your files"}));
        }
        dispatch(addFiles(JSON.parse(filesList)));
      });
  }, [dispatch, userToken]);

  if(!userToken) {
    window.href = "/";
  }
  return (
    <ThemeProvider theme={mainTheme}>
      <Container  className={classes.root}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/start">
                <StartPage />
              </Route>
              <Route path="/files/:fileId/:matchIndex">
                <FileView />
              </Route>
              <Route path="/files/:fileId">
                <FileView />
              </Route>
              <Route path="/">
                <HomePageContent />
              </Route>
            </Switch>
          </Layout>
        </Router>
        <SimpleSnackbar/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
