"use client";

import React, { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/slices/userSlice";
import styles from "./page.module.css";
import { RootState, persistor } from "@/store/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../public/logo.png";

interface LayoutProps {
  Component: any;
  pageProps: any;
  store: any;
}

export default function Home({ Component, pageProps, store }: LayoutProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={styles.mainSection}>
      <div className={styles.logoWrapper}>
        <Image src={logo} alt="logo" className={styles.logoTitle} />
        <p className={styles.subTitle}>
          착실하게 하루에 한 시간! 원아워에서 생활루틴 실천하기
        </p>
      </div>
      <button
        onClick={() => {
          router.push("/login");
        }}
        className={styles.startBtn}
      >
        시작하기
      </button>
      <div className={styles.footer}>
        <span>서비스 소개</span>
        <span>이용약관</span>
        <span>개인정보처리방침</span>
      </div>
    </div>
  );
}
