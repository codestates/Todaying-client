import React from 'react';
import styles from './NoteCard.module.css';

const NoteCard = ({ text }) => {
  return (
    <textarea className={styles.textArea} placeholder="write here">
      {text}
    </textarea>
  );
};

export default NoteCard;
