"use client";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./records.module.scss";
import Image from "next/image";
import check from "../../../public/check.png";
import fail from "../../../public/fail.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import bal from "../../../public/blueArrow_L.png";
import bar from "../../../public/blueArrow_R.png";
import gal from "../../../public/grayArrow_L.png";
import gar from "../../../public/grayArrow_R.png";
import Lottie from "react-lottie-player";
import TrophyAnim from "../../../public/animation_trophy.json";
import FailAnim from "../../../public/animation_fail.json";
import CheckAnim from "../../../public/animation_greencheck3.json";

export interface userRecord {
  title: string;
  challengeTime: number;
  date: string;
  challengeStatus: string;
  description: string;
  difficulty: number;
}

export default function Records() {
  let [userChallenges, setUserChallenges] = useState<userRecord[]>([]);
  let [curIndex, setCurIndex] = useState(0);
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    axios
      .get("/api/records")
      .then((res) => {
        setUserChallenges([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {});

  const cardImg = (i: number) => {
    if (userChallenges[i].challengeStatus === "succeed") {
      return <Trophy />;
    } else if (userChallenges[i].challengeStatus === "failed") {
      return <Failed />;
    } else {
      return <Check />;
    }
  };

  return (
    <div className={styles.ground}>
      <div className={styles.titleSec}>
        <h3>원아워 레코즈</h3>
        <p>{userInfo.name}님의 최근 원아워 레코즈를 정리해드릴게요</p>
      </div>
      <div className={styles.listUpper}>
        <button
          onClick={() => {
            setCurIndex((curIndex) => curIndex - 1); // 왼쪽 버튼 클릭 시 지금보다 인덱스가 줄어들어야 함!
            // 인덱스가 0보다 작거나 같아지면 인덱스를 0으로 고정
            if (curIndex <= 0) setCurIndex(0);
          }}
        >
          왼쪽버튼
        </button>
        {userChallenges
          .slice(curIndex, curIndex + 3)
          .map((challengeItem, i) => {
            // a -> challengeItem으로 변경해 알아보기 쉽게 했어요
            return (
              <div key={i}>
                <div className={styles.recordsBox} key={`records${i}`}>
                  <h4 className={styles.cardTitle}>{challengeItem.title}</h4>
                  <p className={styles.cardDate}>{challengeItem.date}</p>
                  <div className={styles.cardImg}>{cardImg(i)}</div>
                  <p className={styles.cardDesc}>
                    &quot; {challengeItem.description} &quot;
                  </p>
                  <div className={styles.progressWrap}>
                    <div className={styles.progressTitle}>
                      <span>투자한 시간</span>
                      <span>( 60분 기준 )</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressState}
                        style={{ width: `${challengeItem.challengeTime}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <button
          onClick={() => {
            setCurIndex((curIndex) => curIndex + 1); // 오른쪽 버튼 클릭 시 지금보다 인덱스가 커져야 함
            if (curIndex >= userChallenges.length - 3) {
              // 인덱스가 전체 챌린지 개수-3보다 같거나 커지면 인덱스를 전체 챌린지 개수-3으로 고정
              setCurIndex(userChallenges.length - 3);
            }
          }}
        >
          오른쪽버튼
        </button>
      </div>
    </div>
  );
}

export function Trophy() {
  return (
    <Lottie
      loop
      animationData={TrophyAnim}
      play
      style={{ margin: "0 auto", width: "70%", height: "auto" }}
    />
  );
}

export function Failed() {
  return (
    <Lottie
      loop
      animationData={FailAnim}
      play
      style={{ margin: "0 auto", width: "70%", height: "auto" }}
    />
  );
}

export function Check() {
  return (
    <Lottie
      loop
      animationData={CheckAnim}
      play
      style={{ margin: "0 auto", width: "70%", height: "auto" }}
    />
  );
}
