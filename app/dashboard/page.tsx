"use client";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./records.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import bal from "@/public/blueArrow_L.png";
import bar from "@/public/blueArrow_R.png";
import gal from "@/public/grayArrow_L.png";
import gar from "@/public/grayArrow_R.png";
import Lottie from "react-lottie-player";
import TrophyAnim from "@/public/animation_trophy.json";
import FailAnim from "@/public/animation_fail.json";
import CheckAnim from "@/public/animation_greencheck2.json";
import Doughnut from "./doughnut";
import { averageSave } from "@/slices/chartInfo";

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
  interface chartState {
    timeAvrg: Number;
    diffAvrg: Number;
    succeedCount: Number;
  }
  const initialChartState = {
    timeAvrg: 0,
    diffAvrg: 0,
    succeedCount: 0,
  };
  let [userChallenges, setUserChallenges] = useState<userRecord[]>([]);
  let [curIndex, setCurIndex] = useState(0);
  let [chartProps, setChartProps] = useState(initialChartState);
  const userInfo = useSelector((state: RootState) => state.user);
  const chartInfo = useSelector((state: RootState) => state.chart);
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
    let copyTime: any = [];
    userChallenges.map((a, i) => {
      copyTime.push(a.challengeTime);
    });
    const timeAvrg =
      copyTime.reduce((p: any, c: any) => p + c, 0) / copyTime.length;
    let copyDiff: any = [];
    userChallenges.map((a, i) => {
      copyDiff.push(a.difficulty);
    });
    const diffAvrg =
      copyDiff.reduce((p: any, c: any) => p + c, 0) / copyDiff.length;
    let copySucceed: any = [];
    userChallenges.map((a, i) => {
      if (a.challengeStatus === "succeed") {
        copySucceed.push(a.challengeStatus);
      }
    });
    const succeedCount = (copySucceed.length / userChallenges.length) * 100;
    let newChartProps = {
      ...chartProps,
      timeAvrg: timeAvrg,
      diffAvrg: diffAvrg,
      succeedCount: succeedCount,
    };
    setChartProps(newChartProps);
  }, [userChallenges]);

  useEffect(() => {
    dispatch(averageSave(chartProps));
  }, [chartProps, dispatch]);

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
      return <Failed />;
    } else {
      return <Check />;
    }
  };

  const diffReturn = () => {
    if (chartProps.diffAvrg >= 0 && chartProps.diffAvrg < 25) {
      return <h3>유망주</h3>;
    } else if (chartProps.diffAvrg > 25 && chartProps.diffAvrg < 50) {
      return <h3>에이스</h3>;
    } else if (chartProps.diffAvrg > 50 && chartProps.diffAvrg < 75) {
      return <h3>챌린저</h3>;
    } else if (chartProps.diffAvrg > 75 && chartProps.diffAvrg <= 100) {
      return <h3>챔피언</h3>;
    }
  };

  return (
    <div className={styles.ground}>
      <div className={styles.titleSec}>
        <h3>원아워 레코즈</h3>
        <p>{userInfo.name}님의 최근 원아워 레코즈를 정리해드릴게요</p>
      </div>
      <div className={styles.listUpper}>
        {userChallenges ? (
          <>
            <Image
              src={curIndex <= 0 ? gal : bal}
              alt="arrow"
              height={50}
              onClick={() => {
                setCurIndex((curIndex) => curIndex - 1); // 왼쪽 버튼 클릭 시 지금보다 인덱스가 줄어들어야 함!
                // 인덱스가 0보다 작거나 같아지면 인덱스를 0으로 고정
                if (curIndex <= 0) setCurIndex(0);
              }}
              style={{cursor: "pointer"}}
            />
            {userChallenges
              .slice(curIndex, curIndex + 3)
              .map((challengeItem, i) => {
                // a -> challengeItem으로 변경해 알아보기 쉽게 했어요
                return (
                  <div key={i}>
                    <div className={styles.recordsBox} key={`records${i}`}>
                      {/* 챌린지 아이템을 cardImg 파라미터로 넘겨주게 함!! 위에 cardImg 함수 수정했어요  */}
                      <h4 className={styles.cardTitle}>{challengeItem.title}</h4>
                      <p className={styles.cardDate}>{challengeItem.date}</p>
                      <div className={styles.cardImg}>
                        {cardImg(challengeItem)}
                      </div>
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
            <Image
              src={curIndex >= userChallenges.length - 3 ? gar : bar}
              alt="arrow"
              height={50}
              onClick={() => {
                setCurIndex((curIndex) => curIndex + 1); // 오른쪽 버튼 클릭 시 지금보다 인덱스가 커져야 함
                if (curIndex >= userChallenges.length - 3) {
                  // 인덱스가 전체 챌린지 개수-3보다 같거나 커지면 인덱스를 전체 챌린지 개수-3으로 고정
                  setCurIndex(userChallenges.length - 3);
                }
              }}
              style={{cursor: "pointer"}}
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div className={styles.titleSec2}>
        <h3>#불타는 열정</h3>
        <p>홍당무님의 기록을 기반으로 목표 실천율을 분석해봤어요</p>
      </div>
      <div className={styles.chartUpper}>
        <div className={styles.donutSec}>
          <h4>시간 계획</h4>
          <h2 className={styles.timeAvrg}>
            {Math.round(chartProps.timeAvrg)}%
          </h2>
          <Doughnut value={chartInfo.challengeTimeAvg} id={"timeAvrgChart"} />
          <p>전체 집계 대비 수행시간 정보</p>
        </div>
        <div className={styles.donutSec}>
          <h4>도전 난이도</h4>
          {diffReturn()}
          <Doughnut value={chartInfo.difficultAvg} id={"diffAvrgChart"} />
          <p>평균 도전 난이도 정보</p>
        </div>
        <div className={styles.donutSec}>
          <h4>목표 달성도</h4>
          <h2 className={styles.succeedCnt}>
            {Math.round(chartProps.succeedCount)}%
          </h2>
          <Doughnut value={chartInfo.succeedCount} id={"succeedRatioChart"} />
          <p>전체 집계 대비 90% 이상 달성 건</p>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}

function Trophy() {
  return (
    <Lottie
      loop={false}
      animationData={TrophyAnim}
      play
      style={{ margin: "0 auto", width: "70%", height: "auto" }}
    />
  );
}

function Failed() {
  return (
    <Lottie
      loop={false}
      animationData={FailAnim}
      play
      style={{ margin: "0 auto", width: "70%", height: "auto" }}
    />
  );
}

function Check() {
  return (
    <Lottie
      loop={false}
      animationData={CheckAnim}
      play
      style={{ margin: "0 auto", width: "70%", height: "auto" }}
    />
  );
}
