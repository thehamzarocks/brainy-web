import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

function HeaderBar() {
  const classes = useStyles();
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
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
export default HeaderBar;
