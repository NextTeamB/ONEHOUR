import { ObjectId } from "mongodb";
import { connectDB } from "../../../util/databaseConnect";
const jwt = require("jsonwebtoken");

export default async function hanlder(req, res) {
  if (req.method === "PATCH") {
    try {
      // jwt 토큰 디코드 하여 현재 유저 확인
      let atHeader = req.headers["authorization"];
      let acToken = atHeader.substr(7);
      let decoding = JSON.stringify(jwt.decode(acToken).id);
      let decodeId = JSON.parse(decoding);

      const { profileImgUrl, ...editInfo } = req.body;

      let db = (await connectDB).db("onehour");
      let userCheck = await db
        .collection("userAccount")
        .findOne({ _id: new ObjectId(decodeId) });

      if (userCheck === null) {
        return res.status(403).json("요청에 대한 권한이 없습니다");
      }

      await db.collection("userAccount").updateOne(
        { _id: new ObjectId(decodeId) },
        // userAccount 컬렉션에 프로필 url 필드 이름 이렇게 만들으셈
        { $set: { profileImgUrl: profileImgUrl } }
      );
      return res.status(200).json("프로필 변경이 완료되었습니다");
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else if (req.method === "DELETE") {
    try {
      // jwt 토큰 디코드 하여 현재 유저 확인
      let atHeader = req.headers["authorization"];
      let acToken = atHeader.substr(7);
      let decoding = JSON.stringify(jwt.decode(acToken).id);
      let decodeId = JSON.parse(decoding);

      const defaultImgUrl = process.env.DEFAULT_PROFILE_IMG_URL;

      let db = (await connectDB).db("onehour");
      let userCheck = await db
        .collection("userAccount")
        .findOne({ _id: new ObjectId(decodeId) });

      if (userCheck === null) {
        return res.status(403).json("요청에 대한 권한이 없습니다");
      }

      await db.collection("userAccount").updateOne(
        { _id: new ObjectId(decodeId) },
        // userAccount 컬렉션에 프로필 url 필드 이름 이렇게 만들으셈
        { $set: { profileImgUrl: defaultImgUrl } }
      );
      return res.status(200).json("프로필 변경이 완료되었습니다");
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else {
    return res.status(405).json("허용되지 않은 메소드 요청입니다");
  }
}
