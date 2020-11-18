import { React, useState } from 'react';
import axios from 'axios';
import styles from './ToDoTask.module.css';
import deleteIcon from '../../images/delete.png';
import checkboxIcon from '../../images/stop.png';
import checkboxDoneIcon from '../../images/checkbox.png';

const ToDoTask = ({
  token,
  task,
  isDone,
  editOn,
  cardId,
  taskId,
  modifyToDoCardData,
  deleteToDoCardData,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [checked, setChecked] = useState(Boolean(Number(isDone)));
  const [text, setText] = useState(task);

  const setInputText = (e) => {
    setText(e.target.value);
  };

  // task를 화면단에서 제거하고, 최상위 state에서 삭제해서 re-render하며, 실제 실행되는 서버에 삭제 요청을 보내는 함수
  const deleteTask = async () => {
    deleteToDoCardData(cardId, taskId);
    try {
      await axios.post(
        'https://todaying.cf/main/deleteTask',
        {
          taskId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true },
      );
    } catch (err) {
      if (err.response) {
        throw err;
      }
    }
  };

  // isDone을 화면단에서 반대로 바꿔주고, 최상위의 cards state도 바꿔주면서, 실제 그 정보를 서버로 요청하는 함수
  const handleIsDone = async () => {
    const checkIf = !checked;
    modifyToDoCardData({ cardId, taskId, newIsDone: !checked });
    setChecked(!checked);
    try {
      await axios.post(
        'https://todaying.cf/main/updateTask',
        {
          cardId,
          taskId,
          task,
          isDone: checkIf,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true },
      );
    } catch (err) {
      if (err.response) {
        throw err;
      }
    }
  };

  // 새로 수정한 task를 화면단에서 바꿔주고, 최상위의 cards state에서도 바꿔주면서, 실제로 그 정보를 서버로 요청하는 함수
  const handleTask = async (e) => {
    const newText = e.target.value;
    modifyToDoCardData({ cardId, taskId, newTask: e.target.value });
    try {
      const response = await axios.post(
        'https://todaying.cf/main/updateTask',
        {
          cardId,
          taskId,
          task: newText,
          isDone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      if (err.response) {
        throw err;
      }
    }
  };

  return isDeleted ? null : (
    <div className={styles.task}>
      {checked ? (
        <img
          src={checkboxDoneIcon}
          alt="checkbox"
          className={styles.task_checkboxDone}
          onClick={handleIsDone}
        />
      ) : (
        <img
          src={checkboxIcon}
          alt="checkbox"
          className={styles.task_checkbox}
          onClick={handleIsDone}
        />
      )}

      <input
        className={`${styles.task_text} ${checked && styles.isDone}`}
        value={text}
        spellCheck="false"
        onBlur={handleTask}
        onChange={setInputText}
      />

      {editOn ? (
        <img
          className={styles.task_delete}
          src={deleteIcon}
          alt="delete"
          onClick={deleteTask}
        />
      ) : null}
    </div>
  );
};

export default ToDoTask;
