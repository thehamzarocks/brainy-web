import React from "react";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { updateActionStatus } from "./store/fileSlice";

export const CopyShareableButton = ({ currentFile }) => {
  const { fileId } = useParams();
  const dispatch = useDispatch();

  if (!fileId || !currentFile || !currentFile.shared) {
    return <React.Fragment />;
  }

  const showCopiedNotification = () => {
    dispatch(
        updateActionStatus({
          status: "success",
          statusMessage: "Copied shareable link!",
        })
      );
  }

  const shareableLink = "brainylog.me/share/" + fileId;
  return (
    <CopyToClipboard text={shareableLink}
    onCopy={showCopiedNotification}>
      <Button>
        <FileCopyOutlinedIcon />
      </Button>
    </CopyToClipboard>
  );
};
