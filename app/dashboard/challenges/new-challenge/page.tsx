"use client";

import React, { useState, useEffect } from "react";
import styles from "./new.module.scss";
import Link from "next/link";
import DiffBtn from "./button";
import TextBox from "./textbox";
import { useDispatch } from "react-redux";
import { challenge, challengeState } from "@/slices/challengeSlice";
import { useRouter } from "next/navigation";
export default function Newchallenge() {
  // TextBox
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(0); // 난이도 데이터를 저장할 state

  // DiffBtn
  const handleDiffButtonClick = (difficulty: number) => {
    setDifficulty(difficulty); // difficulty 업데이트
  };
  console.log();
  const onSubmit = () => {
    // 시작하기 버튼이 클릭되면 실행될 onSubmit 함수
    dispatch(
      challenge({
        title: title,
        description: description,
        difficulty: difficulty,
      })
    );
    router.push("/dashboard");
  };
  useEffect(() => {
    console.log(difficulty);
  }, [difficulty]);

  const btnArr = [
    { label: "아주 쉬움", difficulty: 1 },
    { label: "쉬움", difficulty: 2 },
    { label: "보통", difficulty: 3 },
    { label: "어려움", difficulty: 4 },
    { label: "챌린지", difficulty: 5 },
  ];
  return (
    <>
      <div className={styles.root}>
        <div className={styles.section1}>
          <div className={styles.title}>
            <span>CHALLENGE</span>
            {/* <span>*필수</span> */}
          </div>
          <div className={styles.title_sub}>
            <p>오늘의 챌린지! 어떤 목표로 시작하시겠어요?</p>
          </div>
        </div>
        <div className={styles.section2}>
          <div className={styles.article}>
            <span>한 시간 동안의 목표</span>
            <span>를 입력해주세요</span>
            <span>*필수</span>
          </div>
          <div className={styles.article_sub}>
            <p>( 최대 60자 이내, 특수기호 및 공백문자 사용 가능 )</p>
          </div>
          <TextBox value={title} onChange={setTitle} />
        </div>
        <div className={styles.section3}>
          <div className={styles.article}>
            <span>목표의 난이도</span>
            <span>를 설정해주세요</span>
            <span>*필수</span>
          </div>
          <div className={styles.article_sub}>
            <p>( 사용자께서 체감하시는 난이도를 설정해주시는 것이 좋습니다 )</p>
          </div>
          <div className={styles.btnWrapper}>
            {btnArr.map((content, i) => (
              <DiffBtn
                key={i}
                label={content.label}
                isClicked={difficulty === content.difficulty}
                onClick={() => handleDiffButtonClick(i + 1)}
              />
            ))}
          </div>
        </div>
        <div className={styles.section4}>
          <div className={styles.article}>
            <span>나의 다짐을 입력해주세요</span>
            <span>선택</span>
          </div>
          <p></p>
          <TextBox value={description} onChange={setDescription} />
        </div>
        <div className={styles.section5}>
          <Link href="/dashboard/challenges">
            <button className={`${styles.btn} ${styles.exitBtn}`}>
              나가기
            </button>
          </Link>
          <Link
            onClick={() => {
              onSubmit();
            }}
            href="/dashboard/challenges/ongoing-challenge">
            <button className={`${styles.btn} ${styles.startBtn}`}>
              시작하기
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
