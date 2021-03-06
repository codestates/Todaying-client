import { React } from 'react';
import axios from 'axios';
import styles from './ToDoTasks.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';

const ToDoTasks = ({
  token,
  tasks,
  editOn,
  cardId,
  modifyToDoCardData,
  deleteToDoCardData,
  handleSpinner,
}) => {
  const addTask = async (e) => {
    e.preventDefault();

    try {
      handleSpinner();
      const response = await axios.post(
        'https://todaying.cf/main/addTask',
        {
          cardId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true },
      );

      const newTaskId = response.data.taskId;

      modifyToDoCardData({
        cardId,
        taskId: newTaskId,
        newTask: '',
        newIsDone: '0',
      });
    } catch (err) {
      if (err.response) {
        throw err;
      }
    } finally {
      handleSpinner();
    }
  };

  return (
    <>
      <div className={styles.card_tasks}>
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
