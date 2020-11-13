import React from 'react';
import Nav from '../../components/Nav/Nav';
import styles from './MainPage.module.css';

import editIcon from '../../images/edit.png';
import deleteIcon from '../../images/delete.png';
import checkboxIcon from '../../images/stop.png';
import checkboxDoneIcon from '../../images/checkbox.png';

const MainPage = () => {
  const query = window.location.search.substring(1);
  const queryArr = query.split('&');
  let email = queryArr[0].split('=')[1];
  let nickname = queryArr[1].split('=')[1];
  email = decodeURIComponent(email);
  nickname = decodeURIComponent(nickname);

  const today = new Date();
  const getDay = () => {
    const d = today.getDay();
    if (d === 1) return 'Monday';
    if (d === 2) return 'Tuesday';
    if (d === 3) return 'Wednesday';
    if (d === 4) return 'Thursday';
    if (d === 5) return 'Friday';
    if (d === 6) return 'Saturday';
    if (d === 0) return 'Sunday';
  };
  const date = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    day: getDay(),
  };

  return (
    <>
      <Nav />
      <section className={styles.page}>
        <div className={styles.container}>
          <div
            className={styles.date}
            onClick={() => alert('날짜 선택 팝업 달기')}
          >{`${date.year}.${date.month}.${date.date} ${date.day}`}</div>
          <div className={styles.cards}>
            {/* Object.keys(cards).map((key) => <Card key={key} card={cards.key} />) */}
            {/* 1. 노트 카드 형식 */}
            <div className={styles.card}>
              <div className={styles.card_container}>
                <div className={styles.card_header}>
                  <input
                    type="text"
                    className={styles.card_header_title}
                    value="Title State"
                  />
                  <div className={styles.card_header_setting}>
                    {/* editIsOn ?? */}
                    {false ? (
                      <>
                        <span className={styles.btn_delete}>Delete</span>
                        <span className={styles.btn_done}>Done</span>
                      </>
                    ) : (
                      <img
                        className={styles.card_header_setting_editIcon}
                        src={editIcon}
                        alt="edit"
                        onClick={() => alert('여기에 편집 기능 나중에 넣기')}
                      />
                    )}
                  </div>
                </div>

                <textarea className={styles.textArea} placeholder="write here">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  pariatur tempora ea et quibusdam, nulla laboriosam a mollitia
                  debitis cumque deserunt sed cupiditate numquam adipisci,
                  delectus sint consequuntur reprehenderit. Tempore.
                </textarea>
              </div>
            </div>

            {/* ToDo카드 형식, edit활성화 상태 */}
            <div className={styles.card}>
              <div className={styles.card_container}>
                <div className={styles.card_header}>
                  <input
                    type="text"
                    className={styles.card_header_title}
                    value="Title State"
                  />
                  <div className={styles.card_header_setting}>
                    {/* editIsOn ?? */}
                    {true ? (
                      <>
                        <span className={styles.btn_delete}>Delete</span>
                        <span className={styles.btn_done}>Done</span>
                      </>
                    ) : (
                      <img
                        className={styles.card_header_setting_editIcon}
                        src={editIcon}
                        alt="edit"
                        onClick={() => alert('여기에 편집 기능 나중에 넣기')}
                      />
                    )}
                  </div>
                </div>

                <div className={styles.card_tasks}>
                  <div className={styles.task}>
                    <img
                      className={styles.task_checkbox}
                      src={checkboxIcon}
                      alt="checkbox"
                    />
                    <input className={styles.task_text} value="to do list 01" />
                    {true ? (
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

                  <div className={styles.task}>
                    <img
                      className={styles.task_checkboxDone}
                      src={checkboxDoneIcon}
                      alt="checkbox"
                    />
                    <input
                      className={`${styles.task_text} ${styles.isDone}`}
                      value="to do list 02 to do list 02 to do li do list 02 to do lst 02"
                    />
                    {/* editIsOn ?? */}
                    {true ? (
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

                  <div className={styles.task}>
                    <img
                      className={styles.task_checkboxDone}
                      src={checkboxDoneIcon}
                      alt="checkbox"
                    />
                    <input
                      className={`${styles.task_text} ${styles.isDone}`}
                      value="to do list 03 to do list 03 to do list 03"
                    />
                    {/* editIsOn ?? */}
                    {true ? (
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

                  <div className={styles.addTask}>
                    <div>+ add a task</div>
                  </div>
                </div>
              </div>
            </div>

            {/* To Do Card.  edit 비활성화 상태 */}
            <div className={styles.card}>
              <div className={styles.card_container}>
                <div className={styles.card_header}>
                  <input
                    type="text"
                    className={styles.card_header_title}
                    value="Title State"
                  />
                  <div className={styles.card_header_setting}>
                    {/* editIsOn ?? */}
                    {false ? (
                      <>
                        <span className={styles.btn_delete}>Delete</span>
                        <span className={styles.btn_done}>Done</span>
                      </>
                    ) : (
                      <img
                        className={styles.card_header_setting_editIcon}
                        src={editIcon}
                        alt="edit"
                        onClick={() => alert('여기에 편집 기능 나중에 넣기')}
                      />
                    )}
                  </div>
                </div>

                <div className={styles.card_tasks}>
                  <div className={styles.task}>
                    <img
                      className={styles.task_checkbox}
                      src={checkboxIcon}
                      alt="checkbox"
                    />
                    <input className={styles.task_text} value="to do list 01" />
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

                  <div className={styles.task}>
                    <img
                      className={styles.task_checkboxDone}
                      src={checkboxDoneIcon}
                      alt="checkbox"
                    />
                    <input
                      className={`${styles.task_text} ${styles.isDone}`}
                      value="to do list 03 to do list 03 to do list 03"
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

                  <div className={styles.addTask}>
                    <div>+ add a task</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={styles.addCard}
              onClick={() => alert('카드추가 팝업 달기')}
            >
              <div>+ Add a new card</div>
            </div>
          </div>
          {/*  */}
        </div>
      </section>
    </>
  );
};

export default MainPage;
