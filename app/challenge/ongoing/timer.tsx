'use client'

import React, { useState, useEffect } from 'react';
import styles from './timer.module.scss'; // SCSS 파일

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stoppedTime, setStoppedTime] = useState(0);

  // 타이머를 시작하는 함수
  const startTimer = () => {
    setIsRunning(true);
  };

  // 타이머를 멈추는 함수
  const stopTimer = () => {
    setIsRunning(false);
    setStoppedTime(seconds);
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

  // 타이머가 변경될 때마다 1시간인지 체크
  useEffect(() => {
    if (seconds === 3600) {
      stopTimer(); // 1시간이 되면 타이머를 멈추기
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

  return (
    <div className={styles.timer}>
      <div className={styles.time}>{seconds === 3600 ? '60:00' : formatTime(seconds)}</div>
      <div className={styles.buttons}>
        <button onClick={stopTimer}>Stop</button>
      </div>
    </div>    
  );
};

export default Timer;