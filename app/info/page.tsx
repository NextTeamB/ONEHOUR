"use client";

import styles from "./info.module.css";
import Image from "next/image";
import deco from "../../public/deco.png";
import uiE5 from "../../public/example5.png";
import process from "../../public/dataprocess.png";
import dummy from "../../public/dummy.png";
import arrowforward from "../../public/arrow-forward.png";
import Link from "next/link";
import Lottie from "react-lottie-player";
import Animation from "@/public/animation_trophy.json";
import logo_b from "../../public/logo_b.png";
import arrows from "../../public/three-arrows.png";
import deco3 from "../../public/deco3.png";

function Trophy() {
  return (
    <Lottie
      loop
      animationData={Animation}
      play
      style={{width: '50%', height: 'auto'}}
    />
  )
}

export default function info() {
  return (
    <>
      <div className={styles.root}>
        {/* section1 */}
        <div className={styles.section1}>
          <Image src={deco} alt="deco1" className={styles.deco1} />
          <h1 className={styles.pagetitle}>
            We Make
            <br />
            Better Life Style
          </h1>
          <p className={styles.article1}>
            계획을 습관으로, 하루 한 시간 목표를 실천해보세요
          </p>
          <p className={styles.article1_sub}>
            원아워에서는 사용자가 아주 간단한 목표부터 꼭 실천해보고 싶던 루틴을
            목표로 설정할 수 있으며 성취도를 시각적으로 확인하며 <br /> 일상
            루틴을 더욱 체계적으로 관리할 수 있도록 보조하는 서비스입니다
          </p>
          <Image src={deco} alt="deco2" className={styles.deco2} />
        </div>
        {/* section 2 */}
        <div className={styles.section2}>
          <Image src={dummy} alt="dummy" className={styles.dummy} />
          <div className={styles.articlebox}>
            <p className={styles.article2}>
              성실한 나를 위해 <br /> 발전할 우리를 위해
            </p>
            <p className={styles.article2_sub}>
              어떤 목표라도 좋아요! 천천히 쉬운 것부터 시작해보는거죠, 분야는
              중요한 것이 아니에요. 원아워에서는 오직 자신만의 목표를 기록하고
              달성해가는 경험을 제공해드리려고 합니다. 다만, 원아워가 드릴 수
              있는 시간은 하루 최대 한 시간 뿐이에요! 자투리 시간을 잘 계획해
              하루를 알차게 보내보기로 해요. 그럼 이제 원아워를 어떻게 사용할 지
              알아볼까요?
            </p>
            <Link href="../user-guidance">
              <div className={styles.Btnbox}>
                <button className={styles.guideBtn}>
                  <span>사용 가이드</span>
                  <Image
                    src={arrowforward}
                    alt="arrowforward"
                    className={styles.arrowforward}
                  />
                </button>
              </div>
            </Link>
          </div>
        </div>
        {/* section3 */}
        <div className={styles.section3}>
          <p className={styles.article3}>간단하게 시작해요 원아워 레코딩</p>
          <div className={styles.article3_box12}>
            <div className={styles.article3_box1}>
              <div className={styles.box1_textbox}>
                <p className={styles.box1_title}>
                  상황에 맞게 <br /> 자유롭게 정해봐요
                </p>
                <p className={styles.box1_sub}>
                  운동부터 다양한 취미까지 1시간동안 집중!
                </p>
              </div>
              <Image src={uiE5} alt="uiE5" className={styles.example5} />
            </div>
            <div className={styles.article3_box2}>
              <Trophy />
              <div className={styles.box2_textbox}>
                <p className={styles.box2_title}>
                  목표를 달성하고 <br /> 트로피를 수집하세요!
                </p>
                <p className={styles.box2_sub1}>
                  시간 달성률 90% 이상 <br />
                  목표 달성률 90% 이상
                </p>
                <p className={styles.box2_sub2}>
                  하루를 알차게 보내고 트로피를 획득하세요
                </p>
              </div>
            </div>
          </div>
          <div className={styles.article3_box3}>
            <div className={styles.box3_textbox}>
              <p className={styles.box3_title}>
                이렇게 수집된 데이터는 <br /> 원아워에서 분석하여 요약해드립니다
              </p>
              <p className={styles.box3_sub}>
                다음 목표계획을 위해 정리된 데이터를 다음과 같은 과정을 거쳐
                제공하여 드리려고 해요
                <br />
                제공받은 데이터와 개인정보는 절대로! 목적 외의 방법으로
                이용되거나 전달되지 않아요
                <br />
                시간과 목표를 잘 달성했는지, 총 집계량 대비 달성도를
                정리해드릴게요
                <br />
                이를 바탕으로 본인의 계획을 한눈에 정리하고 확인하세요!
              </p>
            </div>
            <Image src={process} alt="process" className={styles.dataprocess} />
          </div>
        </div>
        {/* section4 */}
        <div className={styles.section4}>
          <Image src={arrows} alt="arrows" className={styles.threearrows} />
          <p className={styles.article4_01}>We{"'"}ll Waiting you.</p>
          <p className={styles.article4_02}>
            어떻게 해야 원아워를 <br /> 잘 사용할 수 있을까요?
          </p>
          <p className={styles.article4_03}>
            프로세스에 맞추어 진행하시면 어렵지 않으실거에요
            <br /> 아래 버튼을 눌러 시작하세요!
          </p>
          <Link href="../login">
            <div className={styles.Btnbox2}>
              <button className={styles.startBtn}>START</button>
            </div>
          </Link>
          <Image src={deco3} alt="deco3" className={styles.deco3} />
        </div>
        {/* footer */}
        <div className={styles.footer}>
          <Image src={logo_b} alt="logo_b" className={styles.footerLogo} />
          <p className={styles.articleFooter}>원아워</p>
          <div className={styles.member1}>
            <p className={styles.PL}>LEADER</p>
            <p className={styles.Leader}>장수현</p>
          </div>
          <div className={styles.member2}>
            <p className={styles.PL}>DEVELOPER</p>
            <p className={styles.DV}>강해솔</p>
          </div>
          <div className={styles.member3}>
            <p className={styles.PL}>DEVELOPER</p>
            <p className={styles.DV}>김시훈</p>
          </div>
          <p className={styles.footerTitle}>
            SOONGSIL UNIVERSITY GLOBAL MEDIA NEXT PROJECT
          </p>
          <div className={styles.fhr}></div>
        </div>
      </div>
    </>
  );
}
