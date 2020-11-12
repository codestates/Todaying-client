import React, { useState } from 'react';
import styles from './LandingPage.module.css';
import googleIcon from '../../images/google.png';
import githubIcon from '../../images/github.png';
import facebookIcon from '../../images/facebook.png';
import SignUp from '../../components/SignUp/SignUp';
import Login from '../../components/Login/Login';

const LandingPage = () => {
  const [isModalOn, setIsModalOn] = useState(false);

  const handleModal = () => {
    setIsModalOn((prevState) => !prevState);
  };

  const handleSocialLogin = (e) => {
    if (e.target.name === 'google') {
      console.log('google social login!!!');
    } else if (e.target.name === 'github') {
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
          <Login />
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

            <img
              className={styles.githubIcon}
              src={githubIcon}
              alt="github"
              name="github"
              onClick={handleSocialLogin}
            />

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
