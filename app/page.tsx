"use client";

import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.scss";
import logo from "../public/logo_w.png";
import card1 from "../public/main_card1.png";
import card2 from "../public/main_card2.png";
import card3 from "../public/main_card3.png";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.mainSection}>
      <div className={styles.section1}>
        <div className={styles.logoWrapper}>
          <Image src={logo} alt="logo" className={styles.logoTitle} />
          <p className={styles.subTitle}>
            착실하게 하루에 한 시간! 값진 시간관리 습관 만들기
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <button
            onClick={() => {
              router.push("/login");
            }}
          >
            시작하기
          </button>
          <button
            onClick={() => {
              router.push("/info");
            }}
          >
            서비스 소개
          </button>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              router.push("/term");
            }}
          >
            이용약관
          </button>
          <button
            onClick={() => {
              router.push("/privacy-policy");
            }}
          >
            개인정보처리방침
          </button>
        </div>
      </div>
      <div className={styles.section2}>
        <Image src={card1} alt="card1" className={styles.card1} />
        <div className={styles.cardsWrapper}>
          <Image src={card2} alt="card2" className={styles.card2} />
          <Image src={card3} alt="card3" className={styles.card3} />
        </div>
      </div>
    </div>
  );
};

export default Home;
