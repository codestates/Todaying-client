import React from 'react';
import styles from './PureModal.module.css';
import close from '../../images/close.png';

/* 재활용 컴포넌트. 수정하지 말아주세요 */
/* 재활용 컴포넌트. 수정하지 말아주세요 */
/* 재활용 컴포넌트. 수정하지 말아주세요 */
/* 재활용 컴포넌트. 수정하지 말아주세요 */
/* 재활용 컴포넌트. 수정하지 말아주세요 */

const PureModal = ({ isModalOn, handleModal, children }) => {
  const handleClickOutside = (e) => {
    if (isModalOn && e.target.id === 'outside') {
      handleModal();
    }
  };

  return (
    <div>
      <div
        id="outside"
        className={`${styles.dimmer} ${isModalOn && styles.isOn}`}
        onClick={handleClickOutside}
      >
        <div className={styles.box}>
          <img
            className={styles.close}
            src={close}
            alt="close"
            onClick={handleModal}
          />
          {/* ** */}
          {children}
          {/* ** */}
        </div>
      </div>
    </div>
  );
};

export default PureModal;
