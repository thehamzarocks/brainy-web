import React from "react";
import { Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  updateActionStatus,
  selectUserToken,
  deleteFile,
  clearDirtyState,
} from "./store/fileSlice";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const DeleteFileButton = ({ currentFile }) => {
  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const history = useHistory();

  if (!currentFile) {
    return;
  }

  const openDeleteAlert = () => {
    setDeleteAlertOpen(true);
  };

  const closeDeleteAlert = () => {
    setDeleteAlertOpen(false);
  };

  const handleDelete = (event) => {
    dispatch(
      updateActionStatus({
        status: "pending",
        statusMessage: "Deleting File...",
      })
    );
    Axios.delete("https://lyjcnc.deta.dev/files/" + currentFile.key, {
      headers: {
        "google-auth-token": userToken,
      },
    })
      .then((response) => {
        console.log("Delete succesful!");
        dispatch(
          updateActionStatus({
            status: "success",
            statusMessage: "Deleted successfully",
          })
        );
        dispatch(deleteFile(currentFile));
        dispatch(clearDirtyState());
        history.push("/start");
      })
      .catch((error) => {
        dispatch(
          updateActionStatus({
            status: "error",
            statusMessage: "Error Deleting File",
          })
        );
      });
  };

  return (
    <React.Fragment>
      <Button onClick={openDeleteAlert} color="default">
        <DeleteOutlineIcon />
      </Button>
      <Dialog
        open={deleteAlertOpen}
        onClose={closeDeleteAlert}
        aria-labelledby="delete-file-alert"
        aria-describedby="confirm-file-deletion"
      >
        <DialogTitle id="delete-file-alert-title">
          {"Delete file " + currentFile.fileName + "?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you wish to delete the file " +
              currentFile.fileName +
              "? This operation is irreversible."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteAlert} color="primary">
            No, I've changed my mind
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes, I don't need this file anymore
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default DeleteFileButton;
