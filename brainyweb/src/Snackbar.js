import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { selectActionStatus, updateActionStatus } from "./store/fileSlice";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleSnackbar() {
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const actionStatus = useSelector(selectActionStatus);

  const open = actionStatus?.status !== "";

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(updateActionStatus({ status: "", statusMessage: "" }));
  };

  const getStatusSeverity = () => {
    let severity = "";
    switch (actionStatus?.status) {
      case "pending":
        severity = "info";
        break;
      case "success":
        severity = "success";
        break;
      case "error":
        severity = "error";
        break;
    }
    return severity;
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        // message={actionStatus.statusMessage}
      >
        <React.Fragment>
          <Alert onClose={handleClose} severity={getStatusSeverity()}>
            {actionStatus.statusMessage}
          </Alert>

          {/* <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton> */}
        </React.Fragment>
      </Snackbar>
    </div>
  );
}
