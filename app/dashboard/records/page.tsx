"use client";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./records.module.scss";
import Image from "next/image";
import check from "../../../public/check.png";
import fail from "../../../public/fail.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import bal from "../../../public/blueArrow_L.png";
import bar from "../../../public/blueArrow_R.png";
import gal from "../../../public/grayArrow_L.png";
import gar from "../../../public/grayArrow_R.png";
import Trophy from "./animation";
import Doughnut from "./doughnut";
import Doughnut1 from "./doughnut1";
import { timeSave, diffSave, succeedSave } from "@/slices/chartInfo";

export interface userRecord {
  title: string;
  challengeTime: number;
  date: string;
  challengeStatus: string;
  description: string;
  difficulty: number;
}

// 1. 먼저 userChallenges 에서 challengeTime 을 가져와 challengeTimeAvg(평균을)를 낸다
// state 를 하나 새로 파서 map 함수로 index를 순회할 때마다 이 State에 챌린지 타임 퍼센테이지 값을 계속 더해줌
// 그렇게 다 더해진 값을 userChallenges 의 길이로 나누면 평균이 나옴 -> 소숫점 반올림
// 그러면 이 값을 가지고 다음 과정으로 진행
// 2. 이 평균 값을 도넛차트 컴포넌트에 props 로 전달함?
// 3. 그러며는 이 전달한 값으로 도넛의 data 를 바꿔주기만 하면 댐

export default function Records() {
  let [userChallenges, setUserChallenges] = useState<userRecord[]>([]);
  let [curIndex, setCurIndex] = useState(0);
  let [timeAvgr, setTimeAvgr] = useState(0);
  const userInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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

  useEffect(() => {
    setTimeout(() => {
      let copy: any = [];
      userChallenges.map((a, i) => {
        copy.push(a.challengeTime);
      });
      const average = copy.reduce((p: any, c: any) => p + c, 0) / copy.length;
      setTimeAvgr(average);
      console.log(average);
      dispatch(timeSave(timeAvgr));
    }, 1500);

    // dispatch(timeSave(average));
  }, [userChallenges]);

  // 시간 퍼센테이지 평균값 계산 및 Dispatch
  // const avgTimeFunc = () => {
  //   let copy: any = [];
  //   userChallenges.map((a, i) => {
  //     copy.push(a.challengeTime);
  //   });
  //   const average = copy.reduce((p: any, c: any) => p + c, 0) / copy.length;
  //   console.log(average);
  //   dispatch(timeSave(average));
  // };

  // // 난이도 평균값 계산 및 가공 후 Dispatch
  // const diffValueFunc = () => {
  //   let copy: any = [];
  //   userChallenges.map((a, i) => {
  //     copy.push(a.difficulty);
  //   });
  //   const diffAvg = copy.reduce((p: any, c: any) => p + c, 0) / copy.length;
  //   dispatch(diffSave(diffAvg));
  // };

  // 성공횟수 카운트 및 퍼센테이지 가공 후 Dispatch

  const cardImg = (challengeItem: any) => {
    // cardImg의 파라미터로 challenge를 넘겨받으면 굳이 전체 게시글 중 인덱스로 탐색할 필요 없이
    // challengeItem 안의 challengeStatus를 참조해 cardImg를 return해줄 수 있음!
    if (challengeItem.challengeStatus === "succeed") {
      return <Trophy />;
    } else if (challengeItem.challengeStatus === "failed") {
      return <Image2 />;
    } else {
      return <Image3 />;
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
                  {/* 챌린지 아이템을 cardImg 파라미터로 넘겨주게 함!! 위에 cardImg 함수 수정했어요  */}
                  {cardImg(challengeItem)}
                  <h4 className={styles.cardTitle}>{challengeItem.title}</h4>
                  <p className={styles.cardDesc}>{challengeItem.description}</p>
                  <p className={styles.cardDate}>{challengeItem.date}</p>
                  <p>{challengeItem.challengeStatus}</p>
                  <p>{challengeItem.challengeTime}</p>
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
      <div className={styles.chartUpper}>
        <div className={styles.donutSec}>
          <Doughnut />
        </div>
        <div className={styles.donutSec}>
          <Doughnut1 />
        </div>
      </div>
    </div>
  );
}

export function Image2() {
  return <Image className={styles.fail} src={fail} width={160} alt="fail" />;
}

export function Image3() {
  return <Image src={check} alt="check" width={160} />;
}
