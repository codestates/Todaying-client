import { React, useState } from 'react';
import axios from 'axios';
import styles from './Card.module.css';
import editIcon from '../../images/edit.png';
import NoteCard from '../NoteCard/NoteCard';
import ToDoTasks from '../ToDoTasks/ToDoTasks';
import foldIcon from '../../images/expand-arrow.png';
import expandIcon from '../../images/expand-button.png';

const Card = ({
  token,
  card,
  cardId,
  modifyNoteCardData,
  modifyToDoCardData,
  modifyCardTitle,
  deleteToDoCardData,
  deleteCard,
  handleSpinner,
}) => {
  // Title 변경 상태 관리
  const [title, setTitle] = useState(card.title);
  // Edit btn 활성화 상태 관리
  const [isEditOn, setIsEditOn] = useState(false);
  // Expanding btn 활성화 상태 관리
  const [isExpandOn, setIsExpandOn] = useState(true);

  // 🌟 Card Title / Blur이벤트 발생시 최상단 cardsData에 반영
  const handleModifyCardTitle = ({ target }) => {
    modifyCardTitle(cardId, target.value);

    try {
      axios //
        .post(
          'https://todaying.cf/main/updateTitle',
          { cardId, title: target.value },
          { headers: { Authorization: `Bearer ${token}` } },
        );
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = () => {
    deleteCard(cardId);

    try {
      axios //
        .post(
          'https://todaying.cf/main/deleteCard',
          { cardId, type: card.type },
          { headers: { Authorization: `Bearer ${token}` } },
        );
    } catch (err) {
      throw err;
    }
  };

  const checkEnterPress = (e) => {
    // keyCode 13이 enter
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <input
            onKeyDown={checkEnterPress}
            spellCheck="false"
            type="text"
            className={styles.card_header_title}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onBlur={handleModifyCardTitle}
          />
          <div className={styles.card_header_setting}>
            {isEditOn ? (
              <>
                <span className={styles.btn_delete} onClick={handleDelete}>
                  Delete
                </span>
                <span
                  className={styles.btn_done}
                  onClick={() => setIsEditOn(false)}
                >
                  Done
                </span>
              </>
            ) : (
              <img
                className={styles.card_header_setting_editIcon}
                src={editIcon}
                alt="edit"
                onClick={() => {
                  setIsEditOn(true);
                }}
              />
            )}
          </div>
        </div>

        <div
          className={`${styles.content_container} ${
            isExpandOn && styles.expanded
          }`}
        >
          {card.type === 'note' ? (
            <NoteCard
              token={token}
              text={card.text}
              cardId={cardId}
              modifyNoteCardData={modifyNoteCardData}
            />
          ) : card.type === 'toDo' ? (
            <ToDoTasks
              token={token}
              editOn={isEditOn}
              tasks={card.content}
              cardId={cardId}
              modifyToDoCardData={modifyToDoCardData}
              deleteToDoCardData={deleteToDoCardData}
              handleSpinner={handleSpinner}
            />
          ) : (
            ''
          )}
        </div>

        {/* Expanding & Folding */}
        <div className={styles.card_bottom_icons}>
          {isExpandOn ? (
            <img
              className={styles.card_expandIcon}
              src={foldIcon}
              alt="fold"
              onClick={() => setIsExpandOn((prev) => !prev)}
            />
          ) : (
            <img
              className={styles.card_expandIcon}
              src={expandIcon}
              alt="expand"
              onClick={() => setIsExpandOn((prev) => !prev)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
