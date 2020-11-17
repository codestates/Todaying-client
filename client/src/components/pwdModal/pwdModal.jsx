import { React, useState } from 'react';
import axios from 'axios';
import styles from './pwdModal.module.css';
import Modal from '../Modal/Modal';
import checkIcon from '../../images/check.png';
import errorIcon from '../../images/error.png';

const PwdModal = ({ modalName, isModalOn, handleModal }) => {
  // 여기서부터 password modal 관련한 로직
  // 1) 패스워드 입력을 했는지 여부(+) null이면 버튼 못누르고, 에러 메시지 띄우도록 + change 버튼 비활성화
  // 2) 패스워드 불일치시에는 불일치 에러 메시지
  // 3) 패스워드와 confirm패스워드가 다를 떄도 에러 메시지로 처리
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
    currentPassword: '',
  });

  const [isError, setIsError] = useState(false);

  const [valid, setValid] = useState({
    isValid: false,
    newPasswordValid: null,
    confirmPasswordValid: null,
    currentPasswordValid: null,
  });

  const validatePasswordCheck = (passwordCheck) => {
    return password.newPassword !== passwordCheck;
  };

  const validatePassword = (pwd) => {
    return pwd.length >= 8 && pwd.length <= 20;
  };

  const checkForm = ({ target }) => {
    // 만약 비밀번호가 틀렸으면 새로 수정하면 에러는 더이상 보여줄 필요가 없음
    setIsError(false);

    if (target.name === 'newPassword') {
      setPassword({ ...password, newPassword: target.value.trim() });
      if (!validatePassword(target.value)) {
        setValid({ ...valid, newPasswordValid: false });
      } else {
        setValid({ ...valid, newPasswordValid: true });
      }
    } else if (target.name === 'confirmPassword') {
      setPassword({ ...password, confirmPassword: target.value.trim() });
      if (!validatePassword(target.value)) {
        setValid({ ...valid, confirmPasswordValid: false });
      } else if (validatePasswordCheck(target.value)) {
        setValid({ ...valid, confirmPasswordValid: false });
      } else {
        setValid({ ...valid, confirmPasswordValid: true });
      }
    } else if (target.name === 'currentPassword') {
      setPassword({ ...password, currentPassword: target.value });
      if (target.value.trim().length <= 0) {
        setValid({ ...valid, currentPasswordValid: false });
      } else {
        setValid({ ...valid, currentPasswordValid: true });
      }
    }
  };

  const changePassword = async () => {
    const obj = {
      email: 'test2@mail.com',
      newPassword: password.newPassword,
      currentPassword: password.currentPassword,
    };
    try {
      const response = await axios.post(
        'https://387b5293dc84.ngrok.io/mypage/editpassword',
        obj,
        { withCredentials: true },
      );
      if (response.data === 'success') {
        handleModal();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          setIsError('403');
          // 비밀번호 에러
        } else if (err.response.status === 422) {
          setIsError('422');
          // 닉네임 혹은 이메일 누락의 경우
        }
      } else {
        throw err;
      }
    }
  };

  return (
    <Modal
      setIsErrorPassword={setIsError}
      isModalOn={isModalOn}
      handleModal={handleModal}
      modalName={modalName}
      setPassword={setPassword}
      setPwdValid={setValid}
    >
      <div className={styles.title}>Change Password</div>

      <div className={styles.container_new}>
        <input
          className={styles.input_pwd}
          id={styles.input_newPwd}
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={password.newPassword}
          onChange={checkForm}
        />
        {valid.newPasswordValid === null ? (
          ''
        ) : valid.newPasswordValid ? (
          <img className={styles.checkIcon} src={checkIcon} alt="check" />
        ) : (
          <img className={styles.errorIcon} src={errorIcon} alt="error" />
        )}
      </div>

      <div className={styles.container_confirm}>
        <input
          className={styles.input_pwd}
          id={styles.input_confirmPwd}
          name="confirmPassword"
          type="password"
          value={password.confirmPassword}
          placeholder="Confirm Password"
          onChange={checkForm}
        />
        {valid.confirmPasswordValid === null ? (
          ''
        ) : valid.confirmPasswordValid ? (
          <img className={styles.checkIcon} src={checkIcon} alt="check" />
        ) : (
          <img className={styles.errorIcon} src={errorIcon} alt="error" />
        )}
      </div>

      <div className={styles.container_current}>
        <input
          className={styles.input_pwd}
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={password.currentPassword}
          onChange={checkForm}
        />
        {valid.currentPasswordValid === null ? (
          ''
        ) : valid.currentPasswordValid ? (
          <img className={styles.checkIcon} src={checkIcon} alt="check" />
        ) : (
          <img className={styles.errorIcon} src={errorIcon} alt="error" />
        )}
      </div>

      {isError ? (
        isError === '403' ? (
          <div className={styles.error}>wrong password !</div>
        ) : isError === '422' ? (
          <div className={styles.error}>server error, please try later</div>
        ) : null
      ) : null}

      {valid.newPasswordValid &&
      valid.confirmPasswordValid &&
      valid.currentPasswordValid ? (
        <button className={styles.btn} type="submit" onClick={changePassword}>
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

export default PwdModal;
