import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
// import axios from 'axios';
import todayingIcon from '../../images/Today-ing.png';
import userIcon from '../../images/user.png';
import logoutIcon from '../../images/logout.png';
import styles from './Nav.module.css';

const Nav = () => {
  const history = useHistory();
  const handleLogout = () => {
    console.log('logout!');
    history.push('/');
  };

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.title}>
          <img
            onClick={() => history.push('/main')}
            className={styles.logoImg}
            src={todayingIcon}
            alt="logo"
          />
        </div>

        <div className={styles.menu}>
          <img
            className={styles.mob_mypage}
            src={userIcon}
            alt="my"
            onClick={() => history.push('/mypage')}
          />
          <img
            className={styles.mob_logout}
            src={logoutIcon}
            alt="logout"
            onClick={handleLogout}
          />
          <NavLink
            to="/mypage"
            className={styles.menu_mypage}
            activeClassName={styles.active}
          >
            My Page
          </NavLink>

          <div onClick={handleLogout} className={styles.menu_logout}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
