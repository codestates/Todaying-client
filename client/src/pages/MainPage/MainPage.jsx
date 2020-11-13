import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import styles from './MainPage.module.css';
import editIcon from '../../images/edit.png';

import ToDoCard from '../../components/ToDoCard/ToDoCard';
import NoteCard from '../../components/NoteCard/NoteCard';

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

  // dummy data
  const FAKE_DATA = {
    1: {
      // 카드 오더에 따라 순서
      type: 'note',
      title: 'titletext',
      text:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis inventore ratione ipsa incidunt minus porro dolore veniam. Deleniti quasi ad consectetur ratione, laboriosam dolorem a, autem illum tempore perferendis ipsa.',
    },
    5: {
      //
      type: 'note',
      title: 'titletext',
      text:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis inventore ratione ipsa incidunt minus porro dolore veniam. Deleniti quasi ad consectetur ratione, laboriosam dolorem a, autem illum tempore perferendis ipsa.',
    },
    8: {
      //
      type: 'toDo',
      title: 'titletext',
      isEditOn: false,
      content: {
        // 컨텐츠 오더에 따라 순서
        1: { task: '6시 기상', isDone: true },
        5: { task: '비타민 먹기', isDone: false },
      },
    },
    10: {
      //
      type: 'toDo',
      title: 'titletext',
      isEditOn: false,
      content: {
        // 컨텐츠 오더에 따라 순서
        1: { task: '6시 기상', isDone: true },
        5: { task: '비타민 먹기', isDone: false },
      },
    },
    12: {
      //
      type: 'toDo',
      title: 'dummy title',
      isEditOn: false,
      content: {
        // 컨텐츠 오더에 따라 순서
        1: { task: '6시 기상', isDone: true },
        5: { task: '비타민 먹기', isDone: false },
      },
    },
  };

  // 처음 렌더링될 때 cards 받아오는 logic(에러 처리는 미완성)
  const [cards, setCards] = useState(FAKE_DATA);
  // 처음 렌더링된 이후에 서버로부터 전체 cards 자료를 받아서 cards state에 세팅해주는 Effect hook
  // useEffect(() => {
  //   const getCards = async () => {
  //     const todayingCards = await axios.post('https://www.example.com/getCards',{
  //        email
  //     });
  //     setCards(todayingCards);
  //   };
  //   try {
  //     getCards();
  //   } catch (err) {
  //     // error handling logics
  //     console.log(err);
  //   }
  // });

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

            {/* 아마 이렇게 되지 않을까 생각하며 적어둡니다. 혹시 제가 생각한 방향과 다르시면 말씀해주세요! from 용기 */}
            {Object.keys(cards).map((key) => {
              const card = cards[key];
              if (card.type === 'toDo') {
                return (
                  <ToDoCard key={key} title={card.title} tasks={card.content} />
                );
              } else if (card.type === 'note') {
                return (
                  <NoteCard key={key} title={card.title} text={card.text} />
                );
              } else {
                return null;
              }
            })}

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
