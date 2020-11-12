import { React, useState } from 'react';
import styles from './MyPage.module.css';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import PwdModal from '../../components/pwdModal/pwdModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NicknameModal from '../../components/NicknameModal/NicknameModal';

const MyPage = () => {
  // 로그인이 성공했을 때, 아직 확실치는 않지만, 이메일과 닉네임을 state에 넣고 있을 것(props로 받아오던 어떻게 하던)
  const [email, setEmail] = useState('dayfly@codestates.com');
  const [nickname, setNickname] = useState('dayfly');
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
        <PwdModal isModalOn={isModalOn} handleModal={handleModal} />
      ) : modalName === 'delete' ? (
        <DeleteModal isModalOn={isModalOn} handleModal={handleModal} />
      ) : modalName === 'nickname' ? (
        <NicknameModal
          nickname={nickname}
          isModalOn={isModalOn}
          handleModal={handleModal}
        />
      ) : null}
      <Nav />
      <div className={styles.information}>
        <div className={styles.information_user}>
          <h3 className={styles.title}>내 정보</h3>
          <h4 className={styles.contents}>이메일 : {email} </h4>
          <h4 className={styles.contents}>닉네임 : {nickname}</h4>
        </div>
        <div className={styles.information_settings}>
          <h3 className={styles.title}>계정</h3>
          <h4
            className={styles.contents}
            onClick={async () => {
              await handleModalName('password');
              await handleModal();
            }}
          >
            비밀번호 변경
          </h4>
          <h4
            className={styles.contents}
            onClick={async () => {
              await handleModalName('nickname');
              await handleModal();
            }}
          >
            닉네임 설정
          </h4>
        </div>
        <div className={styles.information_delete}>
          <h3 className={styles.title}>기타</h3>
          <h4
            className={styles.contents}
            onClick={async () => {
              await handleModalName('delete');
              await handleModal();
            }}
          >
            회원탈퇴
          </h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
