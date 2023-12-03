import React from "react";
import { useModal } from "./modalContext";
import { onLogout } from "@/util/onLogout";


const LogoutModal = () => {
  const { showModal, setShowModal } = useModal();

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        // 모달 컨텐츠 및 스타일을 추가하여 모달을 표시
        <div className={styles.modal1}>
          <p>로그아웃 하시겠습니까?</p>
          <button
            className={styles.closeModal}
            onClick={() => onLogout()}
          >
            로그아웃
          </button>
          <button onClick={closeModal}>취소</button>
        </div>
      )}
      {showModal && (
        <div className={styles.modalBG1} onClick={closeModal}></div>
      )}
    </>
  );
};

export default LogoutModal;