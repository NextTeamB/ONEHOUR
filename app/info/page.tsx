"use client";

import styles from "./info.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import card2 from "@/public/main_card2.png";
import card3 from "@/public/main_card3.png";

export default function info() {
  const router = useRouter();

  return (
    <>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <h1 className={styles.pageTitle}>
            원아워가 처음이신 유저님께 원아워를 소개드릴게요
          </h1>
          <div className={styles.imgWrapper}>
            <Image src={card3} alt="card3" className={styles.card3} />
            <Image src={card2} alt="card2" className={styles.card2} />
          </div>
          <p className={styles.article}>
            원아워에서는 사용자가 아주 간단한 목표부터 꼭 실천해보고 싶던 루틴을
            목표로 설정할 수 있으며 성취도를 시각적으로 확인하며 <br /> 
            일상 루틴을 더욱 체계적으로 관리할 수 있도록 보조하는 서비스입니다
          </p>
          <button
            onClick={() => {
              router.push("info/info2");
            }}
            className={styles.nextBtn}
          >
            다음으로
          </button>
        </div>
      </div>
    </>
  );
}
