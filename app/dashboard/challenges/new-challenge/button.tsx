"use client";

import React, { useState } from "react";
import styles from "./button.module.scss";

interface DiffBtnProps {
  label: string; // 버튼 안에 들어갈 말을 받을 prop 정의
  isClicked: boolean;
  onClick: () => void;
}

const DiffBtn: React.FC<DiffBtnProps> = ({ label, isClicked, onClick }) => {
  const btnClasses = `${styles.difficultyBtn} ${
    isClicked ? styles.clicked : ""
  }`;

  return (
    <button className={btnClasses} onClick={onClick}>
      {label}
    </button>
  );
};

export default DiffBtn;
