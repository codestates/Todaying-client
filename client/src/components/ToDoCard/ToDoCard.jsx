import { React, useState } from 'react';
import Card from '../Card/Card';
import ToDoTasks from '../ToDoTasks/ToDoTasks';

const ToDoCard = ({ title, tasks, isEditOn }) => {
  const [editOn, setEditOn] = useState(isEditOn);
  return (
    <Card title={title} editOn={editOn} setEditOn={setEditOn}>
      <ToDoTasks tasks={tasks} editOn={editOn} setEditOn={setEditOn} />
    </Card>
  );
};

export default ToDoCard;
