import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  startButton: {
    margin: theme.spacing(1),
    // textAlign: "center",
    // justifyContent: "center",
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            BrainyLog
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h3" className={classes.paper} gutterBottom>
        Your memory, online
      </Typography>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.startButton}
        >
          Get Started
        </Button>
      </Grid>
      <Typography variant="h5" className={classes.paper} gutterBottom>
        Log anything, anytime
      </Typography>
      <Typography variant="h5" className={classes.paper} gutterBottom>
        Keep up to date with todos
      </Typography>
      <Typography variant="h5" className={classes.paper} gutterBottom>
        Keep memories at your fingertips
      </Typography>
      <Typography variant="h5" className={classes.paper} gutterBottom>
        Share your research
      </Typography>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.startButton}
        >
          Learn More
        </Button>
      </Grid>
    </Container>
  );
}

export default App;
