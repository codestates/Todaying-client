// import axios from 'axios';
import { React, useState } from 'react';
import styles from './SetDateModal.module.css';
import PureModal from '../PureModal/PureModal';

const SetDateModal = ({ isModalOn, handleModal, token, setCardsData }) => {
  const [isValid, setIsValid] = useState(false);
  const [dateInput, setDateInput] = useState(null);
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const dateArr = date.split('-');
    // const year = dateArr[0];
    // const month = dateArr[1];
    // const dates = dateArr[2];
    // const searchDate = `${month}/${dates}/${year}`;
    // try {
    //   const response = await axios.post(
    //     'main/getAllCards',
    //     {
    //       date: searchDate,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   setCardsData(response.data);
    // } catch (err) {
    //   if (err.response) {
    //     throw err;
    //   }
    // }
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
    // const dateFormat = e.target.value.split('/');
    // if (dateFormat.length !== 3) return;
    // const yearCheck = dateFormat[0];
    // const monthCheck = dateFormat[1];
    // const dateCheck = dateFormat[2];
    // if (
    //   yearCheck.length >= 5 ||
    //   (yearCheck.length > 0 && Number.isNaN(Number(yearCheck)))
    // )
    //   return;
    // if (
    //   monthCheck.length >= 3 ||
    //   (monthCheck.length > 0 && Number.isNaN(Number(monthCheck))) ||
    //   parseInt(monthCheck, 10) >= 13
    // )
    //   return;
    // if (
    //   dateCheck.length >= 3 ||
    //   (dateCheck.length > 0 && Number.isNaN(Number(dateCheck))) ||
    //   parseInt(dateCheck, 10) >= 32
    // )
    //   return;
    // await setYear(dateFormat[0]);
    // await setMonth(dateFormat[1]);
    // await setDate(dateFormat[2]);
    // if (
    //   yearCheck.length === 4 &&
    //   monthCheck.length >= 1 &&
    //   dateCheck.length >= 1
    // ) {
    //   setIsValid(true);
    // } else {
    //   setIsValid(false);
    // }
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
