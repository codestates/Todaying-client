import { React, useState, useEffect } from 'react';
import styles from './ToDoTask.module.css';
import deleteIcon from '../../images/delete.png';
import checkboxIcon from '../../images/stop.png';
import checkboxDoneIcon from '../../images/checkbox.png';

const ToDoTask = ({ task, isDone, editOn }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [checked, setChecked] = useState(isDone);
  const [text, setText] = useState(task);
  const setInputText = (e) => {
    setText(e.target.value.trim());
  };

  // 3) delete 버튼(쓰레기통 버튼)을 눌렀을 때 실행되는 서버에 삭제 요청을 보내는 함수
  const deleteTask = () => {
    // axios.post(delete url with body)
    setIsDeleted(!isDeleted);
  };

  const handleIsDone = () => {
    console.log('서버로 요청');
    setChecked(!checked);
  };

  const handleTask = (e) => {
    console.log(`서버로 수정 요청/ 요청 메시지 : ${e.target.value}`);
    // axios.post('서버로 task 내용 수정 요청 with newTask');
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
