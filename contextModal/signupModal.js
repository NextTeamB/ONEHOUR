// SignupModal.js
import React from 'react';
import styles from "./commonModal.module.scss";
import { useModal } from './modalContext';

const SignupModal = () => {
  const { modalState, closeModal } = useModal();

  return (
    <div className={`modal${modalState.modalType}`}>
      <p>{modalState.modalData}</p>
      <button className="closeModal" onClick={closeModal}>
        확인
      </button>
    </div>
  );
};

export default SignupModal;