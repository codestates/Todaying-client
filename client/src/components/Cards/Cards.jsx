import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = ({ cardsData }) => {
  return (
    <>
      <div className={styles.cards}>
        {Object.keys(cardsData).map((key) => (
          <Card key={key} card={cardsData[key]} />
        ))}
      </div>
      <div
        className={styles.addCard}
        onClick={() => alert('카드추가 팝업 달기')}
      >
        +
      </div>
    </>
  );
};

export default Cards;
