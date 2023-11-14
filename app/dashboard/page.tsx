"use client";

import Image from "next/image";
import React from "react";
import styles from "./dashboard.module.scss";
import ads_banner1 from "../../public/ads_banner1.png";
import newsIcon from "../../public/Icon_newspaper.png";
import newsImg from "../../public/news_img.png";
import student1 from "../../public/student1.png";
import { useModal } from "@/context/modalContext";
import { onLogout } from "@/util/onLogout";

const Dashboard = () => {
  const { modalState, closeModal } = useModal();
  
  return (
    <>
      <div className={styles.adsSection}>
        <Image
          className={styles.ads_banner1}
          src={ads_banner1}
          width={1620}
          alt="ads1-nike"
        />
        <button>자세히</button>
      </div>
      <div className={styles.people_news}>
        <h2>원아워 피플뉴스</h2>
        <Image className={styles.newsIcon} src={newsIcon} alt="news-icon" />
        <div className={styles.newsBox}>
          <div className={styles.newsImage}>
            <Image className={styles.news_pic} src={newsImg} alt="news-image" />
          </div>
          <div className={styles.newsText}>
            <h3>
              한국의 금융을 새로 쓰는 활동가, 김태훈 (주)뱅크샐러드 대표의
              시작점
            </h3>
            <p>
              처음 회사를 설립할 때에 제가 바라본 목표는 “내 자산관리를
              어떻게하면 잘 할수 있을까?” 였어요
              <br />
              금융에 대해서 고민하던 저는, 사업을 시작하기 전에 필요한
              제반사항이 바로 제가 직접 경험하는 것 이었죠
              <br />
              그래서 하루에 무조건 3번 자산 기록하기부터 시작됐어요 제 실천이.
              그게 지금의 뱅크샐러드 가족들을
              <br />
              만들어 준 것 같아요. 여러분도 자신만의 목표를 열심히 실천하셔서
              성장하셨으면 좋겠습니다!
            </p>
            <button>본문으로</button>
          </div>
        </div>
      </div>
      <div className={styles.weekly_challenge}>
        <h2>WEEKLY CHALLENGE</h2>
        <h4>
          원아워는 수험생에게 아주 유용한 서비스인 것 같아요, 수험생의 원아워
          사용법 꿀팁 들어갑니다 ! 🍯
        </h4>
        <p className={styles.subText}>
          딱딱한 타이머 공부법 대신 과목별로 나누어 챌린지를 수행해보세요.
          트로피도 얻고, 성취감도 더욱 느낄 수 있는 것 같습니다!
        </p>
        <p>
          원아워를 시작한 계기도 ‘꾸준함’ 을 기르기 위해서였습니다. 카드를
          하나하나씩 채울때마다 오늘 해야할 공부량이
          <br />
          가시적으로 들어오기도 하고 한시간이라는 적절한 분량이 주는 집중도는 제
          기대보다 훨씬 높았어요.
          <br />
          물론 난이도를 선정할 때 주관적인 부분이 개입될 수 밖에 없기 때문에
          원아워 레코드 지표가
          <br />
          알맞은 결과인가? 라는 생각도 들었었지만, 저는 제가 어려워하던 과목을
          공부할 때 난이도를
          <br />
          높은 쪽으로 설정해두었고, 챌린지 제목도 단순히 수학, 과학과 같이
          포괄적인 과목명이 아닌
          <br />
          “화학2 - 엔트로피의 성질과 열역학” 처럼 세부적인 이론을 쪼개가며
          기록했어요.
          <br />
          이렇게 하니 제가 두려워하는 과목과 이론이 정리가 되었고 그 부분을
          중심으로
          <br />
          취약점을 보완하기 더욱 쉬워졌던 것 같습니다. 저처럼 세부 과목을 쪼개는
          것도
          <br />
          방법이 될 수 있고, 한 시간 목표를 연속으로 수행할수도 있으니 이를 잘
          이용하여
          <br />
          본인만의 공부전략을 세워보시기를 ‘적극’ 추천드립니다. 체계적인 습관을
          들이는
          <br />
          가장 쉬운 방법이 꾸준함이라고 생각합니다. 원아워의 기능은 정말
          단순하면서도
          <br />
          꾸준함을 기르는 데에 최적화된 서비스라고 생각해요. 얼마 남지않은
          수학능력시험
          <br />
          모두 잘 준비하셔서 좋은결과 꼭! 이뤄내시길 바랄게요. 화이팅! 대한민국
          수험생!
        </p>
        <Image className={styles.student1} src={student1} alt="student1" />
        <p className={styles.student_info}>
          숭실고등학교 3학년
          <br />
          성의진 학생
        </p>
        <div className={styles.boxMargin}></div>
      </div>
      {/* 로그아웃 모달 창 렌더링 */}
      {modalState === 1 && (
        <div className={modalState === 1 ? styles.modal1 : styles.modal0}>
          <p>로그아웃 하시겠습니까?</p>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.closeModal}
              onClick={() => {
                closeModal(); // 모달창 닫기
                onLogout(); // 로그아웃 함수 호출
              }}
            >
              확인
            </button>
            <button
              className={styles.closeModal}
              onClick={closeModal}
            >
              취소
            </button>
          </div>
        </div>
      )}
      <div className={modalState === 1 ? styles.modalBG1 : styles.modalBG0}></div>
    </>
  );
};

export default Dashboard;
