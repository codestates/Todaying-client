import { React } from 'react';
import Card from '../Card/Card';
import ToDoTasks from '../ToDoTasks/ToDoTasks';

const ToDoCard = () => {
  return (
    <Card>
      {/* tasks={card.content} */}
      <ToDoTasks />
    </Card>
  );
};

export default ToDoCard;
