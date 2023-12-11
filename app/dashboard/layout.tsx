"use client";

import { Navigator } from "../../components/navigator/Navigator";
import { useState, ReactNode } from "react";
import styles from "../../components/navigator/Navigator.module.scss";
import { onLogout } from "@/util/onLogout";

// LogoutModal 컴포넌트
const LogoutModal = (props: { onClose: () => void }) => {

  const handleLogout = () => {
    onLogout();
    // props.onClose();
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <div className={styles.modalRoot}>
      <div className={styles.modal1}>
        <p>로그아웃 하시겠습니까?</p>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.closeModal1}
            onClick={handleLogout}
          >
            확인
          </button>
          <button
            className={styles.closeModal0}
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </div>
      <div className={styles.modalBG1}></div>
    </div>
  );
};

const NavigatorLayout = (props: { children: ReactNode }) => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutModal = () => {
    setLogoutModalOpen(!logoutModalOpen);
  };

  return (
    <div>
      <Navigator openLogoutModal={handleLogoutModal}>
        {logoutModalOpen && (
          <LogoutModal onClose={handleLogoutModal} />
        )}
        <div className={styles.childrenWrapper}>{props.children}</div>
      </Navigator>
    </div>
  );
};

export default NavigatorLayout;
