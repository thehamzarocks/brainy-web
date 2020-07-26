import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { selectCurrentFile, updateFile } from "./store/fileSlice";
import { useDispatch, useSelector } from "react-redux";

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

export default function TaskAccordion(props) {
  const [expanded, setExpanded] = React.useState("");

  const dispatch = useDispatch();

  const currentFile = useSelector(selectCurrentFile);
  const currentTask = currentFile.tasks.find((task) => {
    return task.taskId === props.taskId;
  });
  //   const [infoValue, setInfoValue] = React.useState("some info");

  //   const handleInfoChange = (event) => {
  //     setInfoValue(event.target.value);
  //   };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleTaskSummaryChange = (event) => {
    const updatedTask = { ...currentTask };
    updatedTask.taskSummary = event.target.value;
    const updatedTasksList = currentFile.tasks.map((task) => {
      if (task.taskId !== currentTask.taskId) {
        // This isn't the item we care about - keep it as-is
        return task;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...task,
        ...updatedTask,
      };
    });

    const updatedFile = { ...currentFile, tasks: updatedTasksList };
    dispatch(updateFile(updatedFile));
  };

  const handleTaskLogChange = (event) => {
    const updatedTask = { ...currentTask };
    updatedTask.taskLog = event.target.value;
    const updatedTasksList = currentFile.tasks.map((task) => {
      if (task.taskId !== currentTask.taskId) {
        // This isn't the item we care about - keep it as-is
        return task;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...task,
        ...updatedTask,
      };
    });

    const updatedFile = { ...currentFile, tasks: updatedTasksList };
    dispatch(updateFile(updatedFile));
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <TextField
            spellCheck="false"
            fullWidth={true}
            rows="3"
            id="standard-multiline-flexible"
            multiline
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            value={currentTask.taskSummary}
            onChange={handleTaskSummaryChange}
          />
          <Typography variant="h6">
            <Button onClick={() => console.log("hello")}>
              <AddCircleIcon />
            </Button>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            spellCheck="false"
            fullWidth={true}
            rows="5"
            id="standard-multiline-flexible"
            multiline
            value={currentTask.taskLog}
            onChange={handleTaskLogChange}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
