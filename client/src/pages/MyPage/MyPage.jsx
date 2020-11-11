import React, { useState }  from 'react';
import styles from './MyPage.module.css';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';


const MyPage = () => {

    const [userInform] = useState({
        email : 'yongki@codestates.com',
        nickname : '김코딩'
    })

    const changePassword = () => {
        alert('모달창 구현후 모달창이 팝업됨(비밀번호변경용)');
    }

    const changeNickname = () => {
        alert('모달창 구현후 모달창이 팝업됨(닉네임변경용)');
    }
    
    const deleteAccount = () => {
        alert('모달창 구현후 모달창이 팝업됨(회원탈퇴용)');
    }

    return (
      <div className={styles.mypage}>
        <Nav />
        <div className={styles.information}>
          <div className={styles.information_user}>
            <h3 className={styles.title}>내 정보</h3>
            <h4 className={styles.contents}>이메일 : {userInform.email} </h4>
            <h4 className={styles.contents}>닉네임 : {userInform.nickname}</h4>
          </div>
          <div className={styles.information_settings}>
            <h3 className={styles.title}>계정</h3>
            <h4 className={styles.contents} onClick={changePassword}>비밀번호 변경</h4>
            <h4 className={styles.contents} onClick={changeNickname}>닉네임 설정</h4>
          </div>
          <div className={styles.information_delete}>
            <h3 className={styles.title}>기타</h3>
            <h4 className={styles.contents} onClick={deleteAccount}>회원탈퇴</h4>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default MyPage;