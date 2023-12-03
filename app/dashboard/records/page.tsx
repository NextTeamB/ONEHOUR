"use client";

import { useState } from "react";
import { useEffect } from "react";
import styles from "./records.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import bal from "@/public/blueArrow_L.png";
import bar from "@/public/blueArrow_R.png";
import gal from "@/public/grayArrow_L.png";
import gar from "@/public/grayArrow_R.png";
import trophy from "@/public/trophy.png";
import check from "@/public/checked-icon.png";
import failed from "@/public/failed-icon.png";
import Doughnut from "./doughnut";
import { onDashboard } from "@/util/onDashboard";
import { useRouter } from "next/navigation";
import { onContinuerBoard } from "@/util/onContinuerBoard.js";
import loadImg from "../../../public/loadImg.png";

export interface userRecord {
  title: string;
  challengeTime: number;
  date: string;
  challengeStatus: string;
  description: string;
  difficulty: number;
}

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
  let [dailyChallenges, setDailyChallenges] = useState<number[]>([]);
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    onDashboard()
      .then((data) => {
        setUserChallenges([...data]);
        let countArr = onContinuerBoard(data);
        setDailyChallenges(countArr);
        console.log("챌린지:", countArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 챌린지 총 횟수
  let sum = dailyChallenges.reduce((acc, value) => acc + value, 0);

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

  // 이미지 케이스 구분
  const cardImg = (challengeItem: any) => {
    // cardImg의 파라미터로 challenge를 넘겨받으면 굳이 전체 게시글 중 인덱스로 탐색할 필요 없이
    // challengeItem 안의 challengeStatus를 참조해 cardImg를 return해줄 수 있음!
    if (challengeItem.challengeStatus === "succeed") {
      return (
        <Image
          src={trophy}
          alt="trophy"
          width={200}
          style={{ margin: "10px auto" }}
        />
      );
    } else if (challengeItem.challengeStatus === "failed") {
      return (
        <Image
          src={failed}
          alt="failed"
          width={150}
          style={{ margin: "35px auto" }}
        />
      );
    } else {
      return (
        <Image
          src={check}
          alt="check"
          width={170}
          style={{ margin: "27px auto" }}
        />
      );
    }
  };

  // 난이도 평균치 구간 별 표시값 함수
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

  // 더미데이터
  // const dummyData = {
  //   name: userInfo.nickname,
  //   total: 16,

  // }

  return (
    <div className={styles.ground}>
      {userChallenges.length === 0 ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className={styles.titleSec}>
            <h3>원아워 레코즈</h3>
            <p>{userInfo.nickname}님의 최근 원아워 레코즈를 정리해드릴게요</p>
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
                  style={{ cursor: "pointer" }}
                />
                {userChallenges
                  .slice(curIndex, curIndex + 3)
                  .map((challengeItem, i) => {
                    // a -> challengeItem으로 변경해 알아보기 쉽게 했어요
                    return (
                      <div key={i}>
                        <div className={styles.recordsBox} key={`records${i}`}>
                          {/* 챌린지 아이템을 cardImg 파라미터로 넘겨주게 함!! 위에 cardImg 함수 수정했어요  */}
                          <h4 className={styles.cardTitle}>
                            {challengeItem.title}
                          </h4>
                          <p className={styles.cardDate}>
                            {challengeItem.date}
                          </p>
                          <div className={styles.cardImg}>
                            {cardImg(challengeItem)}
                          </div>
                          <p className={styles.cardDesc}>
                            &quot; {challengeItem.description} &quot;
                          </p>
                          <div className={styles.progressWrap}>
                            <div className={styles.progressTitle}>
                              <span>진행도</span>
                            </div>
                            <div className={styles.progressBar}>
                              <div
                                className={styles.progressState}
                                style={{
                                  width: `${challengeItem.challengeTime}%`,
                                }}
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
                  style={{ cursor: "pointer" }}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div className={styles.titleSec2}>
            <h3>#불타는 열정</h3>
            <p>
              {userInfo.nickname}님의 기록을 기반으로 목표 실천율을 분석해봤어요
            </p>
          </div>
          <div className={styles.chartUpper}>
            <div className={styles.donutSec}>
              <h4>시간 계획</h4>
              <div className={styles.valueWrap}>
                <h2 className={styles.timeAvrg}>
                  {Math.round(chartProps.timeAvrg)}%
                </h2>
                <Doughnut value={chartProps.timeAvrg} id={"timeAvrgChart"} />
              </div>
              <p>전체 집계 대비 수행시간 정보</p>
            </div>
            <div className={styles.donutSec}>
              <h4>도전 난이도</h4>
              <div className={styles.valueWrap}>
                {diffReturn()}
                <Doughnut value={chartProps.diffAvrg} id={"diffAvrgChart"} />
              </div>
              <p>평균 도전 난이도 정보</p>
            </div>
            <div className={styles.donutSec}>
              <h4>목표 달성도</h4>
              <div className={styles.valueWrap}>
                <h2 className={styles.succeedCnt}>
                  {Math.round(chartProps.succeedCount)}%
                </h2>
                <Doughnut
                  value={chartProps.succeedCount}
                  id={"succeedRatioChart"}
                />
              </div>
              <p>전체 집계 대비 90% 이상 달성 건</p>
            </div>
          </div>
          <div className={styles.titleSec3}>
            <h3>챌린지 컨티뉴어 보드</h3>
            <p>
              {userInfo.nickname}님이 꾸준히 챌린지를 수행하고 있는지 최근 30일
              간의 챌린지 기록을 보드로 정리해드릴게요
            </p>
            <p>
              최근 30일 간 {userInfo.nickname}님의 달성 건수는 총{" "}
              {sum}회 입니다.
            </p>
          </div>
          <div className={styles.boardWrapper}>
            <div className={styles.boardUpper}>
              <div className={styles.challengeRecords}>
                {dailyChallenges.map((challengeCount, index) => {
                  let circleColorClass;

                  if (challengeCount === 0) {
                    circleColorClass = styles.circleColor1; // 챌린지 미수행
                  } else if (challengeCount === 1) {
                    circleColorClass = styles.circleColor2; // 챌린지 1회 수행
                  } else if (challengeCount === 2 || challengeCount === 3) {
                    circleColorClass = styles.circleColor3; // 챌린지 2회 이상 수행
                  } else if (challengeCount >= 4) {
                    circleColorClass = styles.circleColor4; // 챌린지 4회 이상 수행
                  }

                  return (
                    <div className={styles.dailyRecords}>
                      <div key={index} className={circleColorClass}></div>
                      <p>{challengeCount === 0 ? "실패" : "달성"}</p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.colorStandards}>
                <div className={styles.standards}>
                  <div className={styles.circleColor1}></div>
                  <p>챌린지 미수행</p>
                </div>
                <div className={styles.standards}>
                  <div className={styles.circleColor2}></div>
                  <p>챌린지 1회 수행</p>
                </div>
                <div className={styles.standards}>
                  <div className={styles.circleColor3}></div>
                  <p>챌린지 2회 이상 수행</p>
                </div>
                <div className={styles.standards}>
                  <div className={styles.circleColor4}></div>
                  <p>챌린지 4회 이상 수행</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={styles.footer}></div>
    </div>
  );
}

function Loading() {
  const router = useRouter();
  return (
    <div className={styles.LoadingComp}>
      <Image src={loadImg} alt="loadimage" className={styles.loadImg} />
      <h1>챌린지 기록을 확인중입니다</h1>
      <h2>아직 챌린지 기록이 없다면 아래 버튼을 눌러 기록을 시작해보세요!</h2>
      <button
        onClick={() => {
          router.push("/dashboard/challenges");
        }}
      >
        챌린지 시작하기
      </button>
    </div>
  );
}
