import { React, useState } from 'react';
import axios from 'axios';
import styles from './pwdModal.module.css';
import Modal from '../Modal/Modal';
import checkIcon from '../../images/check.png';
import errorIcon from '../../images/error.png';

const PwdModal = ({ userInfo, modalName, isModalOn, handleModal }) => {
  const [email] = useState(userInfo.email);

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
    try {
      const response = await axios.post(
        'https://112dd5aebf32.ngrok.io/mypage/editpassword',
        {
          email,
          newPassword: password.newPassword,
          currentPassword: password.currentPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
        { withCredentials: true },
      );
      if (response.data === 'success') {
        handleModal();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          setIsError('403');
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
