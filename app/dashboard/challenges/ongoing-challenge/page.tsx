"use client";

import React, { useState, useEffect } from "react";
import styles from "./ongoing-challenge.module.scss";
import Image from "next/image";
import stop from "@/public/icon-stop.png";
import arrow from "@/public/icon-arrow.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import closeicon from "../../../../public/closeicon.png";
import Lottie from 'react-lottie-player'
import BlueFire from '@/public/animation_bluefire.json';
import GreenCheck from '@/public/animation_greencheck1.json';

function Fire() {
  return (
    <Lottie
      loop
      animationData={BlueFire}
      play
      style={{width: '55%', height: 'auto'}}
    />
  );
}

function Success() {
  return (
    <Lottie
      loop={false}
      animationData={GreenCheck}
      play
      style={{width: '55%', height: 'auto'}}
    />
  );
}

export default function Ongoing() {
  const router = useRouter();
  // 챌린지 제목, 다짐, 난이도 받아오기
  const { title, description, difficulty } = useSelector(
    (state: RootState) => state.challenge
  );

  /*--- Timer ---*/
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [stoppedTime, setStoppedTime] = useState(0);
  const [isStopped, setIsStopped] = useState(false); // 타이머가 멈췄는지 여부를 저장하는 state
  const [modal, setModal] = useState(0);

  // 타이머를 시작하는 함수
  const startTimer = () => {
    setIsRunning(true);
    setIsStopped(false); // 타이머가 시작되면 멈췄음을 초기화
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
    return `${minutes.toString().padStart(2, "0")}분 ${seconds
      .toString()
      .padStart(2, "0")}초`;
  };

  // 타이머가 변경될 때마다 1시간3600s(임의 1분)인지 체크
  useEffect(() => {
    if (seconds === 60) {
      stopTimer(); // 1시간3600s(임의 1분)이 되면 타이머를 멈추기
      setIsStopped(true); // 타이머가 시작되면 멈췄음을 초기화
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

  // 진행도를 계산하는 함수
  const calculateProgress = () => {
    return (seconds / 60) * 100; // 현재 시간을 분으로 나누고 100을 곱하여 퍼센트로 계산
  };

  const roundNum = Math.round(calculateProgress() * 100) / 100;
  const postChallenge = () => {
    let status = "";
    if (calculateProgress() >= 90) {
      status = "succeed";
      console.log(calculateProgress());
    } else if (calculateProgress() >= 60) {
      status = "perform";
    } else {
      status = "failed";
    }
    axios
      .post("/api/records", {
        title: title,
        description: description,
        difficulty: difficulty,
        challengeStatus: status,
        challengeTime: Math.round(calculateProgress()),
      })
      .then((res) => {
        console.log(res);
        router.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.board1}>
          <div className={styles.title}>
            <span>CHALLENGE BOARD</span>
          </div>
          {isStopped ?
          <Success /> : <Fire />
          }
          <div className={styles.content}>
            <p>{title}</p>
          </div>
          <div className={styles.progress}>
            <div className={styles.curProgress}>
              현재의 진행도는 <span>{roundNum}%</span> 입니다.
            </div>
            <div className={styles.progressBar}>
              <div
                className={`${styles.progressState} ${
                  isStopped ? styles.stopped : ""
                }`}
                style={{ width: `${(seconds / 60) * 100}%` }}
              />
            </div>
            <div className={styles.btnWrapper}>
              <button className={difficulty === 1 ? styles.selected : ""}>
                아주 쉬움
              </button>
              <button className={difficulty === 2 ? styles.selected : ""}>
                쉬움
              </button>
              <button className={difficulty === 3 ? styles.selected : ""}>
                보통
              </button>
              <button className={difficulty === 4 ? styles.selected : ""}>
                어려움
              </button>
              <button className={difficulty === 5 ? styles.selected : ""}>
                챌린지
              </button>
            </div>
          </div>
        </div>
        <div className={styles.board2}>
          <div className={styles.mindBox}>
            <span>나의 다짐</span>
            <p>{description}</p>
          </div>
          <div
            className={`${styles.timerBox} ${isStopped ? styles.stopped : ""}`}
          >
            <span>타이머</span>
            <div className={styles.timer}>
              <div className={styles.time}>
                {seconds === 60 ? "01분 00초" : formatTime(seconds)}
              </div>
            </div>
          </div>
          <div
            className={`${styles.comBox} ${isStopped ? styles.stopped : ""}`}
          >
            <button
              onClick={(e) => {
                stopTimer();
                setModal(1);
              }}
              className={`${styles.stopButton} ${
                isStopped ? styles.stopped : ""
              }`}
            >
              {isStopped ? "다음으로" : "기록중지"}
              {!isStopped && (
                <Image src={stop} alt="stopIcon" className={styles.stopIcon} />
              )}
              {isStopped && (
                <Image
                  src={arrow}
                  alt="arrowIcon"
                  className={styles.arrowIcon}
                />
              )}
            </button>
          </div>
        </div>
        <div className={styles[`modal${modal}`]}>
          <p>
            기록을 저장하시겠습니까?
            <br />
            기록 저장 시 저장사항을 변경할 수 없습니다
          </p>
          <button
            className={styles.editBtn2}
            onClick={() => {
              postChallenge();
            }}
          >
            기록저장
          </button>
          <button
            className={styles.closeModal}
            onClick={() => {
              if (seconds >= 60) {
                setIsRunning(false);
                setModal(0);
              } else {
                setModal(0);
                setIsRunning(true);
              }
            }}
          >
            <Image
              className={styles.closeicon}
              src={closeicon}
              width={20}
              alt="chevron"
            />
          </button>
        </div>
        <div className={styles[`modalBG${modal}`]}></div>
      </div>
    </>
  );
}
