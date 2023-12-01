import { connectDB } from "../../util/databaseConnect";
import { ObjectId } from "mongodb";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // 1. authorization Header Decode
      let atHeader = req.headers["authorization"];
      let acToken = atHeader.substr(7);
      let decoding = JSON.stringify(jwt.decode(acToken).id);
      let decodeId = JSON.parse(decoding);

      // 2. 해당 decodeId에 해당하는 이메일을 userAccount 에서 찾음
      let db = (await connectDB).db("onehour");
      let userEmail = await db
        .collection("userAccount")
        .findOne({ _id: new ObjectId(decodeId) });

      if (userEmail === null) {
        return res.status(403).json("요청에 대한 권한이 없습니다");
      }
      // 3. userChallenges  컬렉션에서 이 로그인되어있는 유저 email 에 해당하는 챌린지 정보를 가져옴
      let userChallenges = await db
        .collection("userChallenges")
        .find({ email: userEmail.email })
        .sort({ _id: -1 })
        .toArray();
      // 4. 해당 데이터 리턴
      return res.status(200).json(userChallenges);
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else if (req.method === "POST") {
    try {
      const {
        challengeStatus,
        title,
        description,
        challengeTime,
        difficulty,
        ...challengeInfo
      } = req.body;

      // 1. authorization Header Decode
      let atHeader = req.headers["authorization"];
      let acToken = atHeader.substr(7);
      let decoding = JSON.stringify(jwt.decode(acToken).id);
      let decodeId = JSON.parse(decoding);
      let db = (await connectDB).db("onehour");
      let userCheck = await db
        .collection("userAccount")
        .findOne({ _id: new ObjectId(decodeId) });
      // 2. 해당 decodeId에 해당하는 이메일을 userAccount 에서 찾음
      if (userCheck === null) {
        return res.status(403).json("요청에 대한 권한이 없습니다");
      }

      // post 요청 시 연월일 계산
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let today = date.getDate();

      let newChallenge = {
        email: userCheck.email,
        challengeStatus: challengeStatus,
        challengeTime: challengeTime,
        title: title,
        description: description,
        difficulty: difficulty,
        date: `${year}년 ${month}월 ${today}일`,
      };

      await db.collection("userChallenges").insertOne(newChallenge);
      return res.status(200).json("챌린지 기록이 저장되었습니다");
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else {
    return res.status(405).json("허용되지 않는 요청 메소드입니다");
  }
}
