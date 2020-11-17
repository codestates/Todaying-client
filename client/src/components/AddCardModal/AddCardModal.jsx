import axios from 'axios';
import React, { createRef, useState } from 'react';
import PureModal from '../PureModal/PureModal';
import styles from './AddCardModal.module.css';

const AddCardModal = ({ isModalOn, handleModal }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(title, selectRef.current.value);
    // ***axios.post()
  };

  const handleClose = () => {
    handleModal();
    setTitle('');
  };

  return (
    <>
      <PureModal isModalOn={isModalOn} handleModal={handleClose}>
        <div className={styles.add_title}>Add a new card</div>
        <p className={styles.add_msg}>Select card type</p>

        <form className={styles.add_flexcontainer}>
          <select id="noteType" className={styles.add_select} ref={selectRef}>
            <option value="note">Note</option>
            <option value="todolist">To Do List</option>
          </select>

          <input
            type="text"
            className={styles.title}
            placeholder="Title"
            value={title}
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
