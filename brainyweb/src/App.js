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
import { useDispatch } from "react-redux";
import { addFiles } from "./store/fileSlice";
import About from "./Tag";
import { createMuiTheme } from "@material-ui/core/styles";

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0b4644",
      secondary: "#146d65",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  sectionPlaceHolder: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://lyjcnc.deta.dev/files/")
      .then(function (response) {
        dispatch(addFiles(response.data[0]));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Container maxWidth="sm" className={classes.root}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/start">
                <StartPage />
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
      </Container>
    </ThemeProvider>
  );
}

export default App;
