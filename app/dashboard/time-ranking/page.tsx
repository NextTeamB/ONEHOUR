"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ranking.module.scss";
import crown from "../../../public/crown.png";
import L0 from "../../../public/111.png";
import L1 from "../../../public/112.png";
import L2 from "../../../public/113.png";
import user_icon from "../../../public/user_icon.png";
import stars from "../../../public/starts.png";

export interface userRank {
  name: string;
  email: string;
  password: number;
  totalChallenge: number;
  refreshToken: string;
  nickname: string;
  profileImgUrl: string;
}

export default function Time_Ranking() {
  let [userRanking, setUserRanking] = useState<userRank[][]>([]);

  // useEffect(() => {
  //   console.log(userRanking);
  // }, [userRanking]);

  useEffect(() => {
    axios
      .get("/api/rank")
      .then((res) => {
        setUserRanking([...res.data]);
        console.log(userRanking);
      })
      .catch((err) => {
        console.log("데이터 로드에 실패하였습니다");
      });
  }, []);

  return (
    <>
      <div className={styles.titleArea}>
        <Image src={crown} alt="crown" className={styles.crown} />
        <h2 className={styles.title}>
          무구의 노력을 견뎌낸 타임 랭커들을 소개합니다
        </h2>
        <p>2023년 9월 2주차 누적 순위 집계</p>
      </div>
      {userRanking[1] ? (
        <>
          <div className={styles.honorSection}>
            <div className={styles.top3Box0}>
              <div className={styles.profile}>
                <img
                  className={styles.userProfile}
                  src={userRanking[0][2].profileImgUrl}
                />
              </div>
              <Image src={L2} alt="lauren" className={styles.lauren2} />
              <div className={styles.nickname}>
                <h3>{userRanking[1][1].nickname}</h3>
                <p>님</p>
              </div>
              <div className={styles.totalChallenge}>
                <h4>{userRanking[1][1].totalChallenge}</h4>
                <p>시간</p>
              </div>
            </div>
            <div className={styles.top3Box1}>
              <div className={styles.profile}>
                <img
                  className={styles.userProfile}
                  src={userRanking[0][2].profileImgUrl}
                />
              </div>
              <Image src={stars} alt="stars" className={styles.stars} />
              <Image src={L0} alt="lauren" className={styles.lauren0} />
              {/* <Image src={`L${i}`} alt="crown" width={100} height={100} /> */}
              <div className={styles.nickname}>
                <h3>{userRanking[1][0].nickname}</h3>
                <p>님</p>
              </div>
              <div className={styles.totalChallenge}>
                <h4>{userRanking[1][0].totalChallenge}</h4>
                <p>시간</p>
              </div>
            </div>

            <div className={styles.top3Box2}>
              <div className={styles.profile}>
                <img
                  className={styles.userProfile}
                  src={userRanking[0][2].profileImgUrl}
                />
              </div>
              <Image src={L1} alt="lauren" className={styles.lauren1} />
              {/* <Image src={`L${i}`} alt="crown" width={100} height={100} /> */}
              <div className={styles.nickname}>
                <h3>{userRanking[1][2].nickname}</h3>
                <p>님</p>
              </div>
              <div className={styles.totalChallenge}>
                <h4>{userRanking[1][2].totalChallenge}</h4>
                <p>시간</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.honorSection}></div>
      )}
      <div className={styles.listArea}>
        {userRanking[0] &&
          userRanking[0].map((a, i) => {
            return (
              <div className={styles.lists}>
                <div className={styles.profile2}>
                  <img
                    className={styles.userProfile}
                    src={userRanking[0][2].profileImgUrl}
                  />
                </div>
                <p className={styles.rankNum}>{i + 4}위</p>
                <p className={styles.nickname2}>{userRanking[0][i].nickname}</p>
                <p>총 도전시간</p>
                <p>
                  {userRanking[0][i].totalChallenge
                    ? userRanking[0][i].totalChallenge
                    : "-"}
                  시간
                </p>
              </div>
            );
          })}
      </div>
      {/* {userRanking.map((a, i) => {
        return <div key={i}>일단 보류</div>;
      })} */}
    </>
  );
}
