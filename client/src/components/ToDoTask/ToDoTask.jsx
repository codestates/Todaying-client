import { React, useState } from 'react';
import styles from './ToDoTask.module.css';
import deleteIcon from '../../images/delete.png';

const ToDoTask = ({ task, isDone, editOn }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [checked, setChecked] = useState(isDone);
  const [text, setText] = useState(task);

  const deleteTask = () => {
    setIsDeleted(!isDeleted);
  };

  return isDeleted ? null : (
    <div className={styles.task}>
      <input
        type="checkbox"
        className={styles.task_checkboxDone}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />
      <input
        className={`${styles.task_text} ${checked && styles.isDone}`}
        value={text}
        spellCheck="false"
        onChange={(e) => {
          setText(e.target.value);
        }}
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
