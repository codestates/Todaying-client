import { React, useState } from 'react';
import styles from './SetDateModal.module.css';
import PureModal from '../PureModal/PureModal';

const SetDateModal = ({ isModalOn, handleModal, token, getAllCards }) => {
  const [isValid, setIsValid] = useState(false);
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateArr = date.value.split('-');

    const year = dateArr[0];
    const month = dateArr[1];
    const dates = dateArr[2];
    const searchDate = `${month}/${dates}/${year}`;
    try {
      getAllCards(token, searchDate);
    } catch (err) {
      if (err.response) {
        throw err;
      }
    }
  };

  const handleClose = () => {
    handleModal();
  };

  const handleDate = async (e) => {
    if (e.target.value !== null) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      <PureModal isModalOn={isModalOn} handleModal={handleClose}>
        <div className={styles.date_title}>Select a date</div>
        <p className={styles.date_msg}>Write a date to search</p>

        <form className={styles.date_form}>
          <input
            type="date"
            className={styles.date}
            ref={(ref) => {
              setDate(ref);
            }}
            onChange={handleDate}
          />

          {isValid ? (
            <button type="button" className={styles.btn} onClick={handleSubmit}>
              Search
            </button>
          ) : (
            <button type="button" className={styles.btn_off}>
              Search
            </button>
          )}
        </form>
      </PureModal>
    </>
  );
};

export default SetDateModal;
