// 여기서 get 하고 delete 짜면 됨
import { connectDB } from "../../../util/databaseConnect";
import { ObjectId } from "mongodb";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      // 1. DELETE 요청 이후 화면 재랜더링이 안일어남 -> GET으로 처리해야하나... return 으로 해야하나...
      const url = req.url;
      const splitUrl = url.split("/");
      const location = splitUrl[splitUrl.length - 1];
      const reqPostId = parseInt(location);

      // 1. 헤더에 있는 엑세스토큰을 디코드하여 현재 로그인 중인 유저 ID를 얻음
      let atHeader = req.headers["authorization"];
      let acToken = atHeader.substr(7);

      //   let acToken =
      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTBkMmIwNGM5NGE2OWFjZjZkNmZjZiIsImlhdCI6MTY5MjcwMzUwMiwiZXhwIjoxNjkyNzA3MTAyfQ.3JpvObiA6N5gMudTmZ74MvtiAHUvJ-TsrUBwSmFRVTs";
      let decoding = JSON.stringify(jwt.decode(acToken).id);
      let decodeId = JSON.parse(decoding);

      // 2. 해당 postId 가 userPosts 에 있는지 확인
      let db = (await connectDB).db("onehour");
      let userPosts = await db
        .collection("userPosts")
        .findOne({ postId: reqPostId });
      //   return res.status(200).json(userPosts);
      // 3. postId에 해당하는 email 과 decode 한 id 값으로 userAccount 에서 찾은 email 이 같은지 비교
      let userEmail = await db
        .collection("userAccount")
        .findOne({ _id: new ObjectId(decodeId) });

      // 두 이메일이 같지 않으면 글 작성자가 아니거나 글을 작성한 적이 없음
      if (userPosts.email !== userEmail.email) {
        return res.status(403).json("요청에 대한 권한이 없습니다");
      }

      await db.collection("userPosts").deleteOne({ postId: reqPostId });
      return res.status(200).json("게시물 삭제가 완료되었습니다");
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  }
}
