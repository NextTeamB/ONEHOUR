"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import challenge from "../challenges/page";
import useEmblaCarousel from "embla-carousel-react"
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

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
        // console.log("챌린지:", countArr);
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
          className={styles.trophy}
        />
      );
    } else if (challengeItem.challengeStatus === "failed") {
      return (
        <Image
          src={failed}
          alt="failed"
          className={styles.failed}
        />
      );
    } else {
      return (
        <Image
          src={check}
          alt="check"
          className={styles.check}
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

  // 날짜를 특정 형식으로 변환하는 함수
  const formatDateString = (dateData: string) => {
    // 년, 월, 일, 시, 분 추출
    const getDate = dateData.split("T")[0];
    const getTime = dateData.split("T")[1];
    const year = getDate.split("-")[0];
    const month = getDate.split("-")[1];
    const day = getDate.split("-")[2];
    const hours = parseInt(getTime.split(":")[0], 10);
    const minutes = getTime.split(":")[1];
  
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = () => {
      if (hours <= 12) return hours;
      else if (hours > 12) return hours - 12;
    }
    const formattedDate = [`${year}년 ${month}월 ${day}일`, `${ampm} ${formattedHours()}시 ${minutes}분`];
    return formattedDate;
  }

  // Embla-Carousal 적용
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className={styles.ground}>
      {userChallenges.length === 0 ? (
        <>
          <Loading />
        </>
      ) : (
        <div className={styles.Upper}>
          <div className={styles.section1}>
            <div className={styles.titleSec}>
              <h3>원아워 레코즈</h3>
              <p>{userInfo.nickname}님의 최근 원아워 레코즈를 정리해드릴게요</p>
            </div>
            <div className={styles.listUpper}>
              <button
                className={styles.embla__button}
                type="button"
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
              >
                <Image
                  className={styles.embla__button__svg} 
                  src={bal}
                  alt="arrow"
                />
              </button>
              <div className={styles.recordsBoxWrap}>
                  <div className={styles.embla}>
                    <div className={styles.embla__viewport} ref={emblaRef}>
                      <div className={styles.embla__container}>
                        {userChallenges
                          .map((challengeItem, i) => {
                            return (
                              <div className={styles.embla__slide} key={i}>
                                <div className={styles.embla__recordsBox} key={`records${i}`}>
                                  {/* 챌린지 아이템을 cardImg 파라미터로 넘겨주게 함!! 위에 cardImg 함수 수정했어요  */}
                                  <div className={styles.cardImg}>
                                    {cardImg(challengeItem)}
                                  </div>
                                  <h4 className={styles.cardTitle}>
                                    {challengeItem.title}
                                  </h4>
                                  <p className={styles.cardDesc}>
                                    &quot; {challengeItem.description} &quot;
                                  </p>
                                  <p className={styles.cardDate}>
                                    {formatDateString(challengeItem.date)[0]} <br />
                                    {formatDateString(challengeItem.date)[1]}
                                  </p>
                                  <div className={styles.progressWrap}>
                                    <span>진행도</span>
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
                            )
                        })}
                      </div>
                    </div>
                  </div>
              </div>
              <button
                className={styles.embla__button}
                type="button"
                onClick={scrollNext}
                disabled={nextBtnDisabled}
              >
                <Image
                  className={styles.embla__button__svg}
                  src={bar}
                  alt="arrow"
                />
              </button>
            </div>
          </div>
          <div className={styles.section2}>
            <div className={styles.titleSec}>
              <h3>#불타는 열정</h3>
              <p>
                {userInfo.nickname}님의 기록을 기반으로 목표 실천율을
                분석해봤어요
              </p>
            </div>
            <div className={styles.chartUpper}>
              <div className={styles.donutSec}>
                <h4>시간 계획</h4>
                <div className={styles.valueWrap}>
                  <h2>
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
                  <h2>
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
          </div>
          <div className={styles.section3}>
            <div className={styles.titleSec3}>
              <h3>챌린지 컨티뉴어 보드</h3>
              <p>
                {userInfo.nickname}님이 꾸준히 챌린지를 수행하고 있는지 최근
                30일 간의 챌린지 기록을 보드로 정리해드릴게요
                <br />
                최근 30일 간 {userInfo.nickname}님의 달성 건수는 총 <span>{sum}회</span>
                입니다.
              </p>
            </div>
            <div className={styles.boardWrapper}>
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
        </div>
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
      <h2>아직 챌린지 기록이 없다면 <br /> 아래 버튼을 눌러 기록을 시작해보세요!</h2>
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
