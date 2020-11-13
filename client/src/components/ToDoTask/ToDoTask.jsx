import { React } from 'react';
import styles from './ToDoTask.module.css';
import deleteIcon from '../../images/delete.png';
import checkboxDoneIcon from '../../images/checkbox.png';

const ToDoTask = () => {
  return (
    <div className={styles.task}>
      <img
        className={styles.task_checkboxDone}
        src={checkboxDoneIcon}
        alt="checkbox"
      />
      <input
        className={`${styles.task_text} ${styles.isDone}`}
        value="to do list 02 to do list 02 to do list 02"
      />
      {/* editIsOn ?? */}
      {false ? (
        <img
          className={styles.task_delete}
          src={deleteIcon}
          alt="delete"
          onClick={() => alert('여기에 삭제 기능 나중에 넣기')}
        />
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default ToDoTask;
