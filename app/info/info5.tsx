"use client";

import styles from "./info.module.scss";
import Image from "next/image";
import card4 from "@/public/info5_card1.png";
import card5 from "@/public/info5_card3.png";

export default function Info5() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.articleTwo}>
        챌린저스 페이지는 다른 원아워 챌린저들이 어떤 챌린지를 
        진행하고 어떻게 수행하는지 소통할 수 있습니다 <br />
        다른 유저와 함께 챌린지를 진행할 수도 있고, 
        다른 챌린저의 챌린지를 참고할 수도 있어요
      </p>
      <div className={styles.imgWrapper_info5}>
        <Image src={card4} alt="card4" className={styles.card4} />
        <Image src={card5} alt="card5" className={styles.card5} />
      </div>
    </div>
  );
}