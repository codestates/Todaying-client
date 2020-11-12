import React from 'react';
import styles from './NicknameModal.module.css';
import Modal from '../Modal/Modal';

const NicknameModal = ({ nickname, isModalOn, handleModal }) => {
  return (
    <Modal isModalOn={isModalOn} handleModal={handleModal}>
      <div className={styles.title}>Change Nickname</div>
      <div className={styles.alert}>please enter new nickname here</div>
      <input className={styles.input_nickname} type="text" />
      <button className={styles.btn} type="submit">
        Change
      </button>
    </Modal>
  );
};

export default NicknameModal;
