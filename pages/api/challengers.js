import { ObjectId } from "mongodb";
import { connectDB } from "../../util/databaseConnect";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);
      let db = (await connectDB).db("onehour");
      // userPosts 컬렉션의 정보를 offset만큼 skip한 후 limit 길이만큼 배열로 가져옴
      let posts = await db
        .collection("userPosts")
        .find()
        .sort({ postId: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .toArray();

      return res.status(200).json({
        posts: posts,
        nextPage: posts.length < limit ? null : page + 1, // 받아온 배열의 길이가 limit보다 짧으면 다음 페이지가 존재하지 않는 것이므로 null 값 전송
      });
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else if (req.method === "POST") {
    try {
      const { postTitle, postContent, ...posts } = req.body;
      // 1. 헤더에 있는 엑세스토큰을 디코드하여 현재 로그인 중인 유저 ID를 얻음
      let atHeader = req.headers["authorization"];
      let acToken = atHeader.substr(7);
      let decoding = JSON.stringify(jwt.decode(acToken).id);
      let decodeId = JSON.parse(decoding);

      // 2. DB에서 헤더를 디코드한 id 를 가지고 있는 유저 필드를 가져옴
      let db = (await connectDB).db("onehour");
      let userCheck = await db
        .collection("userAccount")
        .findOne({ _id: new ObjectId(decodeId) });
      // return res.status(200).json(userCheck);
      if (userCheck === null) {
        return res.status(403).json("요청에 대한 권한이 없습니다");
      }
      // 2-1. counter 컬렉션에서 totalPost를 가져옴
      let countPost = await db
        .collection("counter")
        .findOne({ name: "게시물 갯수" });
      // 3. 게시글 작성 날짜를 위해 현재 년,월,일 저장
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let today = date.getDate();
      // 4. 그 유저 필드의 이메일과 닉네임 + 게시글 제목과 본문 내용 + 날짜 정보를 newPost 변수에 객체로 저장
      let newPost = {
        postId: countPost.totalPost,
        email: userCheck.email,
        nickname: userCheck.nickname,
        title: postTitle,
        content: postContent,
        date: `${year}년 ${month}월 ${today}일`,
      };
      // 5. newPost 객체 DB로 새로 insertOne 처리
      await db.collection("userPosts").insertOne(newPost);
      // 6. counter 컬렉션의 totalPost 를 +1 만큼 증가시킴
      await db
        .collection("counter")
        .updateOne({ name: "게시물 갯수" }, { $inc: { totalPost: 1 } });
      // 완료 응답 리턴
      return res.status(200).json("게시물 작성이 완료되었습니다");
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else {
    return res.status(405).json("허용되지 않는 요청 메소드입니다");
  }
}
