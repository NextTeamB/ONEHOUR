import styles from "./guide.module.css";
import Image from "next/image";
import uiE1 from "../../public/uiexample.png";
import uiE2 from "../../public/uiexample2.png";
import uiE3 from "../../public/boxs.png";
import uiE4 from "../../public/example4.png";
import deco from "../../public/deco.png";
import logo_b from "../../public/logo_b.png";
import arrowback from "../../public/arrowback.png";
import Link from "next/link";

export default function guide() {
  return (
    <>
      <div className={styles.root}>
        {/* section1 */}
        <div className={styles.section1}>
          <Link href="/">
            <div className={styles.Btnbox}>
              <button className={styles.backBtn}>
                <Image
                  src={arrowback}
                  alt="arrowback"
                  className={styles.arrowback}
                />
                <p>뒤로가기</p>
              </button>
            </div>
          </Link>
          <h1 className={styles.pagetitle}>
            USER GUIDANCE
            <br />
            사용 가이드
          </h1>
          <Image src={deco} alt="deco1" className={styles.deco1} />
          <p className={styles.article1}>
            먼저 원아워 페이지에 로그인 (또는 회원가입) 을 진행해 주세요
          </p>
          <p className={styles.article1_sub}>
            원아워 서비스는 회원 정보를 입력받아 이를 활용하고 분석하는 역할을
            하고 있습니다, 따라서 회원가입을 진행하여야 <br /> 원활한 서비스
            이용이 가능합니다 아직 원아워 로그인을 하지 않으셨다면! 아래 링크로
            이동하여 로그인 (또는 회원가입) 을 진행하여 주세요
          </p>
        </div>
        {/* section 2 */}
        <div className={styles.section2}>
          <p className={styles.article2}>기록을 시작하고 싶다면?</p>
          <p className={styles.article2_sub}>
            기록을 시작하기 위해선 원아워 메인페이지에 접속한 후 좌측 매뉴얼
            바의 부스트업 버튼을 눌러주셔야 합니다, 챌린지 버튼을 누르게 되면
            <br />
            목표를 입력할 수 있으며, 목표 입력과 난이도 설정을 마친 후 다음
            과정으로 진행할 수 있어요 (실제 UI 구성과 같은 이미지입니다)
          </p>
          <Image src={deco} alt="deco2" className={styles.deco2} />
          <Image src={uiE1} alt="uiE1" className={styles.example1} />
        </div>
        {/* section3 */}
        <div className={styles.section3}>
          <p className={styles.article3}>열심히 열중하기!</p>
          <p className={styles.article3_sub}>
            기록을 시작한 후 진행되는 타이머에 맞추어 본인의 목표를 실천하세요
            <br />
            중간에 피치 못할 이유로 기록을 중단해야 한다면 기록중지 버튼을 눌러
            기록을 중지할 수 있어요
          </p>
          <Image src={uiE2} alt="uiE2" className={styles.example2} />
        </div>
        {/* section4 */}
        <div className={styles.section4}>
          <p className={styles.article4}>레코드 확인하기</p>
          <p className={styles.article4_sub}>
            원아워 레코즈 메뉴에 접속하면 본인의 최근 3개 기록을 카드형식으로
            확인할 수 있어요
            <br />
            이렇게 정리된 결과를 바탕으로 더욱 효과적인 계획을 세워보세요!
          </p>
          <Image src={uiE3} alt="uiE3" className={styles.example3} />
        </div>
        <div className={styles.section5}>
          <Image src={deco} alt="deco3" className={styles.deco3} />
          <p className={styles.article5}>챌린저스란?</p>
          <p className={styles.article5_sub}>
            원아워를 이용하는 다른 사용자들을 이어주는 커뮤니티 기능이에요
            <br />
            챌린저스 메뉴에서는 다른 원아워 사용자들의 원아워 챌린지도 확인할 수
            있고, 자유롭게 소통할 수 있어요
          </p>
          <Image src={uiE4} alt="uiE4" className={styles.example4} />
        </div>
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
