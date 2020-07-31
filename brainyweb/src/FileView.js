import React, { useEffect } from "react";
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
  updateFile,
  updateCurrentFile,
  deleteFile,
} from "./store/fileSlice";
import axios from "axios";
import Tag from "./Tag";
import TabPanel, { tabProp } from "./TabPanel";

const useStyles = makeStyles(() => ({
  tabPanel: {
    display: "flex",
  },
  tab: {
    alignSelf: "flex-end",
  },
  fileHeader: {
    display: "flex",
    flexDirection: "row",
  },
  fileName: {
    flexGrow: "1",
  },
  tags: {
    flexGrow: "3",
  },
}));

function ScatchFile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  let { fileId } = useParams();

  const currentFile = useSelector((state) => selectFile(state, fileId)) ?? {};

  useEffect(() => {
    dispatch(updateCurrentFile(fileId));
  }, [dispatch, fileId]);

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleInfoChange = (event) => {
    // setInfoValue(event.target.value);
    const updatedCurrentFile = { ...currentFile };
    updatedCurrentFile.info = event.target.value;
    dispatch(updateFile(updatedCurrentFile));
  };

  const handleSave = (event) => {
    axios
      .put("https://lyjcnc.deta.dev/files/" + currentFile.key, currentFile)
      .then((response) => {
        console.log("Save succesful!");
      });
  };

  const handleDelete = (event) => {
    axios
      .delete("https://lyjcnc.deta.dev/files/" + currentFile.key)
      .then((response) => {
        console.log("Delete succesful!");
        dispatch(deleteFile(currentFile));
        history.push("/start");
      });
  };

  return (
    <React.Fragment>
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
