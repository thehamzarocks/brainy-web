import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePageContent from "./HomePageContent";
import Layout from "./Layout";
import StartPage from "./StartPage";
import ScratchFile from "./ScratchFile";

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

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/about">
              <Typography
                variant="h5"
                className={classes.sectionPlaceHolder}
                gutterBottom
              >
                About Section
              </Typography>
            </Route>
            <Route path="/start">
              <StartPage/>
            </Route>
            <Route path = "/files/:fileId">
              <ScratchFile/>
            </Route>
            <Route path="/scratchFile">
              <ScratchFile/>
            </Route>
            <Route path="/">
              <HomePageContent />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Container>
  );
}

export default App;
