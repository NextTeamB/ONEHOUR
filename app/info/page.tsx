"use client";

import styles from "./info.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import card2 from "@/public/main_card2.png";
import card3 from "@/public/main_card3.png";
import Info2 from "./info2";
import Info3 from "./info3";
import Info4 from "./info4";
import Info5 from "./info5";

export default function info() {
  const router = useRouter();
  // 초기 상태 설정
  const [pageTitle, setPageTitle] = useState("원아워가 처음이신 유저님께 원아워를 소개드릴게요");
  const [pageCount, setPageCount] = useState(1);

  const handleNextClick = () => {
    // 페이지 제목을 변경하고 페이지 카운트를 증가시킴
    if (pageCount === 1) {
      setPageTitle("성실한 나를 위해, 발전할 우리를 위해!");
    } else if (pageCount === 2) {
      setPageTitle("간단하게 시작해요, 원아워 챌린지");
    } else if (pageCount === 3) {
      setPageTitle("원아워 레코즈에서 한눈에 파악하기");
    } else if (pageCount === 4) {
      setPageTitle("다른 챌린저들과 소통하기");
    } else if (pageCount === 5) {
      // 마지막 페이지에서 "가이드 종료" 버튼을 눌렀을 때 "/info"로 돌아가기
      router.push("/");
      return; // 더 이상 진행하지 않도록 리턴
    }
    setPageCount(pageCount + 1);
  };

  return (
    <>
      <div className={styles.root}>
        <h1 className={styles.pageTitle}>
          {pageTitle}
        </h1>
        {pageCount === 1 && (
          <div className={`${styles.wrapper}`}>
            <div className={styles.imgWrapper}>
              <Image src={card3} alt="card3" className={styles.card3} />
              <Image src={card2} alt="card2" className={styles.card2} />
            </div>
            <p className={styles.article}>
              원아워에서는 사용자가 아주 간단한 목표부터 꼭 실천해보고 싶던 루틴을
              목표로 설정할 수 있으며 성취도를 시각적으로 확인하며 <br /> 
              일상 루틴을 더욱 체계적으로 관리할 수 있도록 보조하는 서비스입니다
            </p>
          </div>
        )}
        {pageCount === 2 && (
          <Info2 />
        )}
        {pageCount === 3 && (
          <Info3 />
        )}
        {pageCount === 4 && (
          <Info4 />
        )}
        {pageCount === 5 && (
          <Info5 />
        )}
        <button
          onClick={handleNextClick}
          className={`${styles.nextBtn} ${pageCount === 5 ? styles.endGuideBtn : ''}`}
        >
          {pageCount === 5 ? "가이드 종료" : "다음으로"}
        </button>
      </div>
    </>
  );
}
