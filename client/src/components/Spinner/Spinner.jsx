import React from 'react';
import styles from './Spinner.module.css';

const Spinner = (spinnerIsOn) => {
  return (
    <div className={`${styles.dimmer} ${true && styles.isOn}`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;
