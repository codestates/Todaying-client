import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';
import styles from './DeleteModal.module.css';
import Modal from '../Modal/Modal';

const DeleteModal = ({ isModalOn, handleModal }) => {
  const history = useHistory();
  const [pwdCollect, setPwdCollect] = useState(true);
  const [pwd, handlePwd] = useState('');
  const [removal, setDelete] = useState(false);
  const handlePassword = (e) => {
    handlePwd(e.target.value);
  };

  const deleteAccount = async () => {
    console.log(pwd);
    // const removal = await axios.post('http://todaying.com/logout', {
    // method:"POST",
    // body: {
    //     email,
    //     pwd
    // }
    // });
    // 계정 삭제 요청 (POST)
    // 1) 삭제 요청 성공시=> state를 이용해 removal이라는 state를 true로 바꿔서 모달창에 탈퇴인사를 띄워주고, 4초 뒤에 랜딩 페이지로
    // 2) 비밀번호가 일치하지 않아서 삭제 요청이 실패했을시 => modal 창에 wrong password 띄워주기
    // 3) 서버쪽에서 오류가 발생했을 경우 => 404 error 페이지로

    const deleted = 'collect password';
    if (deleted === 'collect password') {
      setDelete(true);
      setTimeout(function () {
        history.push('/');
      }, 4000);
    } else if (deleted === 'wrong password') {
      setPwdCollect(false);
    } else {
      console.log('server side error');
    }
  };

  return (
    <Modal isModalOn={isModalOn} handleModal={handleModal}>
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
          <input
            className={styles.input_delete}
            type="text"
            placeholder="Confirm password"
            onChange={handlePassword}
          />
          <div className={styles.warning}>
            deleted account cannot be recovered
          </div>
          <button onClick={deleteAccount} className={styles.btn} type="submit">
            Delete
          </button>
        </>
      )}
    </Modal>
  );
};

export default DeleteModal;
