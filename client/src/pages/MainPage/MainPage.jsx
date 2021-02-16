import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Nav from '../../components/Nav/Nav';
import styles from './MainPage.module.css';
import Cards from '../../components/Cards/Cards';
// import FAKE_DATA from './fakeData';
import AddCardModal from '../../components/AddCardModal/AddCardModal';
import SetDateModal from '../../components/SetDateModal/SetDateModal';

const MainPage = ({
  getLoginToken,
  token,
  cardsData,
  setCardsData,
  handleSpinner,
}) => {
  // 메인페이지 <-> 마이페이지 전환 시, 데이터를 다시 불러올 필요가 없는데 매번 getAllCards 요청을 막고자 데이터 원천을 상위로 올렸습니다.
  // const [cardsData, setCardsData] = useState({});

  const [selectedDate, setSelectedDate] = useState('');
  const setDate = (dateSelected) => {
    let day = dateSelected.getDay();
    if (day === 1) day = 'Monday';
    if (day === 2) day = 'Tuesday';
    if (day === 3) day = 'Wednesday';
    if (day === 4) day = 'Thursday';
    if (day === 5) day = 'Friday';
    if (day === 6) day = 'Saturday';
    if (day === 0) day = 'Sunday';
    const date = {
      year: dateSelected.getFullYear(),
      month: dateSelected.getMonth() + 1,
      date: dateSelected.getDate(),
      day,
    };

    setSelectedDate(date);
  };

  //  addNewCard / 새로운 카드 추가
  const addNewCard = (cardId, title, type, taskId) => {
    const newData = {};
    if (type === 'note') {
      newData[cardId] = { type, title, text: '' };
    } else {
      // ToDo 카드인 경우에는 default task ID를 받아서, 빈 tasks를 같이 데이터에 넣어줌
      const defaultTasks = {};
      taskId.forEach((id) => (defaultTasks[id] = { task: '', isDone: '0' }));
      newData[cardId] = {
        type: 'toDo',
        title,
        content: {
          ...defaultTasks,
        },
      };
    }
    setCardsData({ ...cardsData, ...newData });
  };

  // deleteCard
  const deleteCard = (cardId) => {
    const newData = { ...cardsData };
    delete newData[cardId];
    setCardsData({ ...newData });
  };

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

  // *** getAllCards(tk, date)
  const getAllCards = async (tk, dates) => {
    try {
      handleSpinner();
      const response = await axios.post(
        'https://todaying.cf/main/getAllCards',
        { date: dates },
        { headers: { Authorization: `Bearer ${tk}` } },
        { withCredentials: true },
      );
      setCardsData(response.data);
    } catch (err) {
      throw err;
    } finally {
      handleSpinner();
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const today = new Date();
    setDate(today);
    const dateData = new Date().toLocaleDateString('en-US').split('');
    if (dateData[1] === '/') {
      dateData.unshift('0');
    }
    const params = window.location.search;
    if (params) {
      const query = params.substring(1);
      const oAuthToken = query.split('token=')[1];

      getLoginToken(oAuthToken);

      getAllCards(oAuthToken, dateData.join(''));
    } else {
      getAllCards(token, dateData.join(''));
    }
  }, []);

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
        setDate={setDate}
        isModalOn={isSetDateOn}
        handleModal={handleSetDateModal}
        token={token}
        getAllCards={getAllCards}
      />
      <AddCardModal
        isModalOn={isAddCardOn}
        handleModal={handleAddCardModal}
        token={token}
        addNewCard={addNewCard}
        selectedDate={selectedDate}
        handleSpinner={handleSpinner}
      />
      {/* <Nav /> */}
      <section className={styles.page}>
        <div className={styles.container}>
          <div
            className={styles.date}
          >{`${selectedDate.year}.${selectedDate.month}.${selectedDate.date} ${selectedDate.day}`}</div>
          {Object.keys(cardsData).length === 0 ? (
            <div className={styles.msg_container}>
              <p className={styles.noCardMsg}>No cards yet</p>
              <p className={styles.noCardMsg2} onClick={handleAddCardModal}>
                Add your Today-ing!
              </p>
            </div>
          ) : (
            ''
          )}

          <Cards
            token={token}
            cardsData={cardsData}
            modifyNoteCardData={modifyNoteCardData}
            modifyToDoCardData={modifyToDoCardData}
            modifyCardTitle={modifyCardTitle}
            deleteToDoCardData={deleteToDoCardData}
            handleAddCardModal={handleAddCardModal}
            handleSetDateModal={handleSetDateModal}
            deleteCard={deleteCard}
            handleSpinner={handleSpinner}
          />
        </div>
      </section>
    </>
  );
};

export default MainPage;
