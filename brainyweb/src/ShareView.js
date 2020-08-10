import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  updateActionStatus,
  selectAllFiles,
  addFiles,
  selectUserToken,
} from "./store/fileSlice";
import { TextField, makeStyles, Typography, Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import Tag from "./Tag";

const useStyles = makeStyles((theme) => ({
  sharedFileName: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  sharedFileBar: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
  fileNameInput: {
    border: "1px solid #becad6",
    paddingLeft: "10px",
    flexGrow: "3",
    marginRight: "10px",
    marginLeft: "10px",
    paddingTop: "3px",
  },
  info: {
    paddingTop: theme.spacing(3),
  },
}));

const ShareView = () => {
  const classes = useStyles();
  let { fileId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const files = useSelector(selectAllFiles);
  const userToken = useSelector(selectUserToken);

  const [sharedFile, setSharedFile] = React.useState({
    fileName: "Getting file name...",
  });
  const [newFileName, setNewFileName] = React.useState("");

  //TODO: change this to actually fetch the token
  //   const userToken = "wowthisisspecial";

  useEffect(() => {
    if (!userToken) {
      return;
    }
    dispatch(
      updateActionStatus({
        status: "pending",
        statusMessage: "Fetching Shared File Info...",
      })
    );
    Axios.get("https://lyjcnc.deta.dev/files/" + fileId + "?shared=true", {
      headers: {
        "google-auth-token": userToken,
      },
    })
      .then(function (response) {
        dispatch(
          updateActionStatus({
            status: "success",
            statusMessage: "Fetched Shared File",
          })
        );
        setSharedFile(response.data);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          updateActionStatus({
            status: "error",
            statusMessage: "Error Fetching Shared File",
          })
        );
      });
  }, [dispatch, fileId, userToken]);

  const saveSharedFile = () => {
    if (!newFileName.replace(/\s/g, "").length) {
      dispatch(
        updateActionStatus({
          status: "error",
          statusMessage: "File name cannot be all blanks",
        })
      );
      return;
    }
    dispatch(
      updateActionStatus({
        status: "pending",
        statusMessage: "Saving File...",
      })
    );
    Axios.post(
      "https://lyjcnc.deta.dev/files/",
      {
        fileName: newFileName,
        userEmail: "",
        info: sharedFile.info,
        tags: sharedFile.tags,
        tasks: [],
      },
      {
        headers: {
          "google-auth-token": userToken,
        },
      }
    )
      .then((response) => {
        const updatedFilesList = [...files, response.data];
        dispatch(
          updateActionStatus({
            status: "success",
            statusMessage: "File Saved",
          })
        );
        dispatch(addFiles(updatedFilesList));
        setNewFileName("");
        history.push("/files/" + response.data.key)
      })
      .catch((error) => {
        dispatch(
          updateActionStatus({
            status: "error",
            statusMessage: "Error Creating File",
          })
        );
      });
  };

  const handleInfoChange = (event) => {
    setSharedFile({ ...sharedFile, info: event.target.value });
  };

  const handleTagChange = (newValue) => {
    setSharedFile({ ...sharedFile, tags: newValue });
  };

  if (!userToken) {
    return <Typography>Sign In to get started</Typography>;
  }

  return (
    <React.Fragment>
      <Typography className={classes.sharedFileName}>
        {sharedFile.fileName}
      </Typography>
      <Typography>Save this note:</Typography>
      <div className={classes.sharedFileBar}>
        <TextField
          value={newFileName}
          onChange={(event) => setNewFileName(event.target.value)}
          placeholder="New file name"
          className={classes.fileNameInput}
          InputProps={{ disableUnderline: true }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "new-file-name" }}
        />
        <Button onClick={saveSharedFile}>
          <CheckIcon />
        </Button>
      </div>

      <div className={classes.tags}>
        <Tag fileProp={sharedFile} handleFilePropUpdate={handleTagChange} />
      </div>

      <TextField
        spellCheck="false"
        fullWidth={true}
        rows="30"
        id="infoText"
        multiline
        value={sharedFile.info}
        className={classes.info}
        onChange={handleInfoChange}
      />
    </React.Fragment>
  );
};
export default ShareView;
