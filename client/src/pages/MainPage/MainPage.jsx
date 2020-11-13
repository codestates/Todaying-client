import React from 'react';
import Nav from '../../components/Nav/Nav';
import styles from './MainPage.module.css';

import editIcon from '../../images/edit.png';
import deleteIcon from '../../images/delete.png';
import checkboxIcon from '../../images/stop.png';
import checkboxDoneIcon from '../../images/checkbox.png';

import ToDoCard from '../../components/ToDoCard/ToDoCard';

const MainPage = () => {
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
            <ToDoCard />
            <ToDoCard />
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
