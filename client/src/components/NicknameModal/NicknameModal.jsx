import { React, useState } from 'react';
import styles from './NicknameModal.module.css';
import Modal from '../Modal/Modal';
// import axios from 'axios';

const NicknameModal = ({
  userInforms,
  nickname: propsnickname,
  isModalOn,
  handleModal,
}) => {
  const [nickname, setNickname] = useState(propsnickname);
  // const [userInform, setUserInforn] = useState({
  //   email: userInform.email,
  //   nickname: userInform.nickname,
  // });
  const [isValid, setIsValid] = useState(true);

  const changeNickname = () => {
    console.log('닉네임 변경!');
    // axios.post('www.example.com/changeNickname', {
    // body에 바꿀 nickname 넣어서 post요청 =>
    // if(success) {
    // } else {
    // }
  };

  return (
    <Modal isModalOn={isModalOn} handleModal={handleModal}>
      <div className={styles.title}>Change Nickname</div>
      <div className={styles.alert}>please enter new nickname here</div>
      <div className={styles.container_nickname}></div>
      <input
        className={styles.input_nickname}
        type="text"
        placeholder={nickname}
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value.trim());
        }}
      />
      {nickname.trim().length !== 0 ? null : (
        <div className={styles.warning}>you must type more than a word</div>
      )}
      {nickname.trim().length !== 0 ? (
        <button className={styles.btn} type="submit" onClick={changeNickname}>
          Change
        </button>
      ) : (
        <button className={styles.btn_off} type="submit">
          Change
        </button>
      )}
    </Modal>
  );
};

export default NicknameModal;
