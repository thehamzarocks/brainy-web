import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Accordion = withStyles({
  root: {
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
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function AddTaskAccordion() {
  const [expanded, setExpanded] = React.useState("");
  const [newTaskSummary, setNewTaskSummary] = React.useState("");
  //   const [infoValue, setInfoValue] = React.useState("some info");

  //   const handleInfoChange = (event) => {
  //     setInfoValue(event.target.value);
  //   };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAddTaskChange =  (event) => {
    setNewTaskSummary(event.target.value);
  };

//   return (<React.Fragment/>)
  return (
    <div>
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="h6">
            Add Task
            <Button onClick={() => console.log("hello")}>
              <AddCircleIcon />
            </Button>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            spellCheck="false"
            fullWidth={true}
            rows="3"
            id="standard-multiline-flexible"
            multiline
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            value={newTaskSummary}
            onChange={handleAddTaskChange}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
