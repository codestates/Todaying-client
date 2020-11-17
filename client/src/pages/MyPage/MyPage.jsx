import { React, useState } from 'react';
import styles from './MyPage.module.css';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import PwdModal from '../../components/pwdModal/pwdModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NicknameModal from '../../components/NicknameModal/NicknameModal';

const MyPage = ({ userInfo, changeNickname }) => {
  const [email] = useState(userInfo.email);
  const [nickname] = useState(userInfo.nickname);
  const [isModalOn, setIsModalOn] = useState(false);
  const [modalName, setModal] = useState('');

  const handleModal = () => {
    setIsModalOn((prevState) => !prevState);
  };
  const handleModalName = (name) => {
    setModal(name);
  };

  return (
    <div className={styles.mypage}>
      {modalName === 'password' ? (
        <PwdModal
          userInfo={userInfo}
          isModalOn={isModalOn}
          handleModal={handleModal}
          modalName={modalName}
        />
      ) : modalName === 'delete' ? (
        <DeleteModal
          userInfo={userInfo}
          isModalOn={isModalOn}
          handleModal={handleModal}
          modalName={modalName}
        />
      ) : modalName === 'nickname' ? (
        <NicknameModal
          changeNickname={changeNickname}
          userInfo={userInfo}
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
