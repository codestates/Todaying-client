import { React, useState } from 'react';
import styles from './ToDoTasks.module.css';
import ToDoTask from '../ToDoTask/ToDoTask';
import sortDown from '../../images/sort-down.png';
// import Axios from 'axios';

const ToDoTasks = ({
  tasks: todoTasks,
  editOn,
  cardId,
  modifyToDoCardData,
}) => {
  // dummy Data용 counter
  const [countForTestData, setCount] = useState(1000);
  const [tasks, setTasks] = useState(todoTasks);
  const [isSpread, setSpread] = useState(false);

  return (
    <>
      <div className={`${styles.card_tasks} ${isSpread && styles.isSpread}`}>
        {tasks
          ? Object.keys(tasks).map((key) => {
              const eachTask = tasks[key];
              return (
                <ToDoTask
                  key={key}
                  taskId={key}
                  task={eachTask.task}
                  isDone={eachTask.isDone}
                  editOn={editOn}
                  cardId={cardId}
                  modifyToDoCardData={modifyToDoCardData}
                />
              );
            })
          : null}
      </div>
      <div className={styles.bottomSide}>
        <div
          className={styles.addTask}
          onClick={() => {
            // 여기서도 서버에 요청을 보내야함.
            // 먼저 서버요청으로 새로 생성을함 (task를) axios.post로 create하면, 서버에서 해당 자료를 리턴하게함(tasks를 받아오는 것 or task 한개)
            // 그 다음에 굳이 MainPage cards 자료를 손대지 않아도 여기 레벨에서 tasks를 업데이터해주면
            // Axios.post(서버로 요청)
            // 서버에서 받은 데이터라고 가정
            const obj = {};
            obj[countForTestData] = { task: '', isDone: false };
            setTasks({ ...tasks, ...obj });
            // 받은 데이터를 tasks에 추가해주면, re render하면서 화면에 표시가될 것임. 빈 task가
            // 이 때, toDoTask에서 만약 제거 요청을 보내면, 자료 자체는 서버에서 보내준거라 실제 존재하는 자료이기에 전혀 문제가 없고,
            // 수정 요청에도 문제가 없음
            // 만약 새로고침을 하더라도 서버에는 실제 그 자료가 있기에 문제없음(굳이 최상위 mainpage까지 state 안고쳐줘도 된다는 것)
            setCount(countForTestData + 1);
          }}
        >
          + add a task
        </div>
        <div
          className={styles.sortDown}
          src={sortDown}
          onClick={() => {
            setSpread(!isSpread);
          }}
        >
          sortdown
        </div>
      </div>
    </>
  );
};

export default ToDoTasks;
