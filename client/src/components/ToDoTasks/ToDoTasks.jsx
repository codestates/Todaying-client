import { React, useState } from 'react';
import axios from 'axios';
import styles from './ToDoTasks.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';

const ToDoTasks = ({
  token,
  tasks: todoTasks,
  editOn,
  cardId,
  modifyToDoCardData,
  deleteToDoCardData,
}) => {
  // dummy Data용 counter
  const [tasks] = useState(todoTasks);
  const [isSpread] = useState(false);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://387b5293dc84.ngrok.io/main/addTask',
        {
          cardId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const newTaskId = response.data.taskId;
      modifyToDoCardData({
        cardId,
        taskId: newTaskId,
        newTask: '',
        newIsDone: false,
      });
    } catch (err) {
      if (err.response) {
        throw err;
      }
    }
  };

  return (
    <>
      <div className={`${styles.card_tasks} ${isSpread && styles.isSpread}`}>
        {tasks
          ? Object.keys(tasks).map((key) => {
              const eachTask = tasks[key];
              return (
                <ToDoTask
                  token={token}
                  key={key}
                  taskId={key}
                  task={eachTask.task}
                  isDone={eachTask.isDone}
                  editOn={editOn}
                  cardId={cardId}
                  modifyToDoCardData={modifyToDoCardData}
                  deleteToDoCardData={deleteToDoCardData}
                />
              );
            })
          : null}
      </div>
      <div className={styles.bottomSide}>
        <div className={styles.addTask} onClick={addTask}>
          + add a task
        </div>
      </div>
    </>
  );
};

export default ToDoTasks;
