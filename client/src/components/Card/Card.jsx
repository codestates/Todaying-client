import { React, useState } from 'react';
import styles from './Card.module.css';
import editIcon from '../../images/edit.png';

const Card = ({ title: cardName, editOn, setEditOn, children }) => {
  // 1) isEditOn을 만들어놓고(cards부터 받아온 데이터)
  // 2) 컴포넌트를 렌더링할 때부터 state editOn에 받아온 isEditOn을 넣어준다
  const [title, setTitle] = useState(cardName);

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
            {/* editIsOn ?? */}
            {editOn ? (
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
                  // 3) Done을 누르면 editOn이 반대로 되면서 수정버튼이 사라지고,
                  onClick={() => {
                    setEditOn(!editOn);
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
                  // 4) 연필모양 버튼을 누르면 editOn이 반대로 되면서 수정버튼이 생긴다.
                  setEditOn(!editOn);
                }}
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
