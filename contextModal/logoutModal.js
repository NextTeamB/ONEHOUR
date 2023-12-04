import React from "react";
import styles from "./logoutModal.module.scss";
import { onLogout } from "@/util/onLogout";


const LogoutModal = ({ onClose }) => {

  return (
    <>
      {showModal && (
        // 모달 컨텐츠 및 스타일을 추가하여 모달을 표시
        <div className={styles.modal1}>
          <p>로그아웃 하시겠습니까?</p>
          <div className={styles.btnWrap}>
            <button
              className={styles.logoutModal}
              onClick={() => onLogout()}
            >
              로그아웃
            </button>
            <button
              className={styles.closeModal}
              onClick={onClose}
            >
              취소
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className={styles.modalBG1} onClick={closeModal}></div>
      )}
    </>
  );
};

export default LogoutModal;