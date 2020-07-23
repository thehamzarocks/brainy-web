import React from "react";
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
    setInfoValue(event.target.value);
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
            <Typography variant="h6">Add Task</Typography>
            <TextField
              spellCheck="false"
              fullWidth={true}
              rows="3"
              id="standard-multiline-flexible"
              multiline
              value={taskValue}
              onChange={handleTaskChange}
            />
            <SortableComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextField
              spellCheck="false"
              fullWidth={true}
              rows="30"
              id="standard-multiline-flexible"
              multiline
              value={infoValue}
              onChange={handleInfoChange}
            />
          </TabPanel>
        </div>
      </form>
    </React.Fragment>
  );
}
export default ScatchFile;
