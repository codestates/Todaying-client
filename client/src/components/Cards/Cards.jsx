import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = ({
  cardsData,
  modifyNoteCardData,
  modifyToDoCardData,
  modifyCardTitle,
}) => {
  return (
    <>
      <div className={styles.cards}>
        {Object.keys(cardsData).map((key) => (
          <Card
            key={key}
            card={cardsData[key]}
            cardId={key}
            modifyNoteCardData={modifyNoteCardData}
            modifyToDoCardData={modifyToDoCardData}
            modifyCardTitle={modifyCardTitle}
          />
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
