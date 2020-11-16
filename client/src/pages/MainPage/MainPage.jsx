import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import styles from './MainPage.module.css';
import Cards from '../../components/Cards/Cards';
import FAKE_DATA from './fakeData';
import AddCardModal from '../../components/AddCardModal/AddCardModal';
import SetDateModal from '../../components/SetDateModal/SetDateModal';

const MainPage = ({ getLoginToken, token }) => {
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

  // 처음 렌더링될 때 cards 받아오는 logic(에러 처리는 미완성)
  const [cardsData, setCardsData] = useState({});

  // NoteCard / text 수정
  const modifyNoteCardData = (cardId, newText) => {
    const newData = {};
    newData[cardId] = { ...cardsData[cardId], text: newText };

    setCardsData({ ...cardsData, ...newData });
  };

  // ToDoCard / task 수정
  const modifyToDoCardData = ({ cardId, taskId, newTask, newIsDone }) => {
    const newTasks = { ...cardsData[cardId].content };
    newTasks[taskId] = {
      task: newTask,
      isDone: newIsDone,
    };
    const newData = {};
    newData[cardId] = { ...cardsData[cardId], content: newTasks };

    setCardsData({ ...cardsData, ...newData });
  };

  // ToDoCard / Task Delete
  const deleteToDoCardData = (cardId, taskId) => {
    const newTasks = { ...cardsData[cardId].content };
    delete newTasks[taskId];

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
    // const getAllCards = async (tk, dates) => {
    //   try {
    //     const response = await axios.post(
    //       'main/getAllCards',
    //       {
    //         date: dates,
    //       },
    // {
    //   headers: {
    //     Authorization: `Bearer ${tk}`,
    //   },
    // },
    //     );
    //     setCardsData(response.data);
    //   } catch (err) {
    //     if (err.response) {
    //       throw err;
    //     }
    //   }
    // };

    // const dates = new Date().toLocaleDateString();
    // const params = window.location.search;
    // social 로그인 성공시에 이메일과 닉네임을 jwt 토큰으로 받아오는 로직
    // if (params) {
    //   const query = params.substring(1);
    //   const tokens = query.split('token=')[1];
    //   getLoginToken(tokens);
    //   getAllCards(tokens, dates);
    // } else {
    //   getAllCards(token, dates);
    // }
    setCardsData(FAKE_DATA);
  }, []);

  // AddCardModal 상태관리
  const [isAddCardOn, setIsAddCardOn] = useState(false);
  const handleAddCardModal = () => {
    setIsAddCardOn((prev) => !prev);
  };

  const [isSetDateOn, setIsSetDateOn] = useState(false);
  const handleSetDateModal = () => {
    setIsSetDateOn((prev) => !prev);
  };
  return (
    <>
      <SetDateModal
        isModalOn={isSetDateOn}
        handleModal={handleSetDateModal}
        token={token}
        setCardsData={setCardsData}
      />
      <AddCardModal isModalOn={isAddCardOn} handleModal={handleAddCardModal} />
      <Nav />
      <section className={styles.page}>
        <div className={styles.container}>
          <div
            className={styles.date}
          >{`${date.year}.${date.month}.${date.date} ${date.day}`}</div>

          <Cards
            token={token}
            cardsData={cardsData}
            modifyNoteCardData={modifyNoteCardData}
            modifyToDoCardData={modifyToDoCardData}
            modifyCardTitle={modifyCardTitle}
            deleteToDoCardData={deleteToDoCardData}
            handleAddCardModal={handleAddCardModal}
            handleSetDateModal={handleSetDateModal}
          />
        </div>
      </section>
    </>
  );
};

export default MainPage;
