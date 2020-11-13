import React from 'react';
import Nav from '../../components/Nav/Nav';
import styles from './MainPage.module.css';

const MainPage = () => {
  const query = window.location.search.substring(1);
  const queryArr = query.split('&');
  let email = queryArr[0].split('=')[1];
  let nickname = queryArr[1].split('=')[1];
  email = decodeURIComponent(email);
  nickname = decodeURIComponent(nickname);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const getDay = () => {
    const d = today.getDay();
    if (d === 0) return 'MON';
    if (d === 1) return 'TUE';
    if (d === 2) return 'WED';
    if (d === 3) return 'THU';
    if (d === 4) return 'FRI';
    if (d === 5) return 'SAT';
    if (d === 6) return 'SUN';
  };

  return (
    <>
      <Nav />
      <section className={styles.page}>
        <div className={styles.container}>
          <div
            className={styles.date}
          >{`${year}.${month}.${date}. ${getDay()}`}</div>
          <div className={styles.cards}>
            <div className={styles.card}>.</div>
            <div className={styles.card}></div>
            <div className={styles.card}></div>
          </div>
          <p className={styles.msg}>+ Add a new card</p>
        </div>
      </section>
    </>
  );
};

export default MainPage;
