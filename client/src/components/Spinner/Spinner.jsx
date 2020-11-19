import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ spinIsOn }) => {
  return (
    <div className={`${styles.dimmer} ${spinIsOn && styles.isOn}`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;
