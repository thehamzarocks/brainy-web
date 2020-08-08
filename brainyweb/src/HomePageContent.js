import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  hompageInfo: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  startButton: {
    margin: theme.spacing(1),
  },
}));

function HomePageContent() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h3" className={classes.hompageInfo} gutterBottom>
        Your memory, online
      </Typography>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={"/start"}
          className={classes.startButton}
        >
          Get Started
        </Button>
      </Grid>

      <Typography variant="h5" className={classes.hompageInfo} gutterBottom>
        Log anything, anytime
      </Typography>
      <Typography variant="h5" className={classes.hompageInfo} gutterBottom>
        Stay up to date with todos
      </Typography>
      <Typography variant="h5" className={classes.hompageInfo} gutterBottom>
        Keep memories at your fingertips
      </Typography>
      <Typography variant="h5" className={classes.hompageInfo} gutterBottom>
        Get Intelligent Reminders
      </Typography>

      <Grid container justify="center">
        <Link to="/about" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.startButton}
          >
            Learn More
          </Button>
        </Link>
      </Grid>
    </React.Fragment>
  );
}
export default HomePageContent;
