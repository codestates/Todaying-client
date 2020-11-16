import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import styles from './MainPage.module.css';
import Cards from '../../components/Cards/Cards';

import FAKE_DATA from './fakeData';

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

  const [cardsData, setCardsData] = useState({});

  // NoteCard / text 수정
  const modifyNoteCardData = (cardId, newText) => {
    const newData = {};
    newData[cardId] = { ...cardsData[cardId], text: newText };

    setCardsData({ ...cardsData, ...newData });
  };

  // ToDoCard / task 수정
  const modifyToDoCardData = (cardId, taskId, newTask, newIsDone) => {
    const newTasks = { ...cardsData[cardId].content };
    newTasks[taskId] = {
      task: newTask,
      isDone: newIsDone,
    };
    const newData = {};
    newData[cardId] = { ...cardsData[cardId], content: newTasks };

    setCardsData({ ...cardsData, ...newData });
  };

  // Card / Title 수정
  const modifyCardTitle = (cardId, newTitle) => {
    const newData = {};
    newData[cardId] = { ...cardsData[cardId], title: newTitle };

    setCardsData({ ...cardsData, ...newData });
  };

  // 마운트 시 데이터 받아오기
  useEffect(() => {
    // axios.get()
    setCardsData(FAKE_DATA);
  }, []);

  return (
    <>
      <Nav />
      <section className={styles.page}>
        <div className={styles.container}>
          <div
            className={styles.date}
            onClick={() => alert('날짜 선택 팝업 달기')}
          >{`${date.year}.${date.month}.${date.date} ${date.day}`}</div>

          <Cards
            cardsData={cardsData}
            modifyNoteCardData={modifyNoteCardData}
            modifyToDoCardData={modifyToDoCardData}
            modifyCardTitle={modifyCardTitle}
          />
        </div>
      </section>
    </>
  );
};

export default MainPage;
