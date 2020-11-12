import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Nav.module.css';

const Nav = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.nav}>
        <h4 className={styles.title}>Today-ing</h4>

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
