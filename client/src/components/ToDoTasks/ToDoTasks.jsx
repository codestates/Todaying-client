import { React } from 'react';
import styles from './ToDoTasks.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';

const ToDoTasks = ({ tasks }) => {
  return (
    <div className={styles.card_tasks}>
      <ToDoTask />
      <ToDoTask />
      <ToDoTask />
      {/* tasks.map((task) => (<ToDoTask task={task.task} isDone={task.isDone} />
      )); */}
      <div className={styles.addTask}>
        <div>+ add a task</div>
      </div>
    </div>
  );
};

export default ToDoTasks;
