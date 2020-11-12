import React, { useState } from 'react';
// import axios from 'axios';
import Modal from '../Modal/Modal';
import styles from './SignUp.module.css';
import googleIcon from '../../images/google.png';
import githubIcon from '../../images/github.png';
import facebookIcon from '../../images/facebook.png';
import checkIcon from '../../images/check.png';
import errorIcon from '../../images/error.png';

const SignUp = ({ isModalOn, handleModal, handleSocialLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  // 각 인풋 유효성 검사 상태
  const [isValid, setIsValid] = useState({
    email: null,
    password: null,
    passwordCheck: null,
    nickname: null,
  });

  // Utility functions for Validation
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 20;
  };
  const validatePasswordCheck = (passwordCheck) => {
    console.log('=======', form.password);
    return form.password === passwordCheck;
  };
  const validateNickname = (nickname) => {
    return nickname.length >= 1 && nickname.length <= 12;
  };

  // HandleChange => validation check and set state
  const handleChangeForm = ({ target }) => {
    if (target.name === 'email') {
      setForm({ ...form, email: target.value });
      // if false
      if (!validateEmail(target.value)) {
        setIsValid({ ...isValid, email: false });
      } else {
        setIsValid({ ...isValid, email: true });
      }
    } else if (target.name === 'password') {
      setForm({ ...form, password: target.value });
      // if false
      if (!validatePassword(target.value)) {
        setIsValid({ ...isValid, password: false });
      } else {
        setIsValid({ ...isValid, password: true });
      }
    } else if (target.name === 'passwordCheck') {
      setForm({ ...form, passwordCheck: target.value });
      // if false
      if (!validatePasswordCheck(target.value)) {
        setIsValid({ ...isValid, passwordCheck: false });
      } else {
        setIsValid({ ...isValid, passwordCheck: true });
      }
    } else if (target.name === 'nickname') {
      setForm({ ...form, nickname: target.value });
      // if false
      if (!validateNickname(target.value)) {
        setIsValid({ ...isValid, nickname: false });
      } else {
        setIsValid({ ...isValid, nickname: true });
      }
    }
  };

  // Sign Up Button
  const handleSignUp = async (e) => {
    e.preventDefault();
    // const { email, password, nickname } = form;
    // 1. 서버통신
    // try {
    //   const response = await axios.post('http://localhost:3000', {
    //     email,
    //     password,
    //     nickname,
    //   });
    // } catch (err) {
    //   // 오류메시지 status에 따라서 핸들링
    // }

    // 2. 로딩하는 동안 스피너 돌려주기

    // 3. 서버 응답에 오류 코드에 따라서. 오류 처리 로직

    // 4. 서버 응답 ok -> 정상적으로 가입 되었음 안내 -> 확인 누르면 -> 로그인페이지로 이동

    alert('Completed! Welcome aboard'); // 임시로 얼럿창 사용

    setForm({ email: '', password: '', passwordCheck: '', nickname: '' });
    setIsValid({
      email: null,
      password: null,
      passwordCheck: null,
      nickname: null,
    });

    // 모달창 닫기
    handleModal();
  };

  return (
    <Modal isModalOn={isModalOn} handleModal={handleModal}>
      <form className={styles.form}>
        <div className={styles.email_container}>
          <input
            name="email"
            className={styles.input_email}
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChangeForm}
          />
          {isValid.email === null ? (
            ''
          ) : isValid.email ? (
            <img className={styles.checkIcon} src={checkIcon} alt="check" />
          ) : (
            <img className={styles.errorIcon} src={errorIcon} alt="error" />
          )}
        </div>

        <div className={styles.pwd_container}>
          <input
            name="password"
            className={styles.input_password}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChangeForm}
          />
          {isValid.password === null ? (
            ''
          ) : isValid.password ? (
            <img className={styles.checkIcon} src={checkIcon} alt="check" />
          ) : (
            <img className={styles.errorIcon} src={errorIcon} alt="error" />
          )}
        </div>

        <div className={styles.pwdCheck_container}>
          <input
            name="passwordCheck"
            className={styles.input_password_check}
            type="password"
            placeholder="Confirm password"
            value={form.passwordCheck}
            onChange={handleChangeForm}
          />
          {isValid.passwordCheck === null ? (
            ''
          ) : isValid.passwordCheck ? (
            <img className={styles.checkIcon} src={checkIcon} alt="check" />
          ) : (
            <img className={styles.errorIcon} src={errorIcon} alt="error" />
          )}
        </div>

        <div className={styles.nickname_container}>
          <input
            name="nickname"
            className={styles.input_nickname}
            type="text"
            placeholder="Nickname"
            value={form.nickname}
            onChange={handleChangeForm}
          />
          {isValid.nickname === null ? (
            ''
          ) : isValid.nickname ? (
            <img className={styles.checkIcon} src={checkIcon} alt="check" />
          ) : (
            <img className={styles.errorIcon} src={errorIcon} alt="error" />
          )}
        </div>

        {isValid.email &&
        isValid.password &&
        isValid.passwordCheck &&
        isValid.nickname ? (
          <button type="submit" className={styles.btn} onClick={handleSignUp}>
            Sign Up
          </button>
        ) : (
          <button type="button" className={styles.btn_off}>
            Sign Up
          </button>
        )}
      </form>
      <p className={styles.msg}>or you can sign in with</p>
      <div className={styles.logins}>
        <img
          className={styles.googleIcon}
          src={googleIcon}
          alt="google"
          name="google"
          onClick={handleSocialLogin}
        />
        <a href="http://github.com/login/oauth/authorize?client_id=a31a399f5225b01cf66a">
          <img
            className={styles.githubIcon}
            src={githubIcon}
            alt="github"
            name="github"
            onClick={handleSocialLogin}
          />
        </a>
        <img
          className={styles.facebookIcon}
          src={facebookIcon}
          alt="facebook"
          name="facebook"
          onClick={handleSocialLogin}
        />
      </div>
    </Modal>
  );
};

export default SignUp;
