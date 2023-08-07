'use client'

import React, { useState } from 'react';
import styles from "./new.module.scss";
import Link from "next/link";
import DiffBtn from './button'
import TextBox from './textbox';
import { textOneState, textTwoState } from "../../stateJotai";
import { useAtom } from "jotai";
import { difficultyAtom } from "../../stateJotai";

export default function Newchallenge() {

  // DiffBtn
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  // TextBox
  const [text1, setText1] = useAtom(textOneState);
  const [text2, setText2] = useAtom(textTwoState);

  const [difficulty, setDifficulty] = useAtom(difficultyAtom); // 난이도 데이터를 저장할 상태(state)

  // 버튼 클릭시 난이도를 업데이트하는 콜백 함수
  const handleDiffButtonClick = (label: string) => {
    setDifficulty(label); // jotai atom 업데이트
  };

  

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
            <p>(  최대 60자 이내, 특수기호 및 공백문자 사용 가능  )</p>
          </div>
          <TextBox value={text1} onChange={setText1} />
        </div>
        <div className={styles.section3}>
          <div className={styles.article}>
            <span>목표의 난이도</span>
            <span>를 설정해주세요</span>
            <span>*필수</span>
          </div>
          <div className={styles.article_sub}>
            <p>(  사용자께서 체감하시는 난이도를 설정해주시는 것이 좋습니다  )</p>
          </div>
          <div className={styles.btnWrapper}>
            <DiffBtn label="아주 쉬움" isClicked={clickedIndex === 0} onClick={() => handleButtonClick(0)}/>
            <DiffBtn label="쉬움" isClicked={clickedIndex === 1} onClick={() => handleButtonClick(1)}/>
            <DiffBtn label="보통" isClicked={clickedIndex === 2} onClick={() => handleButtonClick(2)}/>
            <DiffBtn label="어려움" isClicked={clickedIndex === 3} onClick={() => handleButtonClick(3)}/>
            <DiffBtn label="챌린지" isClicked={clickedIndex === 4} onClick={() => handleButtonClick(4)}/>
          </div>
        </div>
        <div className={styles.section4}>
          <div className={styles.article}>
            <span>나의 다짐을 입력해주세요</span>
            <span>선택</span>
          </div>
          <p></p>
          <TextBox value={text2} onChange={setText2} />
        </div>
        <div className={styles.section5}>
          <Link href="../challenge">
            <button className={`${styles.btn} ${styles.exitBtn}`}>나가기</button>
          </Link>
          <Link href="../challenge/ongoing">
            <button className={`${styles.btn} ${styles.startBtn}`}>시작하기</button>
          </Link>          
        </div>
      </div>
    </>
  )
}