"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export interface userRank {
  name: string;
  email: string;
  password: number;
  totalChallenge: number;
  refreshToken: string;
}

export default function Time_Ranking() {
  let [userRanking, setUserRanking] = useState<userRank[]>([]);
  useEffect(() => {
    axios
      .get("/api/rank")
      .then((res) => {
        setUserRanking([...res.data]);
      })
      .catch((err) => {
        console.log("데이터 로드에 실패하였습니다");
      });
  }, []);

  return (
    <>
      {userRanking[0].name}
      {userRanking[1].name}
    </>
  );
}
