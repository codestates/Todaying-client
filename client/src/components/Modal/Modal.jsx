import React from 'react';
import styles from './Modal.module.css';
import close from '../../images/close.png';

// Props로 ModalOn여부 및 handle모달 함수
const Modal = ({
  setSignupValid,
  setDeleteValid,
  setPwdValid,
  setForm,
  setNickname,

  setPasswordDelete,
  setPassword,

  setIsErrorDelete,
  setIsErrorPassword,
  setIsErrorNickname,
  setIsErrorSignup,
  modalName,
  nickname,
  isModalOn,
  handleModal,
  children,
}) => {
  // modal 창을 껐을 경우 input value reset plans
  // 1) nickname 변경 파트 : nickname(서버에서 response로 받아온 nickname)을 props로 받아와서 handleModal()을 호출할 때마다 setNickname으로 nickname을 재설정 해줌
  // 2) 비밀번호 변경 파트 :

  const handleModalReset = (modalname) => {
    if (modalname === 'nickname') {
      setNickname(nickname);
      setIsErrorNickname(false);
    } else if (modalname === 'password') {
      setPassword({
        newPassword: '',
        confirmPassword: '',
        currentPassword: '',
      });
      setPwdValid({
        isValid: false,
        newPasswordValid: null,
        confirmPasswordValid: null,
        currentPasswordValid: null,
      });
      setIsErrorPassword(false);
    } else if (modalname === 'delete') {
      setPasswordDelete('');
      setDeleteValid(null);
      setIsErrorDelete(false);
    } else if (modalname === 'signup') {
      setForm({
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
      });
      setSignupValid({
        email: null,
        password: null,
        passwordCheck: null,
        nickname: null,
      });
      setIsErrorSignup(false);
    }
  };

  const handleClickOutside = (e) => {
    if (isModalOn && e.target.id === 'outside') {
      handleModal();
      handleModalReset(modalName);
    }
  };

  return (
    <div>
      <div
        id="outside"
        className={`${styles.dimmer} ${isModalOn && styles.isOn}`}
        onClick={handleClickOutside}
      >
        <div className={styles.box}>
          <img
            className={styles.close}
            src={close}
            alt="close"
            onClick={() => {
              handleModal();
              handleModalReset(modalName);
            }}
          />
          {/* 모달 재활용 하는 컴포넌트에서 <Modal> </Modal> 사이에
            작성한 내용들이 아래 children 부분에 삽입됨 */}
          {children}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
