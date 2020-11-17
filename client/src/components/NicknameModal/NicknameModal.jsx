import { React, useState } from 'react';
import axios from 'axios';
import styles from './NicknameModal.module.css';
import Modal from '../Modal/Modal';
// import axios from 'axios';

const NicknameModal = ({
  // userInforms,
  modalName,
  nickname: propsnickname,
  isModalOn,
  handleModal,
}) => {
  const [nickname, setNickname] = useState(propsnickname);
  // const [userInform, setUserInforn] = useState({
  //   email: userInform.email,
  //   nickname: userInform.nickname,
  // });
  // 오류 상태 관리
  const [isError, setIsError] = useState(false);

  const changeNickname = async () => {
    try {
      const response = await axios.post(
        'https://387b5293dc84.ngrok.io/mypage/editnickname',
        {
          email: 'test2@mail.com',
          nickname,
        },
        { withCredentials: true },
      );
      if (response.data === 'success') {
        handleModal();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          setIsError('500');
          // 서버측 에러
        } else if (err.response.status === 422) {
          setIsError('422');
          // 닉네임 혹은 이메일 누락의 경우
        }
      } else {
        throw err;
      }
    }
    // axios.post('www.example.com/changeNickname', {
    // body에 바꿀 nickname 넣어서 post요청 =>
    // if(success) {
    // } else {
    // }
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
