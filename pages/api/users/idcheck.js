import { connectDB } from "../../../util/databaseConnect";
import { ObjectId } from "mongodb";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "POST") {
    let inputEmail = req.body.email;
    let db = (await connectDB).db("onehour");
    let result = await db.collection("userAccount").findOne({ email : inputEmail });

    if (result !== null) {
      return res.status(409).json("이미 가입되어 있는 이메일입니다");
    }

    return res.status(200).json("사용 가능한 이메일입니다");
  } else {
    return res.status(403).json("허용되지 않는 요청 메소드입니다");
  }
}
