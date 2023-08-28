const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let SECRET_KEY = process.env.SECRET_KEY;
      let cookie = await req.headers.cookie;
      let rfToken = cookie.substr(13);
      jwt.verify(rfToken, SECRET_KEY, async function (err, decoded) {
        if (err) return res.status(200).json(err.name);
        else return res.status(200).json("refreshToken is Valid");
      });
    } catch {
      return res.status(500).json("서버 에러");
    }
  } else {
    return res.status(405).json("허용되지 않는 요청 메소드입니다");
  }
}
