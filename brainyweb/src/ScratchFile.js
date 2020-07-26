import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import SortableComponent from "./sortable";
import AddTaskAccordions from "./AddTaskAccordion";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectFile, updateFile, updateCurrentFile } from "./store/fileSlice";
import axios from "axios";

const useStyles = makeStyles(() => ({
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function ScatchFile() {
  const classes = useStyles();

  const dispatch = useDispatch();

  let { fileId } = useParams();
  let currentFile = useSelector((state) => selectFile(state, fileId));
  dispatch(updateCurrentFile(fileId));

  const [value, setValue] = React.useState(0);
  const [taskValue, setTaskValue] = React.useState("");
  const [infoValue, setInfoValue] = React.useState("");

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTaskChange = (event, newValue) => {
    setTaskValue(event.target.value);
  };

  const handleInfoChange = (event, newValue) => {
    // setInfoValue(event.target.value);
    const updatedCurrentFile = { ...currentFile };
    updatedCurrentFile.info = event.target.value;
    dispatch(updateFile(updatedCurrentFile));
  };

  return (
    <React.Fragment>
      <div className={classes.fileHeader}>
        <div className={classes.fileName}>
          <Typography variant="h5">Scratch File</Typography>
        </div>
        <div className={classes.tags}>
          <Typography variant="h6">Tags: scratchfile</Typography>
        </div>
        <div>
          <Button color="default">Actions</Button>
        </div>
        <div>
          <Button color="primary">Save</Button>
        </div>
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="file tabs">
              <Tab label="Tasks" {...a11yProps(0)} />
              <Tab label="Information" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <AddTaskAccordions />
            <SortableComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextField
              spellCheck="false"
              fullWidth={true}
              rows="30"
              id="standard-multiline-flexible"
              multiline
              value={currentFile.info}
              onChange={handleInfoChange}
            />
          </TabPanel>
        </div>
        å
      </form>
    </React.Fragment>
  );
}
export default ScatchFile;
