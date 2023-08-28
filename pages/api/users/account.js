import { connectDB } from "../../../util/databaseConnect";
import { ObjectId } from "mongodb";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "GET") {
    let atHeader = req.headers["authorization"];
    let acToken = atHeader.substr(7);
    let decoding = JSON.stringify(jwt.decode(acToken).id);
    let decodeId = JSON.parse(decoding);

    let db = (await connectDB).db("onehour");
    let userCheck = await db
      .collection("userAccount")
      .findOne({ _id: new ObjectId(decodeId) });

    if (userCheck === null) {
      return res.status(403).json("요청에 대한 권한이 없습니다");
    }
    let resBody = {
      email: userCheck.email,
      nickname: userCheck.nickname,
      name: userCheck.name,
    };
    return res.status(200).json(resBody);
  } else {
    return res.status(405).json("허용되지 않는 요청 메소드입니다");
  }
}
