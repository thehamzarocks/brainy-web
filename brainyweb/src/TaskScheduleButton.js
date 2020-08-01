import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { updateFile } from "./store/fileSlice";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ScheduleIcon from "@material-ui/icons/Schedule";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  greenTaskStatus: {
    color: "green",
  },
  orangeTaskStatus: {
    color: "orange",
  },
  redTaskStatus: {
    color: "red",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const TaskScheduleButton = ({ currentFile, currentTask }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopupClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handlePopupClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleTaskDueDateChange = (event) => {
    event.stopPropagation();
    const updatedTask = { ...currentTask };
    updatedTask.taskDueDate = event.target.value;
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

  const scheduleButtonClass = () => {
    if (!currentTask.taskDueDate) {
      return;
    }
    let taskScheduleClass = null;
    if (currentTask.taskStatus === "Completed") {
      return classes.greenTaskStatus;
    }

    const dueDateDate = new Date(currentTask.taskDueDate);
    if (dueDateDate < new Date()) {
      return classes.redTaskStatus;
    }
    const nextDayDate = new Date();
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    if (dueDateDate < nextDayDate) {
      return classes.orangeTaskStatus;
    }
    return classes.greenTaskStatus;
  };

  return (
    <>
      <Button className={scheduleButtonClass()} onClick={handlePopupClick}>
        <WatchLaterIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopupClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <TextField
          id="taskDueDate"
          label="Due Date"
          type="datetime-local"
          className={classes.greenTaskStatus}
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          value={currentTask.taskDueDate}
          onChange={handleTaskDueDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Popover>
    </>
  );
};
export default TaskScheduleButton;
