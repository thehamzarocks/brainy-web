import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { makeStyles } from "@material-ui/core/styles";
import TaskAccordion from "./TaskAccordion";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentFile, updateFile } from "./store/fileSlice";

const useStyles = makeStyles(() => ({
  taskList: {
    paddingLeft: 0
  }
}));

const SortableItem = SortableElement(({ value, changeTaskSummary }) => {
  return (
    <>
      <TaskAccordion taskId={value.taskId} />
    </>
  );
});

const compareTaskPriorities = (task1, task2) => {
  if (task1.priority < task2.priority) {
    return -1;
  }
  if (task1.priority > task2.priority) {
    return 1;
  }
  return 0;
};

const SortableList = SortableContainer(({ items, changeTaskSummary }) => {
  const classes = useStyles();
  const tasks = [...items];
  tasks.sort(compareTaskPriorities);
  return (
    <ul className={classes.taskList}>
      {tasks.map((value, index) => (
        <SortableItem
          changeTaskSummary={(event) => changeTaskSummary(event, value.id)}
          key={`item-${value.id}`}
          index={index}
          value={value}
        />
      ))}
    </ul>
  );
});

function SortableComponent() {
  const dispatch = useDispatch();
  const currentFile = useSelector(selectCurrentFile);

  const tasks = currentFile.tasks || [];

  const updateTaskPriorities = (tasks, oldIndex, newIndex) => {
    if (oldIndex < newIndex) {
      return tasks.map((task) => {
        if (task.priority > oldIndex && task.priority <= newIndex) {
          return { ...task, priority: task.priority - 1 };
        }
        if (task.priority === oldIndex) {
          return { ...task, priority: newIndex };
        }
        return { ...task };
      });
    }

    if (oldIndex > newIndex) {
      return tasks.map((task) => {
        if (task.priority >= newIndex && task.priority < oldIndex) {
          return { ...task, priority: task.priority + 1 };
        }
        if (task.priority === oldIndex) {
          return { ...task, priority: newIndex };
        }
        return { ...task };
      });
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }
    const updatedTasks = updateTaskPriorities(tasks, oldIndex, newIndex);
    const updatedFile = { ...currentFile, tasks: updatedTasks };
    dispatch(updateFile(updatedFile));
  };

  const changeTaskSummary = (event, id) => {
    const updatedTasks = [...tasks];
    updatedTasks.forEach((task) => {
      if (task.id === id) {
        task.summary = event.target.value;
      }
    });
  };

  return (
    <>
      <SortableList
        changeTaskSummary={changeTaskSummary}
        pressDelay={200}
        items={tasks}
        onSortEnd={onSortEnd}
      />
    </>
  );
}
export default SortableComponent;
