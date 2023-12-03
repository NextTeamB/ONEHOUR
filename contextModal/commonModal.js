import React, { useContext } from 'react';
import styles from './commonModal.module.scss';
import { useModal } from './useModal';

// 모달 내용
const modalContents = {
  email: {
    title: '이메일 중복 확인',
    positiveMessage: '사용할 수 있는 이메일입니다.',
    negativeMessage: '사용할 수 없는 이메일입니다.',
  },
  signup: {
    title: '회원가입 완료',
    message: '회원가입이 완료되었습니다.',
  },
  // 다른 모달에 대한 내용 추가
};

const { closeModal } = useModal();
const { modalState } = useContext(ModalContext);

const EmailCheckModal = ({ isOpen, onClose, positive }) => {
  const content = modalContents.email;

  return (
    <>
      <div className={modalState.isOpen ? styles.modal1 : styles.modal0}>
        <p>{positive ? content.positiveMessage : content.negativeMessage}</p>
        <button className={styles.closeModal} onClick={onClose}>
          확인
        </button>
      </div>
      <div className={styles[`modalBG${modalState.isOpen ? 1 : 0}`]}></div>
    </>
  );
};

// SignupModal.js
const SignupModal = ({ isOpen, onClose, router }) => {
  const content = modalContents.signup;

  return (
    <>
      <div className={modalState.isOpen ? styles.modal1 : styles.modal0}>
        <p>{content.message}</p>
        <button
          className={styles.closeModal}
          onClick={() => {
            onClose();
            router.push('/login');
          }}
        >
          확인
        </button>
      </div>
      <div className={styles[`modalBG${modalState.isOpen ? 1 : 0}`]}></div>
    </>
  );
};

const LogoutModal = ({ onClose, onLogout }) => {
  
  return (
    <>
      <div className={styles.modal1}>
        <p>로그아웃 하시겠습니까?</p>
        <div className={styles.buttonWrapper}>
          <button className={styles.closeModal} onClick={() => {
            onClose();
            onLogout();
          }}>
            확인
          </button>
          <button className={styles.closeModal} onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
      <div className={styles[`modalBG${modalState.isOpen ? 1 : 0}`]}></div>
    </>
  )
};

const SaveRecordModal = ({ postChallenge, onClose, setIsRunning, seconds, setIsRunning }) => {
  return (
    <>
      <div className={styles.modal1}>
        <p>
          기록을 저장하시겠습니까?
          <br />
          기록 저장 시 저장사항을 변경할 수 없습니다
        </p>
        <button className={styles.editBtn2} onClick={postChallenge}>
          기록저장
        </button>
        <button className={styles.closeModal} onClick={() => {
          if (seconds >= 60) {
            setIsRunning(false);
            onClose();
          } else {
            onClose();
            setIsRunning(true);
          }
        }}>
          <Image className={styles.closeicon} src={closeicon} width={20} alt="chevron" />
        </button>
      </div>
      <div className={styles[`modalBG${modalState.isOpen ? 1 : 0}`]}></div>
    </>
  )
};

export { EmailCheckModal, SignupModal, LogoutModal, SaveRecordModal };