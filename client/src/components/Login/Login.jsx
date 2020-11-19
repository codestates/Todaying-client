import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import emailIcon from '../../images/baseline_email_white_18dp.png';
import passwordIcon from '../../images/baseline_lock_white_18dp.png';

const Login = ({ getLoginToken, handleSpinner }) => {
  const history = useHistory();
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
    // error 메시지를 띄워주고 나서 다시 시도하기 위해 인풋에 입력을 시작하면 더이상 에러 메시지는 필요없음!
    setIsError(false);
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setIsValid({ ...isValid, email: false });
    } else {
      setIsValid({ ...isValid, email: true });
    }
  };

  const handlePasswordChange = (e) => {
    // error 메시지를 띄워주고 나서 다시 시도하기 위해 인풋에 입력을 시작하면 더이상 에러 메시지는 필요없음!
    setIsError(false);
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
      try {
        handleSpinner();
        const response = await axios.post(
          ' https://todaying.cf/user/signin',
          {
            email,
            password,
          },
          { withCredentials: true },
        );

        // 응답으로 온 token 최상단 컴포넌트로 끌어올려주기.
        getLoginToken(response.data);
        setEmail('');
        setPassword('');
        // 리디렉션
        history.push('/main');
        //
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setIsError(true);
          setPassword('');
        } else {
          throw err;
        }
      } finally {
        handleSpinner();
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
