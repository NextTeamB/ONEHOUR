// 엑세스 토큰을 다시 발행해주는 서버파일 로직

// 리 이슈 토큰 뭐 새로고침이나 엑세스토큰이 만료되었을 때 그 때만 서버에서는 쿠키 까가지고
// 리 이슈 요청을 받았을 때 리프레시토큰이랑 엑세스토큰도 까서 같은 디비 컬렉션에 있냐를 비교
// 그게 맞으면 새로운 엑세스 토큰을 발급을 해줄거야

// 엑세스 토큰이 만료되기 전에 클라이언트에서 서버로 리이슈 토큰 요청을 보냄 "엑세스 만료될거임 다시 내놔"
// 서버에서는 엑세스토큰하고 리프레시토큰을 같이 받음
// 현재 쿠키에 저장된 리프레시 토큰하고 데이터베이스에 초반에 저장된 리프레시토큰하고 토큰하고 비교를 함
// 그게 같으면 디비에서 유저 ID 를 따와서 엑세스 토큰 디코딩한 ID랑 비교함
// 너맞구나 새로운 엑세스 토큰 줄게

import axios from "axios";
import { connectDB } from "../../../util/databaseConnect";
const jwt = require("jsonwebtoken");
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let cookie = req.headers.cookie;
      let rfToken = cookie.substr(13);
      let atHeader = req.headers["authorization"];
      let acToken = atHeader.substr(7);

      if (cookie) {
        let db = (await connectDB).db("onehour");
        let result = await db
          .collection("userAccount")
          .findOne({ refreshToken: rfToken });

        const userId = JSON.stringify(result._id);
        const decodeId = JSON.stringify(jwt.decode(acToken).id);

        if (userId === decodeId) {
          const payload = { id: result._id };
          const SECRET_KEY = process.env.SECRET_KEY;
          const newAcToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
          res.setHeader("authorization", `Bearer ${newAcToken}`);
          return res.status(200).json("토큰 재발급 완료");
        }
        return res.status(403).json("요청에 대한 권한이 없습니다");
      }
    } catch (err) {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  }
}
