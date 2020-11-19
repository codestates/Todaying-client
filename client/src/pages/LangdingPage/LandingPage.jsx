import React, { useState } from 'react';
import styles from './LandingPage.module.css';
import googleIcon from '../../images/google.png';
import githubIcon from '../../images/github.png';
import facebookIcon from '../../images/facebook.png';
import SignUp from '../../components/SignUp/SignUp';
import Login from '../../components/Login/Login';
import logo from '../../images/Today-ing.png';
// import Footer from '../../components/Footer/Footer';

const LandingPage = ({ getLoginToken, handleSpinner }) => {
  const [isModalOn, setIsModalOn] = useState(false);

  const handleModal = () => {
    setIsModalOn((prevState) => !prevState);
  };

  const handleSocialLogin = async (e) => {
    if (e.target.name === 'google') {
      window.location.href =
        'https://accounts.google.com/o/oauth2/v2/auth?client_id=617535918494-33pln0uqg6aeu3lam22b7go4c7n2ra6c.apps.googleusercontent.com&redirect_uri=https://todaying.cf/auth/google&response_type=code&scope=openid%20profile%20email';
    } else if (e.target.name === 'github') {
      window.location.href =
        'https://github.com/login/oauth/authorize?client_id=5eab3157a830fb8a372f&scope=user&redirect_uri=http://todaying.cf/auth/git';
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
        getLoginToken={getLoginToken}
        handleSpinner={handleSpinner}
      />

      <div className={styles.section}>
        <div className={styles.bgTop}></div>
        <div className={styles.bgBottom}></div>
      </div>

      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo" />

        <h3 className={styles.description}>Write out your plan every day</h3>
        <div className={styles.box}>
          <Login getLoginToken={getLoginToken} handleSpinner={handleSpinner} />
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
      {/* <Footer /> */}
    </>
  );
};

export default LandingPage;
