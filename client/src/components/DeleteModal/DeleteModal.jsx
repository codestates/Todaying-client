import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './DeleteModal.module.css';
import Modal from '../Modal/Modal';
import checkIcon from '../../images/check.png';
import errorIcon from '../../images/error.png';

const DeleteModal = ({
  userInfo,
  modalName,
  isModalOn,
  handleModal,
  handleSpinner,
}) => {
  const history = useHistory();
  const [isValid, setValid] = useState(null);
  const [password, setPassword] = useState('');
  const [removal, setDelete] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    if (target.value.length <= 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const deleteAccount = async () => {
    try {
      handleSpinner();
      const response = await axios.post(
        'https://todaying.cf/mypage/delete',
        {
          email: userInfo.email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
        { withCredentials: true },
      );
      if (response.data === 'success') {
        setDelete(true);
        setTimeout(() => {
          history.push('/');
        }, 4000);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          setIsError('403');
        } else if (err.response.status === 422) {
          setIsError('422');
        } else {
          setIsError('500');
        }
      } else {
        throw err;
      }
    } finally {
      handleSpinner();
    }
  };

  return (
    <Modal
      setIsErrorDelete={setIsError}
      setPasswordDelete={setPassword}
      isModalOn={isModalOn}
      handleModal={handleModal}
      modalName={modalName}
      setDeleteValid={setValid}
    >
      {removal ? (
        <div className={styles.delete}>
          <div className={styles.delete1}>Thank you!</div>
          <div className={styles.delete2}>Deleted account successfully</div>
          <div className={styles.delete3}>Hope we could see again</div>
        </div>
      ) : (
        <>
          <div className={styles.title}>Delete Account</div>
          <div className={styles.alert_1}>
            Are you sure you want to delete account?
          </div>
          <div className={styles.alert_2}>
            if so, please enter your password here
          </div>
          <div className={styles.container_delete}>
            <input
              className={styles.input_delete}
              type="password"
              value={password}
              placeholder="Current password"
              onChange={handleChangePassword}
            />
            {isValid === null ? (
              ''
            ) : isValid ? (
              <img className={styles.checkIcon} src={checkIcon} alt="check" />
            ) : (
              <img className={styles.errorIcon} src={errorIcon} alt="error" />
            )}
          </div>

          <div className={styles.warning}>
            deleted account cannot be recovered
          </div>
          {isError ? (
            isError === '403' ? (
              <div className={styles.error}>wrong password !</div>
            ) : isError === '422' ? (
              <div className={styles.error}>server error, please try later</div>
            ) : (
              <div className={styles.error}>server error, please try later</div>
            )
          ) : null}
          {isValid ? (
            <button
              onClick={deleteAccount}
              className={styles.btn}
              type="submit"
            >
              Delete
            </button>
          ) : (
            <button className={styles.btn_off} type="button">
              Delete
            </button>
          )}
        </>
      )}
    </Modal>
  );
};

export default DeleteModal;
