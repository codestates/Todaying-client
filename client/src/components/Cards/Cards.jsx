import React from 'react';
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
  deleteCard,
  handleSpinner,
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
            deleteCard={deleteCard}
            handleSpinner={handleSpinner}
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
