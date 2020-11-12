import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './DeleteModal.module.css';
import Modal from '../Modal/Modal';
import checkIcon from '../../images/check.png';
import errorIcon from '../../images/error.png';

const DeleteModal = ({ userInform, modalName, isModalOn, handleModal }) => {
  const history = useHistory();
  const [pwdCollect, setPwdCollect] = useState(true);
  const [isValid, setValid] = useState(null);
  const [password, setPassword] = useState('');
  const [removal, setDelete] = useState(false);

  // 오류 상태 관리
  const [isError, setIsError] = useState(false);

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    // 유효성검사
    if (target.value.length <= 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.post(
        'http://ec2-13-125-255-14.ap-northeast-2.compute.amazonaws.com:3001/mypage/delete',
        {
          // email,
          password,
        },
        { withCredentials: true },
      );
      if (response === 'success') {
        setDelete(true);
        setTimeout(() => {
          history.push('/');
        }, 4000);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          setPwdCollect(false);
          setIsError('500');
          // 비밀번호가 틀린 경우
        } else if (err.response.status === 422) {
          setIsError('422');
          // 비밀번호 혹은 이메일 누락의 경우
        }
      } else {
        throw err;
      }
    }
    // 계정 삭제 요청 (POST)
    // 1) 삭제 요청 성공시=> state를 이용해 removal이라는 state를 true로 바꿔서 모달창에 탈퇴인사를 띄워주고, 4초 뒤에 랜딩 페이지로
    // 2) 비밀번호가 일치하지 않아서 삭제 요청이 실패했을시 => modal 창에 wrong password 띄워주기
    // 3) 서버쪽에서 오류가 발생했을 경우 => 404 error 페이지로

    const deleted = 'collect password';
    if (deleted === 'collect password') {
      setDelete(true);
      setTimeout(() => {
        history.push('/');
      }, 4000);
    } else if (deleted === 'wrong password') {
      setPwdCollect(false);
    } else {
      console.log('server side error');
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
          {pwdCollect ? null : (
            <div className={styles.pwdCollect}>
              wrong password, please try again
            </div>
          )}
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
            isError === '500' ? (
              <div className={styles.error}>wrong password !</div>
            ) : isError === '422' ? (
              <div className={styles.error}>server error, please try later</div>
            ) : null
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
