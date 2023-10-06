"use client";

import styles from "./info5.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import card1 from "@/public/info5_card1.png";
import card2 from "@/public/info5_card2.png";
import card3 from "@/public/info5_card3.png";

export default function info() {
  const router = useRouter();
  
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.pageTitle}>
          다른 챌린저들과 소통하기
        </h1>
        <p className={styles.article}>
          챌린저스 페이지는 다른 원아워 챌린저들이 어떤 챌린지를 
          진행하고 어떻게 수행하는지 소통할 수 있습니다 <br />
          다른 유저와 함께 챌린지를 진행할 수도 있고, 
          다른 챌린저의 챌린지를 참고할 수도 있어요
        </p>
        <div className={styles.imgWrapper}>
          <Image src={card1} alt="card1" className={styles.card1} />
          <Image src={card2} alt="card2" className={styles.card2} />
          <Image src={card3} alt="card3" className={styles.card3} />
        </div>
        <button
          onClick={() => {
            router.push("/");
          }}
          className={styles.nextBtn}
        >
          가이드 종료
        </button>
      </div>
    </div>
  );
}