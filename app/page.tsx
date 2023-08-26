"use client";

import React, { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/slices/userSlice";
import styles from "./page.module.css";
import { RootState, persistor } from "@/store/store";
import { useRouter } from "next/navigation";

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
      <h1>처음 화면</h1>
      <h3>처음 화면의 서브텍스트</h3>
      <button
        onClick={() => {
          dispatch(
            login({
              name: "수현",
              email: "suhyun@naver.com",
              nickname: "밀키",
            })
          );
        }}>
        {nickname ? nickname : "로그인"}
      </button>
      <button
        onClick={() => {
          persistor.purge();
        }}>
        로그아웃
      </button>
      <button
        onClick={() => {
          router.push("/login");
        }}>
        로그인 페이지
      </button>
    </div>
  );
}
