import { React, useState } from 'react';
import axios from 'axios';
import styles from './NicknameModal.module.css';
import Modal from '../Modal/Modal';
// import axios from 'axios';

const NicknameModal = ({
  changeNickname,
  userInfo,
  modalName,
  isModalOn,
  handleModal,
}) => {
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [isError, setIsError] = useState(false);

  const handleChangeNickname = async () => {
    try {
      const response = await axios.post(
        ' https://112dd5aebf32.ngrok.io/mypage/editnickname',
        {
          email: userInfo.email,
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
        { withCredentials: true },
      );
      changeNickname(nickname);
      if (response.data === 'success') {
        handleModal();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          setIsError('500');
        } else if (err.response.status === 422) {
          setIsError('422');
        }
      } else {
        throw err;
      }
    }
  };

  return (
    <Modal
      setIsErrorNickname={setIsError}
      isModalOn={isModalOn}
      setNickname={setNickname}
      handleModal={handleModal}
      nickname={nickname}
      modalName={modalName}
    >
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
          setIsError(false);
        }}
      />
      {isError ? (
        <div className={styles.warning}>server error, please try again</div>
      ) : null}
      {nickname.trim().length !== 0 ? null : (
        <div className={styles.warning}>you must type more than a word</div>
      )}
      {nickname.trim().length !== 0 ? (
        <button
          className={styles.btn}
          type="submit"
          onClick={handleChangeNickname}
        >
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
