"use client";

import styles from "./info4.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ring1 from "@/public/ring-chart1.png";
import ring2 from "@/public/ring-chart2.png";
import ring3 from "@/public/ring-chart3.png";
import card from "@/public/info4_card.png";

export default function info4() {
  const router = useRouter();
  
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.pageTitle}>
          원아워 레코즈에서 한눈에 파악하기
        </h1>
        <p className={styles.article}>
          원아워에서는 유저분의 챌린지 기록을 제공받아 데이터를 분석한 후 
          리워드 카드 및 차트 형식으로 기록을 정리해 드리고있어요 <br />
          챌린지 계획이 너무 어렵거나 수행하기 힘들진 않았는지, 
          나의 목표달성도는 얼만큼인지 확인할 수 있어요
        </p>
        <div className={styles.imgWrapper}>
          <div className={styles.article1}>
            <div className={styles.chart}>
              <p>시간 계획</p>
              <Image src={ring1} alt="ring1" className={styles.ring} />
              <p>최근 기록 중 100% 완료 건</p>
            </div>
            <div className={styles.chart}>
              <p>도전 난이도</p>
              <Image src={ring2} alt="ring2" className={styles.ring} />
              <p>최근 7일 중 90% 달성 건</p>
            </div>
            <div className={styles.chart}>
              <p>목표 달성도</p>
              <Image src={ring3} alt="ring3" className={styles.ring} />
              <p>최근도전에 대한 달성도</p>
            </div>
          </div>
          <Image src={card} alt="card" className={styles.card} />
        </div>
        <button
          onClick={() => {
            router.push("info5");
          }}
          className={styles.nextBtn}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}