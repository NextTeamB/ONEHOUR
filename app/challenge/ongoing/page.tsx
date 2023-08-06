'use client'

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from "./ongoing.module.scss";
import Link from "next/link";
import Image from "next/image";
import stop from "../../../public/icon-stop.png";
import arrow from "../../../public/icon-arrow.png";
import BlueFire from './animation';
import DiffBtn from './button';

export default function Ongoing() {

  // DiffBtn
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };


  /*--- Timer ---*/
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [stoppedTime, setStoppedTime] = useState(0);
  const [isStopped, setIsStopped] = useState(false); // 타이머가 멈췄는지 여부를 저장하는 state

  // 타이머를 시작하는 함수
  const startTimer = () => {
    setIsRunning(true);
    setIsStopped(false); // 타이머가 시작되면 멈췄음을 초기화
  };

  // 타이머를 멈추는 함수
  const stopTimer = () => {
    setIsRunning(false);
    setStoppedTime(seconds);
    setIsStopped(true); // 타이머가 멈췄음을 저장
  };

  // 컴포넌트가 처음 렌더링 될 때 타이머를 시작
  useEffect(() => {
    startTimer();
  }, []);

  // 초를 분:초 형식으로 변환하는 함수
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`;
  };

  // 타이머가 변경될 때마다 1시간3600s(임의 1분)인지 체크
  useEffect(() => {
    if (seconds === 60) {
      stopTimer(); // 1시간3600s(임의 1분)이 되면 타이머를 멈추기
    }
  }, [seconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);
  /*--- Timer ---*/

  // Routing
  const pathname = usePathname();
  const router = useRouter();
  // const text1 = router.query.text1;

  return (
    <>
      <div className={styles.root}>
        <div className={styles.board1}>
          <div className={styles.title}>
            <span>CHALLENGE BOARD</span>
          </div>
          <BlueFire />
          <div className={styles.content}>
            <p>{text1}</p>
          </div>
          <div className={styles.progress}>
            <div className={styles.curProgress}>
              현재의 진행도는 <span>20%</span> 입니다.
            </div>
            <div className={styles.progressBar}>
              
            </div>
            <div className={styles.btnWrapper}>
              <DiffBtn label="아주 쉬움" isClicked={clickedIndex === 0} onClick={() => handleButtonClick(0)} />
              <DiffBtn label="쉬움" isClicked={clickedIndex === 1} onClick={() => handleButtonClick(1)} />
              <DiffBtn label="보통" isClicked={clickedIndex === 2} onClick={() => handleButtonClick(2)} />
              <DiffBtn label="어려움" isClicked={clickedIndex === 3} onClick={() => handleButtonClick(3)} />
              <DiffBtn label="챌린지" isClicked={clickedIndex === 4} onClick={() => handleButtonClick(4)} />
            </div>
          </div>
        </div>
        <div className={styles.board2}>
          <div className={styles.mindBox}>
            <span>나의 다짐</span>
            <p>{text2}</p>
          </div>
          <div className={`${styles.timerBox} ${isStopped ? styles.stopped : ''}`}>
            <span>타이머</span>
            <div className={styles.timer}>
              <div className={styles.time}>
                {seconds === 60 ? '01분 00초' : formatTime(seconds)}
              </div>
            </div>
          </div>
          <div className={`${styles.comBox} ${isStopped ? styles.stopped : ''}`}>
            <button onClick={stopTimer} className={`${styles.stopButton} ${isStopped ? styles.stopped : ''}`}>
              {isStopped ? '다음으로' : '기록중지'}
              {!isStopped && <Image src={stop} alt="stopIcon" className={styles.stopIcon} />}
              {isStopped && <Image src={arrow} alt="arrowIcon" className={styles.arrowIcon} />} 
            </button>            
          </div>
        </div>
      </div>
    </>
  );
}
