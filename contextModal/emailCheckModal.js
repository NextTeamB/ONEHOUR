import React from 'react';
import styles from "./commonModal.module.scss";
import { useModal } from './modalContext';

const EmailCheckModal = () => {
  const { modalState, closeModal } = useModal();

  return (
    <>
    <div className={`modal${modalState.modalType}`}>
      <p>{modalState.modalData}</p>
      <button className={styles.closeModal} onClick={closeModal}>
        확인
      </button>
    </div>
    <div className={styles[`modalBG${modalState}`]}></div>
    </>
  );
};

export default EmailCheckModal;
