import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import styles from './DeleteAccount.module.css';
import checkIcon from '../../images/check.png';
import errorIcon from '../../images/error.png';

const DeleteAccount = ({ isOn, handleModal }) => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(null);

  const validatePassword = (pwd) => {
    return pwd.length >= 8 && pwd.length <= 20;
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    // 유효성검사
    if (!validatePassword(e.target.value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleDelete = () => {
    // 서버에 삭제 요청
    // 응답에 따라 유저에게 오류메시지(비밀번호 틀림)
    // ok응답 시에는 로그아웃 + 랜딩으로 리다이렉트
    // axios.post('http://', { password }).then(console.log).catch(console.log);
    console.log(password);
    setPassword('');
    setIsValid(null);
  };

  return (
    <>
      <Modal isModalOn={isOn} handleModal={handleModal}>
        <div className={styles.del_title}>Delete Account</div>
        <section className={styles.del_flexcontainer}>
          <p className={styles.del_p}>We are sorry you weren't satisfied</p>
          <p className={styles.del_p}>
            Please enter your password to delete your account
          </p>
          <div className={styles.del_input_container}>
            <input
              onChange={handleChangePassword}
              value={password}
              className={styles.del_input}
              type="password"
              placeholder="Confirm Password"
            />

            {isValid === null ? (
              ''
            ) : isValid ? (
              <img className={styles.checkIcon} src={checkIcon} alt="check" />
            ) : (
              <img className={styles.errorIcon} src={errorIcon} alt="error" />
            )}
          </div>
          <p className={styles.del_warning}>
            deleted accounts cannot be recovered
          </p>

          {isValid ? (
            <button type="button" className={styles.btn} onClick={handleDelete}>
              Confirm
            </button>
          ) : (
            <button type="button" className={styles.btn_off}>
              Confirm
            </button>
          )}
        </section>
      </Modal>
    </>
  );
};

export default DeleteAccount;
