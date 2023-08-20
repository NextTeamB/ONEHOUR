import { connectDB } from "../../../util/databaseConnect";
const jwt = require("jsonwebtoken");
require("dotenv").config();
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let { email, password, nickname, name, ...userData } = req.body;
      let db = (await connectDB).db("onehour");
      let result = await db.collection("userAccount").findOne({ email });

      if (!result) {
        let signUpUser = {
          email: email,
          nickname: nickname,
          name: name,
          password: password,
          refreshToken: ``,
        };
        await db.collection("userAccount").insertOne(signUpUser);
        let result2 = await db.collection("userAccount").findOne({ email });
        // json web token 으로 변환할 데이터 정보
        const payload = { id: result2._id };
        // Cookie 에 담길 리프레시 토큰 생성
        // let SECRET_KEY = process.env.SECRET_KEY;
        const SECRET_KEY = process.env.SECRET_KEY;
        jwt.sign(
          payload, // 변환할 데이터
          SECRET_KEY, // secret key 값
          { expiresIn: "14d" }, // token의 유효시간
          async (err, token) => {
            if (err) throw err;
            await db.collection("userAccount").updateOne(
              {
                email: email,
              },
              { $set: { refreshToken: `${token}` } }
            );
            // db.collection("userAccount").findOne({ email });
            return res.status(200).json(token);
          }
        );
      } else {
        return res.status(409).json("이미 등록된 회원입니다");
      }

      // 리프레시 토큰 생성해줘야함
      // 이미 이메일이 디비상에 있으면 에러처리 후
      // 리다이렉션으로 로그인 페이지 (client)
    } catch (err) {
      return res.status(500).json("요청이 정상적으로 처리되지 않았습니다");
    }
  }
}
