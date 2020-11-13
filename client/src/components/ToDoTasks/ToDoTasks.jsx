import { React, useState } from 'react';
import styles from './ToDoTasks.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';

const ToDoTasks = ({ tasks: todoTasks, editOn, setEditOn }) => {
  const [tasks, setTasks] = useState(todoTasks);

  return (
    <div className={styles.card_tasks}>
      {tasks
        ? Object.keys(tasks).map((key) => {
            const eachTask = tasks[key];
            return (
              <ToDoTask
                key={key}
                task={eachTask.task}
                isDone={eachTask.isDone}
                editOn={editOn}
                setEditOn={setEditOn}
              />
            );
          })
        : null}
      <div className={styles.addTask}>
        <div
          onClick={() => {
            console.log('추가');
            // setTasks({
            //   ...tasks,
            //   new: { task: '', isDone: false },
            // });
          }}
        >
          + add a task
        </div>
      </div>
    </div>
  );
};

export default ToDoTasks;
