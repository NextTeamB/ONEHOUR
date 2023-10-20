"use client";

import styles from "./info.module.scss";
import Image from "next/image";
import card from "@/public/info3_card.png";
import trophy from "@/public/trophy.png";
import process from "@/public/dataprocess.png";

export default function Info3() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.articleTwo}>
        원아워 챌린지를 시작하고 싶다면, 챌린지 페이지에 접속하여 수행하고자 
        하는 목표와 난이도 그리고 세부 설명을 입력해주세요 <br />
        챌린지 시작하기 버튼을 클릭하면 곧바로 한 시간 분량의 
        챌린지가 시작됩니다. 한 시간동안 집중 또 집중! <br /> 
      </p>
      <div className={styles.imgWrapper_info3}>
        <div className={styles.article1}>
          <p>
            상황에 맞게 <br /> 자유롭게 정해봐요
          </p>
          <p>
            운동부터 다양한 취미까지 1시간동안 집중!
          </p>
          <Image src={card} alt="card" className={styles.card} />
        </div>
        <div className={styles.article2}>
          <Image src={trophy} alt="trophy" className={styles.trophy} />
          <p>
            목표를 달성하고 <br /> 트로피를 수집하세요!
          </p>
          <p>
            시간 달성률 90% 이상 <br />
            목표 달성률 90% 이상 <br />
            하루를 알차게 보내고 트로피를 획득하세요
          </p>
        </div>
        <div className={styles.article3}>
          <p>
            이렇게 수집된 데이터는 <br /> 
            원아워에서 분석하여 요약해드립니다
          </p>
          <p>
            다음 목표계획을 위해 정리된 데이터를 다음과 
            같은 과정을 거쳐 제공해 드려요 <br />
            제공받은 데이터와 개인정보는 절대로! 목적 외의 
            방법으로 이용되거나 전달되지 않습니다 <br />
            시간과 목표를 잘 달성 했는지, 총 집계량 대비 
            달성도를 정리해 드릴게요 <br />
            이를 바탕으로 본인의 계획을 한눈에 정리하고 확인하세요!
          </p>
          <Image src={process} alt="process" className={styles.process} />
        </div>
      </div>
    </div>
  );
}