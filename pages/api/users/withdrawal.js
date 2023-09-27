import { connectDB } from "../../../util/databaseConnect";
import { ObjectId } from "mongodb";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      let atHeader = req.headers["authorization"];
      let acToken = atHeader.substr(7);
      let decoding = JSON.stringify(jwt.decode(acToken).id);
      let decodeId = JSON.parse(decoding);

      let db = (await connectDB).db("onehour");
      let userCheck = await db
        .collection("userAccount")
        .find({ _id: new ObjectId(decodeId) });

      if (userCheck === null) {
        return res.status(403).json("요청에 대한 권한이 없습니다");
      }

      // 1. 해당 유저의 게시믈 삭제
      await db.collection("userPosts").delete({ email: userCheck.email });

      // 2. 해당 유저의 챌린지 기록 삭제
      await db.collection("userChallenges").delete({ email: userCheck.email });

      // 3. 계정정보 삭제
      await db.collection("userAccount").delete({ email: userCheck.email });

      return res.status(200).json("회원 탈퇴가 완료되었습니다");
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
    // 회원 탈퇴 하려는 현재 유저가 로그인 중인지 확인 - AC 토큰
  } else {
    return res.status(405).json("허용되지 않는 요청 메소드입니다");
  }
}
