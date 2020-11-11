import React from 'react';
import styles from './MyPage.module.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const MyPage = () => {

    return (
      <div className={styles.mypage}>
        <Nav />
        <div className={styles.information}>
          <div className={styles.information_user}>
            <h3 className={styles.title}>내 정보</h3>
            <h4 className={styles.contents}>이메일 : {} </h4>
            <h4 className={styles.contents}>닉네임 : {}</h4>
          </div>
          <div className={styles.information_settings}>
            <h3 className={styles.title}>계정</h3>
            <h4 className={styles.contents}>비밀번호 변경</h4>
            <h4 className={styles.contents}>닉네임 설정</h4>
          </div>
          <div className={styles.information_delete}>
            <h3 className={styles.title}>기타</h3>
            <h4 className={styles.contents}>회원탈퇴</h4>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default MyPage;