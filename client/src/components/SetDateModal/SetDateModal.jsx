import { createRef, React, useState } from 'react';
import styles from './SetDateModal.module.css';
import PureModal from '../PureModal/PureModal';

const SetDateModal = ({
  setDate,
  isModalOn,
  handleModal,
  token,
  getAllCards,
}) => {
  const [isValid, setIsValid] = useState(false);
  const dateRef = createRef();

  const handleClose = () => {
    handleModal();
    dateRef.current.value = null;
    setIsValid(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateArr = dateRef.current.value.split('-');
      const year = dateArr[0];
      const month = dateArr[1];
      const date = dateArr[2];
      const searchDate = `${month}/${date}/${year}`;
      getAllCards(token, searchDate);
      const day = new Date(dateRef.current.value);
      setDate(day);
      handleClose();
    } catch (err) {
      if (err.response) {
        throw err;
      }
    }
  };

  const handleDate = async (e) => {
    if (e.target.value.trim().length === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
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
            ref={dateRef}
            className={styles.date}
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
