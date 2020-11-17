import { React, useState } from 'react';
import styles from './MyPage.module.css';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import PwdModal from '../../components/pwdModal/pwdModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NicknameModal from '../../components/NicknameModal/NicknameModal';

const MyPage = () => {
  // 로그인이 성공했을 때, 아직 확실치는 않지만, 이메일과 닉네임을 state에 넣고 있을 것(props로 받아오던 어떻게 하던)
  const [email] = useState('dayfly@codestates.com');
  const [nickname] = useState('dayfly');
  // 위의 두개는 로그인하고 받아온 이메일, 닉네임 정보

  const [isModalOn, setIsModalOn] = useState(false);
  // modal 팝업이 보이나 안보이나를 결정하는 state

  const [modalName, setModal] = useState('');
  // modal의 종류를 결정하는 state

  const handleModal = () => {
    setIsModalOn((prevState) => !prevState);
  };
  const handleModalName = (name) => {
    setModal(name);
  };
  // 순서대로 modal 팝업을 보이게 할지 결정하는 함수, 그리고 어떤 모달 팝업을 띄울지 결정하는 함수

  return (
    <div className={styles.mypage}>
      {modalName === 'password' ? (
        <PwdModal
          isModalOn={isModalOn}
          handleModal={handleModal}
          modalName={modalName}
        />
      ) : modalName === 'delete' ? (
        <DeleteModal
          isModalOn={isModalOn}
          handleModal={handleModal}
          modalName={modalName}
        />
      ) : modalName === 'nickname' ? (
        <NicknameModal
          nickname={nickname}
          isModalOn={isModalOn}
          modalName={modalName}
          handleModal={handleModal}
        />
      ) : null}
      <Nav />
      <div className={styles.information}>
        <div className={styles.information_user}>
          <h3 className={styles.title}>User Informations</h3>
          <h4 id={styles.email} className={styles.contents}>
            Email : {email}
          </h4>
          <h4 id={styles.nickname} className={styles.contents}>
            Nickname : {nickname}
          </h4>
        </div>
        <div className={styles.information_settings}>
          <h3 className={styles.title}>Account Settings</h3>
          <button
            type="button"
            id={styles.buttonPassword}
            className={styles.contents}
            onClick={async () => {
              await handleModalName('password');
              await handleModal();
            }}
          >
            Change Password
          </button>
          <button
            type="button"
            id={styles.buttonNickname}
            className={styles.contents}
            onClick={async () => {
              await handleModalName('nickname');
              await handleModal();
            }}
          >
            Edit Nickname
          </button>
        </div>
        <div className={styles.information_delete}>
          <h3 className={styles.title}>Etc</h3>
          <button
            type="button"
            id={styles.buttonDelete}
            className={styles.contents}
            onClick={async () => {
              await handleModalName('delete');
              await handleModal();
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
