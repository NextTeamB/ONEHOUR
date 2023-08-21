// 로그아웃 처리 로직
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const cookie = serialize("refreshToken", "", {
        path: "/",
        httpOnly: true,
        secure: true,
        maxAge: 0,
      });
      await res.setHeader("Set-Cookie", cookie);
      await res.setHeader("authorization", "");
      return res.status(200).json("로그아웃이 완료되었습니다");
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else {
    return res.status(405).json("Method Not Allowed");
  }
}
