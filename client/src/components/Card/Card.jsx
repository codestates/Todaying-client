import { React } from 'react';
import styles from './Card.module.css';
import editIcon from '../../images/edit.png';

const Card = ({ title, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <input
            type="text"
            className={styles.card_header_title}
            value="Title State"
          />
          <div className={styles.card_header_setting}>
            {/* editIsOn ?? */}
            {false ? (
              <>
                <span className={styles.btn_delete}>Delete</span>
                <span className={styles.btn_done}>Done</span>
              </>
            ) : (
              <img
                className={styles.card_header_setting_editIcon}
                src={editIcon}
                alt="edit"
                onClick={() => alert('여기에 편집 기능 나중에 넣기')}
              />
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
