import React, { useState } from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import calendarIcon from '../../images/calendar_wh.png';

const Cards = ({
  token,
  cardsData,
  modifyNoteCardData,
  modifyToDoCardData,
  modifyCardTitle,
  deleteToDoCardData,
  handleAddCardModal,
  handleSetDateModal,
}) => {
  return (
    <>
      <div className={styles.cards}>
        {Object.keys(cardsData).map((key) => (
          <Card
            token={token}
            key={key}
            card={cardsData[key]}
            cardId={key}
            modifyNoteCardData={modifyNoteCardData}
            modifyToDoCardData={modifyToDoCardData}
            modifyCardTitle={modifyCardTitle}
            deleteToDoCardData={deleteToDoCardData}
          />
        ))}
      </div>
      <div className={styles.setDate} onClick={handleSetDateModal}>
        <img
          className={styles.calendarIcon}
          src={calendarIcon}
          alt="calendar icon"
        />
      </div>
      <div className={styles.addCard} onClick={handleAddCardModal}>
        +
      </div>
    </>
  );
};

export default Cards;
