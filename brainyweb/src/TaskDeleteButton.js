import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { updateFile } from "./store/fileSlice";

const TaskDeleteButton = ({ currentFile, currentTask }) => {
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

  const handleTaskDelete = (event) => {
    event.stopPropagation();
    let updatedTasksList = currentFile.tasks.filter((task) => {
      return task.taskId !== currentTask.taskId;
    });
    const deletedTaskPriority = currentTask.priority;
    updatedTasksList = updatedTasksList.map(task => {
      if(task.priority < deletedTaskPriority) {
        return task;
      }
      return {... task, priority: task.priority - 1};
    })
    
    const updatedFile = { ...currentFile, tasks: updatedTasksList };
    dispatch(updateFile(updatedFile));
    handlePopupClose(event);
  };

  return (
    <>
      <Button onClick={handlePopupClick}>
        <DeleteIcon />
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
        <Typography>
          <div>
            <Button onClick={handleTaskDelete}>
              <DeleteIcon />
            </Button>
            <Button onClick={handlePopupClose}>
              <CancelIcon />
            </Button>
          </div>
        </Typography>
      </Popover>
    </>
  );
};
export default TaskDeleteButton;
