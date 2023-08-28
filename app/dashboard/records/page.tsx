"use client";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export interface userRecord {
  title: string;
  challengeTime: number;
  date: string;
  challengeStatus: string;
  description: string;
  difficulty: number;
}

export default function Records() {
  let [userChallenges, setUserChallenges] = useState<userRecord[]>([]);

  useEffect(() => {
    axios
      .get("/api/records")
      .then((res) => {
        setUserChallenges([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {userChallenges.map((a, i) => {
        return (
          <div key={i}>
            {userChallenges[i].title}
            {userChallenges[i].challengeStatus}
            {userChallenges[i].date}
          </div>
        );
      })}
    </div>
  );
}
