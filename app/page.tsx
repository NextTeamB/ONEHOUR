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
  const nickname = useSelector((state: RootState) => state.user?.nickname);
  const auth = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <div className={styles.mainSection}>
      <div className={styles.logoWrapper}>
        <Image src={logo} alt="logo" className={styles.logoTitle} />
        <p className={styles.subTitle}>
          착실하게 하루에 한 시간! 원아워에서 생활루틴 실천하기
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => {
            router.push("/info");
          }}
          className={styles.introBtn}
        >
          서비스 소개
        </button>
        <button
          onClick={() => {
            router.push("/login");
          }}
          className={styles.startBtn}
        >
          로그인
        </button>
      </div>
      <div className={styles.footer}>
        <span>이용약관</span>
        <span>개인정보처리방침</span>
      </div>
    </div>
  );
}
