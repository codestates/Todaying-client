import React, { useState } from 'react';
import styles from './MyPage.module.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import DeleteAccount from '../../components/DeleteAccount/DeleteAccount';

const MyPage = () => {
  // 모달 팝업 활성여부 관리
  const [isOn, setIsOn] = useState({
    password: false,
    nickname: false,
    delAccount: false,
  });
  // 모달 팝업 닫는 함수 (현 페이지 내 모달에서 범용으로)
  const handleModal = () => {
    setIsOn({ password: false, nickname: false, delAccount: false });
  };
  // 클릭한 버튼에 따라서, isOn STATE를 변경
  const handlePopup = (e) => {
    if (e.target.id === 'password') {
      setIsOn({ ...isOn, password: true });
    } else if (e.target.id === 'nickname') {
      setIsOn({ ...isOn, nickname: true });
    } else if (e.target.id === 'delAccount') {
      setIsOn({ ...isOn, delAccount: true });
    }
  };

  return (
    <div className={styles.mypage}>
      <DeleteAccount isOn={isOn.delAccount} handleModal={handleModal} />

      <Nav />
      <div className={styles.information}>
        <div className={styles.information_user}>
          <h3 className={styles.title}>내 정보</h3>
          <h4 className={styles.contents}>이메일 : {} </h4>
          <h4 className={styles.contents}>닉네임 : {}</h4>
        </div>
        <div className={styles.information_settings}>
          <h3 className={styles.title}>계정</h3>
          <h4 id="password" onClick={handlePopup} className={styles.contents}>
            비밀번호 변경
          </h4>
          <h4 id="nickname" onClick={handlePopup} className={styles.contents}>
            닉네임 설정
          </h4>
        </div>
        <div className={styles.information_delete}>
          <h3 className={styles.title}>기타</h3>
          <h4 id="delAccount" onClick={handlePopup} className={styles.contents}>
            회원탈퇴
          </h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
