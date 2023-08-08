"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, increment } from "@/slices/userSlice";
import styles from "./page.module.css";
import { AppDispatch, RootState } from "@/store/store";
import { LoginButton } from "@/components/loginButton";
import axios from "axios";
import { use } from "react";

interface LayoutProps {
  Component: any;
  pageProps: any;
  store: any;
}

export default function Home({ Component, pageProps, store }: LayoutProps) {
  const userRef = useRef(false);
  const { entities, value } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  // const userData = use(getData());

  console.log(entities);

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(fetchUsers());
      console.log(getData2());
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
      <button
        onClick={() => {
          postData();
        }}
      >
        POST 요청
      </button>
      {value}
      <LoginButton />
    </div>
  );
}

interface userData {
  id: number;
  name: string;
  nickname: string;
  phonenumber: string;
  agreement: boolean;
}

interface Props {
  userGetData: userData[];
}

export async function getData() {
  const response = await axios.get<userData>(
    "http://localhost:3000/api/getData"
  );
  const data = response.data;
  return data;
}

const getData2 = () => {
  axios
    .get<userData>(`http://localhost:3000/api/getData`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

const postingData = {
  id: 5,
  name: "정준하",
  nickname: "도토아빠",
  phonenumber: "01022990003",
  agreement: true,
};

export async function postData() {
  const response = await axios.post<userData>(
    "http://localhost:3000/api/getData",
    { ...postingData }
  );
  const data = response.data;
  console.log(data);
}
