import styles from "./challenges.module.scss";
import Link from "next/link";
import Image from "next/image";
import trophy from "../../../public/trophy.png";

export default function challenge() {
  return (
    <>
      <div className={styles.root}>
        <Image src={trophy} alt="trophy" className={styles.trophy} />
        <div className={styles.textbox}>
          <h1 className={styles.title}>
            챌린지를 90% 이상 달성하고 트로피를 획득하세요
          </h1>
          <p className={styles.article}>
            1시간 동안 효율적으로 집중할 수 있는 목표를 설정하는 것이 중요해요!
            <br /> 기록중지 버튼을 누르거나 기록 페이지를 벗어나면 기록이
            중지됩니다.
          </p>
          <Link href="/dashboard/challenges/new-challenge">
            <button className={styles.startBtn}>
              <span>시작합니다</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
