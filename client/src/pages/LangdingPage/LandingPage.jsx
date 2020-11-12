import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './LandingPage.module.css';
import emailIcon from '../../images/baseline_email_white_18dp.png';
import passwordIcon from '../../images/baseline_lock_white_18dp.png';
import googleIcon from '../../images/google.png';
import githubIcon from '../../images/github.png';
import facebookIcon from '../../images/facebook.png';
import SignUp from '../../components/SignUp/SignUp';

const LandingPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // const response = await axios.post('http://aaaa.com:3000', {
    //   data: { email, password },
    // });

    console.log('Email:', email, 'Password:', password);
    setEmail('');
    setPassword('');
  };

  const handleModal = () => {
    setIsModalOn((prevState) => !prevState);
  };

  const handleSocialLogin = (e) => {
    if (e.target.name === 'google') {
      console.log('google social login!!!');
    } else if (e.target.name === 'github') {
      // history.push(
      //   'http://github.com/login/oauth/authorize?client_id=a31a399f5225b01cf66a',
      // );
      console.log('github  !!!!');
    } else if (e.target.name === 'facebook') {
      console.log('facebook  !!!');
    }
  };

  return (
    <>
      <SignUp
        isModalOn={isModalOn}
        handleModal={handleModal}
        handleSocialLogin={handleSocialLogin}
      />

      <div className={styles.section}>
        <div className={styles.bgTop}></div>
        <div className={styles.bgBottom}></div>
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Today-ing</h1>
        <h3 className={styles.description}>Write out your plan every day</h3>
        <div className={styles.box}>
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
              <img
                className={styles.passwordIcon}
                src={passwordIcon}
                alt="pwd"
              />
              <input
                className={styles.input_password}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <button
              type="submit"
              className={styles.btn_signIn}
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </form>

          <button
            type="button"
            className={styles.btn_newAccount}
            onClick={handleModal}
          >
            Create new account
          </button>

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
        </div>

        <h3 className={styles.desc1}>
          Build your to-do list around your goals
        </h3>
        <h3 className={styles.desc}>Notes your daily thoughts</h3>
        <h3 className={styles.desc}>Track your daily habits</h3>
      </div>
    </>
  );
};

export default LandingPage;
