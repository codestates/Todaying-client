import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import emailIcon from '../../images/baseline_email_white_18dp.png';
import passwordIcon from '../../images/baseline_lock_white_18dp.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState({ email: null, password: null });
  const [isError, setIsError] = useState(false);

  // Utility functions for Validation
  const validateEmail = (_email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(_email).toLowerCase());
  };
  const validatePassword = (_password) => {
    return _password.length >= 8 && _password.length <= 20;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setIsValid({ ...isValid, email: false });
    } else {
      setIsValid({ ...isValid, email: true });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setIsValid({ ...isValid, password: false });
    } else {
      setIsValid({ ...isValid, password: true });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!isValid.email || !isValid.password) {
      setIsError(true);
    } else {
      // 위에서 클라이언트 유효성 검사가 통과되었고, 이제 서버요청 및 핸들링
      try {
        const response = await axios.post(
          'http://ec2-13-125-255-14.ap-northeast-2.compute.amazonaws.com:3001/signup',
          {
            email,
            password,
          },
        );
        setEmail('');
        setPassword('');

        console.log(response.data);
        // *****************************
        // (추가할 사항) 여기에서 응답으로 온 response.data의
        // email, nickname를 최상단컴포넌트로 끌어올려주기.
        // + 라우트 push로 Today페이지로 넘겨주기
        // *****************************
      } catch (err) {
        if (err.response.status === 404) {
          setIsError(true);
          setPassword('');
        }
      }
    }
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.email}>
          <img className={styles.emailIcon} src={emailIcon} alt="email" />
          <input
            className={styles.input_email}
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </div>

        <div className={styles.password}>
          <img className={styles.passwordIcon} src={passwordIcon} alt="pwd" />
          <input
            className={styles.input_password}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <p className={styles.error}>
          {isError ? 'Please check your email and password' : 'ㅤ'}
        </p>
        <button
          type="submit"
          className={styles.btn_signIn}
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default Login;
