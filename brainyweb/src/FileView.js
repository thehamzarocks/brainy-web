import React, { useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SortableComponent from "./sortable";
import AddTaskAccordion from "./AddTaskAccordion";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFile,
  selectUserToken,
  updateFile,
  updateCurrentFile,
  deleteFile,
  updateActionStatus,
  selectAllFiles,
  selectIsDirtyState,
  clearDirtyState
} from "./store/fileSlice";
import axios from "axios";
import Tag from "./Tag";
import TabPanel, { tabProp } from "./TabPanel";
import { Prompt } from "react-router";

const useStyles = makeStyles((theme) => ({
  tabPanel: {
    display: "flex",
  },
  tab: {
    alignSelf: "flex-end",
  },
  fileHeader: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  fileName: {
    flexGrow: "1",
  },
  tags: {
    flexGrow: "3",
    margin: theme.spacing(2),
  },
}));

function ScatchFile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  let { fileId } = useParams();
  let { matchIndex } = useParams();

  const filesList = useSelector(selectAllFiles);
  const currentFile = useSelector((state) => selectFile(state, fileId)) ?? {};
  const userToken = useSelector(selectUserToken);
  const shouldBlockNavigation = useSelector(selectIsDirtyState);

  if (shouldBlockNavigation) {
    window.onbeforeunload = () => true;
  } else {
    window.onbeforeunload = undefined;
  }

  const setSelectionRange1 = (textArea, selectionStart, selectionEnd) => {
    textArea.focus();

    const fullText = textArea.value;
    textArea.value = fullText.substring(0, selectionEnd);
    textArea.scrollTop = textArea.scrollHeight;
    textArea.value = fullText;

    textArea.setSelectionRange(selectionStart, selectionEnd);
  };

  const scrollToMatch = useCallback((matchIndex) => {
    const selectionStart = Math.max(matchIndex - 50, 0);
    const selectionEnd = selectionStart + 100;
    console.log("scrolling to match");
    var textArea1 = document.getElementById("infoText");
    console.log(textArea1);
    setSelectionRange1(textArea1, selectionStart, selectionEnd);
  }, []);

  useEffect(() => {
    dispatch(updateCurrentFile(fileId));
    if (matchIndex) {
      scrollToMatch(matchIndex);
    } else {
      setTabIndex(0);
    }
  }, [dispatch, fileId, scrollToMatch, matchIndex]);

  const [tabIndex, setTabIndex] = React.useState(1);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleInfoChange = (event) => {
    // setInfoValue(event.target.value);
    const updatedCurrentFile = { ...currentFile };
    updatedCurrentFile.info = event.target.value || "";
    dispatch(updateFile(updatedCurrentFile));
  };

  const handleSave = (event) => {
    dispatch(
      updateActionStatus({ status: "pending", statusMessage: "Saving File..." })
    );
    dispatch(clearDirtyState())
    axios
      .put("https://lyjcnc.deta.dev/files/" + currentFile.key, currentFile, {
        headers: {
          "google-auth-token": userToken,
        },
      })
      .then((response) => {
        console.log("Save succesful!");
        dispatch(
          updateActionStatus({
            status: "success",
            statusMessage: "Saved successfully",
          })
        );
      })
      .catch((error) => {
        dispatch(
          updateActionStatus({
            status: "error",
            statusMessage: "Error Saving File",
          })
        );
      });
    try {
      window.localStorage.setItem("filesList", JSON.stringify(filesList));
    } catch (error) {
      console.log("Unable to save to localstorage", error);
    }
  };

  const handleDelete = (event) => {
    dispatch(
      updateActionStatus({
        status: "pending",
        statusMessage: "Deleting File...",
      })
    );
    axios
      .delete("https://lyjcnc.deta.dev/files/" + currentFile.key, {
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
      <Prompt
        when={shouldBlockNavigation}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <div className={classes.fileHeader}>
        <div className={classes.fileName}>
          <Typography variant="h6">{currentFile.fileName}</Typography>
        </div>
        <div>
          <Button onClick={handleDelete} color="default">
            Delete
          </Button>
        </div>
        <div>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </div>
      </div>
      <div className={classes.tags}>
        <Tag />
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <Tabs
            variant="fullWidth"
            className={classes.tabPanel}
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="file tabs"
          >
            <Tab className={classes.tab} label="Tasks" {...tabProp(0)} />

            <Tab className={classes.tab} label="Information" {...tabProp(1)} />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <AddTaskAccordion />
            <SortableComponent />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <TextField
              spellCheck="false"
              fullWidth={true}
              rows="30"
              id="infoText"
              multiline
              value={currentFile.info}
              onChange={handleInfoChange}
            />
          </TabPanel>
        </div>
      </form>
    </React.Fragment>
  );
}
export default ScatchFile;
