import React from 'react';
import styles from './NoteCard.module.css';
import editIcon from '../../images/edit.png';
import Card from '../Card/Card';

const NoteCard = ({ title, text }) => {
  return (
    <Card title={title}>
      <textarea className={styles.textArea} placeholder="write here">
        {text}
      </textarea>
    </Card>
  );
};

export default NoteCard;
