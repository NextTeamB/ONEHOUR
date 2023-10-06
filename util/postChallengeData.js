import axios from "axios";

// 진행도를 계산하는 함수
const calculateProgress = (seconds) => {
  return (seconds / 60) * 100; // 현재 시간을 분으로 나누고 100을 곱하여 퍼센트로 계산
};
export const postChallengeData = async (
  title,
  description,
  difficulty,
  seconds
) => {
  let status = "";
  if (calculateProgress(seconds) >= 90) {
    status = "succeed";
  } else if (calculateProgress(seconds) >= 60) {
    status = "perform";
  } else {
    status = "failed";
  }
  try {
    const response = await axios.post("/api/records", {
      title,
      description,
      difficulty,
      challengeStatus: status,
      challengeTime: seconds,
      challengeProgress: calculateProgress(seconds),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
