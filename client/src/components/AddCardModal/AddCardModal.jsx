import axios from 'axios';
import React, { createRef, useState } from 'react';
import PureModal from '../PureModal/PureModal';
import styles from './AddCardModal.module.css';

const AddCardModal = ({
  isModalOn,
  handleModal,
  addNewCard,
  token,
  selectedDate,
  handleSpinner,
}) => {
  const selectRef = createRef();
  const [title, setTitle] = useState('');
  const [isValid, setIsValid] = useState(false);

  const titleValidation = (t) => {
    if (t.length > 0 && t.length < 25) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleClose = () => {
    handleModal();
    setTitle('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const MM =
      selectedDate.month.toString().length < 2
        ? `0${selectedDate.month}`
        : selectedDate.month;
    const DD =
      selectedDate.date.toString().length < 2
        ? `0${selectedDate.date}`
        : selectedDate.date;

    try {
      handleSpinner();
      const response = await axios //
        .post(
          'https://todaying.cf/main/addCard',
          {
            title,
            type: selectRef.current.value,
            date: `${MM}/${DD}/${selectedDate.year}`,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );

      const { cardId: id, title: ti, type: ty, taskId } = response.data;
      if (!taskId) {
        await addNewCard(id, ti, ty);
      } else {
        await addNewCard(id, ti, ty, taskId);
      }

      handleClose();
    } catch (err) {
      throw err;
    } finally {
      handleSpinner();
    }
  };

  return (
    <>
      <PureModal isModalOn={isModalOn} handleModal={handleClose}>
        <div className={styles.add_title}>Add a new card</div>
        <p className={styles.add_msg}>Select card type</p>

        <form className={styles.add_flexcontainer}>
          <select id="noteType" className={styles.add_select} ref={selectRef}>
            <option value="note">Note</option>
            <option value="toDo">To Do List</option>
          </select>

          <input
            type="text"
            className={styles.title}
            placeholder="Title"
            value={title}
            spellCheck="false"
            onChange={(e) => {
              setTitle(e.target.value);
              titleValidation(e.target.value);
            }}
          />

          {isValid ? (
            <button type="submit" className={styles.btn} onClick={handleSubmit}>
              Add
            </button>
          ) : (
            <button type="button" className={styles.btn_off}>
              Add
            </button>
          )}
        </form>
      </PureModal>
    </>
  );
};

export default AddCardModal;
