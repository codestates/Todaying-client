import { React, useState, useEffect } from 'react';
import styles from './ToDoTask.module.css';
import deleteIcon from '../../images/delete.png';
import checkboxIcon from '../../images/stop.png';
import checkboxDoneIcon from '../../images/checkbox.png';

const ToDoTask = ({ task, isDone, editOn }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [checked, setChecked] = useState(isDone);
  const copyOfTask = task;
  // 0) 실제 서버에 보낼 자료인 text.task와 ...을 포함할 수도 있고, 안할 수도 있는, 자유롭게 쓸 수 있는 text.copyOfTask를 만듦
  const [text, setText] = useState({ task, copyOfTask });
  const [match, setMatches] = useState(false);

  // 1) ComponentDidMount
  // 처음 렌더링될 때 task가 60자 이상이면(일단은 데스크톱 기준 UI) 60자로 함축해서 끝에 ...
  // 이 때, window.matchMedia를 이용해서 만약 모바일로 접속하면, 축약 기준을 25자로하고, 웹으로 접속하면 축약기준을 50자로 설정하는 옵션을 줌
  useEffect(() => {
    const { matches } = window.matchMedia('(max-width: 48rem)');
    if (matches && text.copyOfTask.length >= 26) {
      let condense = text.copyOfTask.substring(0, 25);
      condense += '...';
      setText({ ...text, copyOfTask: condense });
      setMatches(true);
    } else if (!matches && text.copyOfTask.length >= 56) {
      let condense = text.copyOfTask.substring(0, 55);
      condense += '...';
      setText({ ...text, copyOfTask: condense });
    }
  }, []);

  // 2) onChange이벤트 호출용 함수로 인풋을 변경할 때마다 text.copyOfTask가 변경되고, input의 value에는 이 text.copyOfTask 가 바인딩되어있음
  const setInputText = (e) => {
    setText({ ...text, copyOfTask: e.target.value });
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
    const newTask = e.target.value;
    // 미리 target.value를 변수로 받아두고
    console.log(match);
    let condense = newTask;
    if (!match && newTask.length >= 56) {
      // 만약 수정후에 60자 이상이면 text.copyOfTask에는 ... 추가해서 저장
      condense = condense.substring(0, 55);
      condense += '...';
    } else if (match && newTask.length >= 26) {
      // 만약 수정후에 60자 이상이면 text.copyOfTask에는 ... 추가해서 저장
      condense = condense.substring(0, 25);
      condense += '...';
    }
    // text.task도 게속 갱신시켜야하므로(만약 새로고침 버튼을 누르면 서버에서 받아온 새 정보가 들어오므로 상관x)
    // task와 copyOfTask모두 setText로 갱신시켜줌(이 때, copyOfTask는 글자수 고려후 ...추가해서)
    setText({ task: newTask, copyOfTask: condense });
    // 마지막으로 서버로 실제로 내용 수정 요청을 보냄(이 때, setText와 axios사이에는 비동기 처리, 즉, Promise로 이어줄 필요는 없음)
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
        value={text.copyOfTask}
        spellCheck="false"
        // 4) 처음 input에 포커싱(첫 클릭) - 수정 시작점
        onFocus={(e) => {
          // 처음 포커싱이되면 input의 value에 실제 서버에서 받아온 자료인 text.task를 바인딩함. 이것을 수정하면 그 내용이 text.copyOfTask로 연동되는 구조
          e.target.value = text.task;
        }}
        // 5) input에서 포커스 아웃할 때 실행된느 함수로 - 수정이 끝난 시점(서버에 요청을 보내는 시점)
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
