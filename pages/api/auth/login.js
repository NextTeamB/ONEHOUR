import { connectDB } from "../../../util/databaseConnect";
const jwt = require("jsonwebtoken");
import { serialize } from "cookie";
export default async function handler(req, res) {
  // GET 요청 시에 DB 접근 -> try catch 혹은 if 분기로 예외처리 필요
  if (req.method === "GET") {
    try {
      let db = (await connectDB).db("onehour");
      // map 함수 처리를 위해 toArray 처리하여 userAccount 컬렉션의 모든 데이터 들고옴
      let result = await db.collection("userAccount").find().toArray();
      // status(200)으로 json 형식 응답을 res에 담음
      return res.status(200).json(result[0]);
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  }
  // POST 요청 시에 DB 접근
  else if (req.method === "POST") {
    try {
      let { email, password, ...userData } = req.body;
      let db = (await connectDB).db("onehour");
      let result = await db.collection("userAccount").findOne({ email });
      // DB 상에 요청한 이메일이 있는지 확인
      // DB상에 등록되어 있는 이메일이라면 jwt 토큰 생성
      // let user = await result.findOne({ email });

      if (result.email === email && result.password === password) {
        // json web token 으로 변환할 데이터 정보
        const SECRET_KEY = process.env.SECRET_KEY;
        const payload = { id: result._id };
        let rfToken = result.refreshToken; // DB에 저장된 refreshToken 받아옴
        jwt.verify(rfToken, SECRET_KEY, async function (err, decoded) {
          // refreshToken이 만료되었는지 검증
          // 토큰이 만료되었다는 에러가 발생하면 refreshToken을 재생성해 DB에 저장하고 다시 result를 받아오는 로직
          if (err && err.name === "TokenExpiredError") {
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "14d" });
            await db
              .collection("userAccount")
              .updateOne(
                { email: email },
                { $set: { refreshToken: `${token}` } }
              );
            result = await db.collection("userAccount").findOne({ email });
          }
        });
        // json web token 생성하여 send 해주기
        // [1번] -> Access Token
        jwt.sign(
          payload, // 변환할 데이터
          SECRET_KEY, // secret key 값
          { expiresIn: "1h" }, // token의 유효시간
          async (err, token) => {
            if (err) throw err;
            // 데이터베이스에서 가져온 리프레시 토큰값을 쿠키로 설정
            const rfToken = result.refreshToken;
            const cookie = serialize("refreshToken", `${rfToken}`, {
              path: "/",
              httpOnly: true,
              secure: true,
            });
            await res.setHeader("Set-Cookie", cookie);
            await res.setHeader("authorization", `Bearer ${token}`);
            let responseBody = {
              name: result.name,
              nickname: result.nickname,
              email: result.email,
              profileImgUrl:
                result.profileImgUrl || process.env.DEFAULT_PROFILE_IMG_URL, // 프로필 이미지 url이 지정되어 있지 않으면 기본 프로필 이미지 url 반환
            };
            return res.status(200).json(responseBody); // token 값 response 해주기
          }
        );
      } else {
        return res.status(401).json("패스워드가 잘못되었습니다.");
      }
    } catch {
      return res.status(401).json("등록되지 않은 이메일입니다.");
    }
  }
}
