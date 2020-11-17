import React from 'react';
import { useHistory } from 'react-router-dom';
import todayingIcon from '../../images/Today-ing.png';
import styles from './Nav.module.css';

const Nav = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.nav}>
        <div
          className={styles.title}
          onClick={() => {
            history.push('/main');
          }}
        >
          <img className={styles.logoImg} src={todayingIcon} alt="logo" />
        </div>

        <div className={styles.menu}>
          <button
            type="button"
            onClick={() => {
              history.push('/main');
            }}
            className={styles.menu_home}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => {
              history.push('/mypage');
            }}
            className={styles.menu_my_page}
          >
            My page
          </button>

          <button
            type="button"
            onClick={() => {
              history.push('/');
            }}
            className={styles.menu_logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
