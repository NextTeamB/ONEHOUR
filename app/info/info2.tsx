"use client";

import styles from "./info.module.scss";
import Image from "next/image";
import dummy from "@/public/dummy.png";

export default function Info2() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <Image src={dummy} alt="dummy" className={styles.dummy} />
      </div>
      <p className={styles.article}>
        원아워에서는 오직 자신만의 목표를 기록하고 
        달성해가는 경험을 제공해드립니다 <br /> 
        원아워가 드릴 수 있는 시간은 오직 한 시간 뿐! 
        자투리 시간을 잘 계획하여 하루를 알차게 보내보기로해요 <br /> 
        그럼 이제 원아워를 어떻게 사용할 지 알아볼까요?
      </p>
    </div>
  );
}