import { React, useState } from 'react';
import styles from './ToDoTasks.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';
// import axios from 'axios';

const ToDoTasks = ({
  token,
  tasks: todoTasks,
  editOn,
  cardId,
  modifyToDoCardData,
  deleteToDoCardData,
}) => {
  // dummy Data용 counter
  const [tasks, setTasks] = useState(todoTasks);
  const [isSpread, setSpread] = useState(false);

  const addTask = async () => {
    console.log('add a task');
    // try {
    //   const response = await axios.post(
    //     'main/addTask',
    //     {
    //       cardId,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   const taskId = response.data;
    //   modifyToDoCardData({ cardId, taskId, newTask: '', newIsDone: false });
    // } catch (err) {
    //   if (err.response) {
    //     throw err;
    //   }
    // }
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
