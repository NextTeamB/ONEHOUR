import moment from "moment";

export function onContinuerBoard(userChallenges) {
  // 데이터 스트링 값을 쭉 받아 저장할 배열 선언
  let dateArr = [];
  // 해당 일에 해당하는 카운트를 저장하는 배열 선언
  let challengeCount = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ];
  // for 문을 통해 date 값을 trim한 후 dateArr 배열에 추가
  for (let i = 0; i < userChallenges.length; i++) {
    let dateFull = userChallenges[i].date;
    let dateCut = dateFull.substr(0, 10);
    dateArr.push(dateCut);
    // console.log(dateArr);
  }

  for (let i = 0; i < dateArr.length; i++) {
    for (let j = 29; j >= 0; j--) {
      const date = moment().subtract(j, "days").format("YYYY-MM-DD");
      if (dateArr[i] === String(date)) {
        challengeCount[j] += 1;
      }
    }
  }

  return challengeCount;
}
