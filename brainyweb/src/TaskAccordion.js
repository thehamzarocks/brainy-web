import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { selectCurrentFile, updateFile } from "./store/fileSlice";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TaskDeleteButton from "./TaskDeleteButton";
import TaskScheduleButton from "./TaskScheduleButton";
import DragHandleIcon from '@material-ui/icons/DragHandle';

const Accordion = withStyles((theme) => ({
  root: {
    // border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "0px 0px 1px 2px #f3f3ad",
    // boxShadow: "none",
    // margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: "#f3f3ad5c",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    // "&$expanded": {
    //   margin: "auto",
    // },
  },
  expanded: {},
}))(MuiAccordion);

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

const useStyles = makeStyles(() => ({
  completedTaskColour: {
    color: "green",
  },
}));

export default function TaskAccordion(props) {
  const classes = useStyles();
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

  const taskStatusIcon = () => {
    if (currentTask.taskStatus !== "Completed") {
      return <CheckCircleIcon />;
    }
    return <CheckCircleIcon className={classes.completedTaskColour} />;
  };

  const handleTaskStatusChange = (event) => {
    event.stopPropagation();
    const updatedTask = { ...currentTask };
    updatedTask.taskStatus =
      updatedTask.taskStatus !== "Completed" ? "Completed" : "Todo";
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
            id="taskSummaryText"
            multiline
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            value={currentTask.taskSummary}
            onChange={handleTaskSummaryChange}
          />

          <Typography>
            <Button onClick={handleTaskStatusChange}>{taskStatusIcon()}</Button>
            <TaskScheduleButton currentFile={currentFile} currentTask={currentTask}/>
            <TaskDeleteButton currentFile={currentFile} currentTask={currentTask}/>
            {/* <Button onClick={() => console.log("hello")}>
              <ArrowDropDownCircleIcon />
            </Button> */}
            <Button>
              <DragHandleIcon/>
            </Button>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            spellCheck="false"
            fullWidth={true}
            rows="5"
            id="taskLogText"
            multiline
            value={currentTask.taskLog}
            onChange={handleTaskLogChange}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
