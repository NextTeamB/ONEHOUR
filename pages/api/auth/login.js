import { connectDB } from "../../../util/databaseConnect";
const jwt = require("jsonwebtoken");
import { serialize } from "cookie";
export default async function handler(req, res) {
  // GET 요청 시에 DB 접근 -> try catch 혹은 if 분기로 예외처리 필요
  if (req.method === "GET") {
    let db = (await connectDB).db("onehour");
    // map 함수 처리를 위해 toArray 처리하여 userAccount 컬렉션의 모든 데이터 들고옴
    let result = await db.collection("userAccount").find().toArray();
    // status(200)으로 json 형식 응답을 res에 담음
    return res.status(200).json(result[0]);
  }
  // POST 요청 시에 DB 접근
  else if (req.method === "POST") {
    let { email, password, ...userData } = req.body;
    let db = (await connectDB).db("onehour");
    let result = await db.collection("userAccount").findOne({ email });
    // DB 상에 요청한 이메일이 있는지 확인
    // DB상에 등록되어 있는 이메일이라면 jwt 토큰 생성
    // let user = await result.findOne({ email });
    if (result.email === email) {
      // json web token 으로 변환할 데이터 정보
      const payload = { id: result._id };
      // json web token 생성하여 send 해주기
      // [1번] -> Access Token
      const SECRET_KEY = process.env.SECRET_KEY;
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
          return res.status(200).json(result); // token 값 response 해주기
        }
      );
    } else {
      return res.status(400).json("등록되지 않은 이메일입니다");
    }
  }
}

// 넥스트 auth 를 쓸수밖에없는 이유
// -> 웹 어플리케이션 안에서 로그인을 유지해야만 함

// 엑세스토큰을 가지고 있는 거랑 별개로
// 생각정리중...
// 리프레시 토큰 -> 어떻게 구현함?
// 리프레시 토큰 exprie hour 24h & access token expire hour
// 리프레시 토큰을 서버에 저장해 놓고
// 엑세스 토큰을 리프레시 토큰이랑 서버에서 로그인 할때 같이 내려받는데,
// 서버에서 내려줄 때 리프레시 토큰은 쿠키로 내려줌 (처리해야함 - setCookie)
// 그 쿠키를 서버에서 실어서 클라이언트가 받는 순간 그 쿠키는 처리없이 브라우저에 알아서 저장된다
// 이후에 클라이언트에서 서버로 찌르는 모든 API 요청에 쿠키가 자동으로 실려서 간다
// 클라이언트 단에서 쿠키를 까볼 수 가 없음, 즉 코드를 짤 필요가 업승ㅁ
// 리프레시토큰이 어디에 쓰이길래 저장함? 서버에서 리프레시토큰 까보는 경우 거의 없음

// #feature/#36~~ branch
// 1. add .
// 2. main 브랜치로 옮겨서 origin main pull 해오기
// 3. 다시feature branch 에서 git merge main 후에
// 4. 충돌 잡고
// 5. commit -m
// 6. push 하면 댐
