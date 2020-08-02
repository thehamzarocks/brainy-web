import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTagOptions,
  selectCurrentFile,
  updateFile,
} from "./store/fileSlice";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const Accordion = withStyles({
  root: {
    backgroundColor: "#f3edcd",
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: "rgba(0, 0, 0, .03)",
    backgroundColor: "#f3edcd",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 0,
    "&$expanded": {
      minHeight: 0,
    },
  },
  content: {
    margin: "5px 5px 5px 5px",
    "&$expanded": {
      margin: "5px 5px 5px 5px",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function Tag() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentFile = useSelector(selectCurrentFile);
  const tagOptions = useSelector(selectTagOptions);

  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleTagChange = (event, newValue) => {
    const updatedFile = { ...currentFile, tags: newValue };
    dispatch(updateFile(updatedFile));
  };

  const handleTagSelectorBlur = (event) => {};

  return (
    <>
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Tags</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.root}>
            <Autocomplete
              onBlur={handleTagSelectorBlur}
              multiple
              autoSelect="true"
              id="tags-standard"
              options={tagOptions}
              freeSolo="true"
              filterSelectedOptions
              value={currentFile?.tags ?? []}
              onChange={handleTagChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Tags"
                  placeholder="File Tags"
                />
              )}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
