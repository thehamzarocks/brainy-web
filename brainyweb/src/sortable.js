import React from "react";
// import {render} from 'react-dom';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Typography } from "@material-ui/core";

const SortableItem = SortableElement(({ index, value }) => {
  return (
    <Typography variant="h6">
      <li>{value.text}</li>
      {value.id}
    </Typography>
  );
});

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

function SortableComponent() {
  const [tasks, setTasks] = React.useState([
    { text: "hello", id: 123 },
    { text: "there", id: 512 },
    { text: "go", id: 756 },
    { text: "nice", id: 534534512 },
    { text: "wow", id: 523512 },
    { text: "try", id: 512342 },
  ]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  return <SortableList items={tasks} onSortEnd={onSortEnd} />;
}
export default SortableComponent;
