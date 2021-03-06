import React from "react";
import { Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import {
  updateActionStatus,
  selectUserToken,
  updateFile,
} from "./store/fileSlice";

// Warning: This assumes that the currentFile is indeed the one in the redux store. Otherwise the reducers won't work correctly.
// Need to add a fileId to the redux payload to check for matches to avoid this issue.
const SharingButton = ({ currentFile }) => {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);

  if (!userToken) {
    return (
      <Button disabled>
        <LockOutlinedIcon />
      </Button>
    );
  }

  if (!currentFile) {
    return (
      <Button disabled>
        <LockOutlinedIcon />
      </Button>
    );
  }

  const sharable = currentFile.shared;

  const changeSharedStatus = (sharedStatus) => {
    const sharedStatusPendingMessage = sharedStatus
      ? "Making File Sharable"
      : "Making File Private";
    const sharedStatusSuccessMessage = sharedStatus
      ? "Made File Sharable"
      : "Made File Private";
    const sharedStatusFailureMessage = sharedStatus
      ? "Failed To Make File Sharable"
      : "Failed To Make File Private";
    const updatedFile = { ...currentFile, shared: sharedStatus };
    dispatch(
      updateActionStatus({
        status: "pending",
        statusMessage: sharedStatusPendingMessage,
      })
    );
    Axios.put("https://5q71jg.deta.dev/files/" + updatedFile.key, updatedFile, {
      headers: {
        "google-auth-token": userToken,
      },
    })
      .then((response) => {
        dispatch(
          updateActionStatus({
            status: "success",
            statusMessage: sharedStatusSuccessMessage,
          })
        );
        dispatch(updateFile(updatedFile));
      })
      .catch((error) => {
        dispatch(
          updateActionStatus({
            status: "error",
            statusMessage: sharedStatusFailureMessage,
          })
        );
      });
  };

  if (sharable) {
    return (
      <Button onClick={() => changeSharedStatus(false)}>
        <LockOpenOutlinedIcon />
      </Button>
    );
  }

  return (
    <Button onClick={() => changeSharedStatus(true)}>
      <LockOutlinedIcon />
    </Button>
  );
};
export default SharingButton;
