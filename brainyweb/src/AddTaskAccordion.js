import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentFile, updateFile } from "./store/fileSlice";

const useStyles = makeStyles((theme) => ({
  addTaskBar: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(2),
  },
  addTaskBarInput: {
    border: "1px solid #becad6",
    paddingLeft: "10px",
    paddingTop: "5px"
  },
  root: {
    justifyContent: "center",
  },
  sectionPlaceHolder: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function AddTaskAccordion() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentFile = useSelector(selectCurrentFile);

  const [newTaskSummary, setNewTaskSummary] = React.useState("");

  const handleAddTaskChange = (event) => {
    setNewTaskSummary(event.target.value);
  };

  const handleAddTask = () => {
    const updatedTasks = [...currentFile.tasks];
    updatedTasks.push({
      taskId: currentFile.key + currentFile.tasks.length,
      priority: currentFile.tasks.length,
      taskLog: "",
      taskSummary: newTaskSummary,
    });

    const updatedFile = { ...currentFile, tasks: updatedTasks };
    dispatch(updateFile(updatedFile));
    setNewTaskSummary("");
  };

  //   return (<React.Fragment/>)
  return (
    <div className={classes.addTaskBar}>
      <TextField
        className={classes.addTaskBarInput}
        spellCheck="false"
        fullWidth={true}
        rows="3"
        id="addTaskText"
        multiline
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
        InputProps={{ disableUnderline: true }}
        placeholder="Add Task"
        value={newTaskSummary}
        onChange={handleAddTaskChange}
      />
      <Button onClick={handleAddTask}>
        <AddCircleIcon />
      </Button>
    </div>
  );
}
