"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, increment } from "@/slices/userSlice";
import styles from "./page.module.css";
import { AppDispatch, RootState } from "@/store/store";

interface LayoutProps {
  Component: any;
  pageProps: any;
  store: any;
}

export default function Home({ Component, pageProps, store }: LayoutProps) {
  const userRef = useRef(false);
  const { entities, value } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  console.log(entities);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(fetchUsers());
    }
    return () => {
      userRef.current = true;
    };
  }, []);

  return (
    <div className={styles.mainSection}>
      <h1>처음 화면</h1>
      <h3>처음 화면의 서브텍스트</h3>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        증가버튼
      </button>
      {value}
    </div>
  );
}
