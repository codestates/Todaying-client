import { React, useState } from 'react';
import styles from './Card.module.css';
import editIcon from '../../images/edit.png';
import NoteCard from '../NoteCard/NoteCard';
import ToDoTasks from '../ToDoTasks/ToDoTasks';

const Card = ({ card }) => {
  const [title, setTitle] = useState(card.title);
  const [isEditOn, setIsEditOn] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <input
            type="text"
            className={styles.card_header_title}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className={styles.card_header_setting}>
            {isEditOn ? (
              <>
                <span
                  className={styles.btn_delete}
                  onClick={() => {
                    alert('카드 삭제!');
                  }}
                >
                  Delete
                </span>
                <span
                  className={styles.btn_done}
                  onClick={() => {
                    setIsEditOn(false);
                  }}
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
        {card.type === 'note' ? (
          <NoteCard editOn={isEditOn} text={card.text} />
        ) : card.type === 'toDo' ? (
          <ToDoTasks editOn={isEditOn} tasks={card.content} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Card;
