import React from 'react';
import styles from './Nav.module.css';

const Nav = () => {
    return (
      <>
        <div className={styles.nav}>

          <h4 className={styles.title}>
            Today-ing
          </h4>

          <div className={styles.menu}>

            <button type="button" className={styles.menu_home}>
              Home
            </button>

            <button type="button" className={styles.menu_my_page}>
              My page
            </button>

            <button type="button" className={styles.menu_logout}>
              Logout
            </button>
          </div>
        </div>
      </>
      );
}

export default Nav;