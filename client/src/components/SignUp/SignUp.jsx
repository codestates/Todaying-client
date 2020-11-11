import React, { useState } from 'react';
import GoogleLogin from 'react-google-login'
import Modal from '../Modal/Modal';
import styles from './SignUp.module.css';
import googleIcon from '../../images/google.png';
import githubIcon from '../../images/github.png';
import facebookIcon from '../../images/facebook.png';

const SignUp = ({ isModalOn, handleModal, handleSocialLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  const handleChangeForm = ({ target }) => {
    if (target.name === 'email') {
      setForm({ ...form, email: target.value });
    } else if (target.name === 'password') {
      setForm({ ...form, password: target.value });
    } else if (target.name === 'passwordCheck') {
      setForm({ ...form, passwordCheck: target.value });
    } else if (target.name === 'nickname') {
      setForm({ ...form, nickname: target.value });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(form);
    // 서버통신

    // 서버 응답에 오류 코드에 따라서. 오류 처리 로직

    // 서버 응답 이상 없으면,
    // 입력칸 비우기
    setForm({
      email: '',
      password: '',
      passwordCheck: '',
      nickname: '',
    });

    // 모달창 닫기
    handleModal();

    // 투데이 페이지로 리다이렉트
  };

  return (
    <Modal isModalOn={isModalOn} handleModal={handleModal}>
      <form className={styles.form}>
        <input
          name="email"
          className={styles.input_email}
          type="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChangeForm}
        />
        <input
          name="password"
          className={styles.input_password}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChangeForm}
        />
        <input
          name="passwordCheck"
          className={styles.input_password_check}
          type="password"
          placeholder="Confirm password"
          value={form.passwordCheck}
          onChange={handleChangeForm}
        />
        <input
          name="nickname"
          className={styles.input_nickname}
          type="text"
          placeholder="Nickname"
          value={form.nickname}
          onChange={handleChangeForm}
        />
        <button type="submit" className={styles.btn} onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
      <p className={styles.msg}>or you can sign in with</p>
      <div className={styles.logins}>
        <GoogleLogin className={styles.googleLogin} icon={false} buttonText='' clientId="873832405311-8nodgb78u7lc4iaqbjfgsdhacs7frjoj.apps.googleusercontent.com">
          <img
            className={styles.googleIcon}
            src={googleIcon}
            alt="google"
            name="google"
            onClick={handleSocialLogin}
          />
        </GoogleLogin>
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
