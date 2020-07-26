import React from "react";
// import {render} from 'react-dom';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Typography } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import TaskAccordion from "./TaskAccordion";
import { useSelector } from "react-redux";
import { selectCurrentFile } from "./store/fileSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  sectionPlaceHolder: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const SortableItem = SortableElement(({ value, changeTaskSummary }) => {
  const classes = useStyles();
  return (
    <>
      <TaskAccordion
        taskId={value.taskId}
      />
    </>
  );
});

const SortableList = SortableContainer(({ items, changeTaskSummary }) => {
  return (
    <ul>
      {items.map((value, index) => (
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
  const classes = useStyles();
  const currentFile = useSelector(selectCurrentFile);

  const tasks = currentFile.tasks;
  // const [tasks, setTasks] = React.useState([
  //   { summary: "hello", description: "this is a hello task", id: 123 },
  //   { summary: "there", description: "this is a there task", id: 512 },
  //   { summary: "go", description: "this is a go task", id: 756 },
  //   { summary: "nice", description: "this is a nice task", id: 534534512 },
  //   { summary: "wowsss", description: "this is a wowss task", id: 523512 },
  //   { summary: "try", description: "this is a try task", id: 512342 },
  // ]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    //TODO: implement
    // setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  const changeTaskSummary = (event, id) => {
    const updatedTasks = [...tasks];
    updatedTasks.forEach((task) => {
      if (task.id === id) {
        task.summary = event.target.value;
      }
    });
    //   updatedTasks[0].text = event.target.value;
    console.log(event.target);
    console.log(id);
    // setTasks(updatedTasks);
  };

  return (
    <>
      <SortableList
        changeTaskSummary={changeTaskSummary}
        pressDelay={200}
        items={tasks}
        onSortEnd={onSortEnd}
      />
      ;
    </>
  );

  return <SortableList items={tasks} onSortEnd={onSortEnd} />;
}
export default SortableComponent;
