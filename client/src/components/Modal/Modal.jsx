import React from 'react';
import styles from './Modal.module.css';
import close from '../../images/close.png';

// Props로 ModalOn여부 및 handle모달 함수
const Modal = ({ isModalOn, handleModal, children }) => {
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

          {/* 모달 재활용 하는 컴포넌트에서 <Modal> </Modal> 사이에
            작성한 내용들이 아래 children 부분에 삽입됨 */}
          {children}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
