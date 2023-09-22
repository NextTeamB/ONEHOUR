import { connectDB } from "../../util/databaseConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let db = (await connectDB).db("onehour");
      let result = await db
        .collection("userAccount")
        .find()
        .sort({ totalChallenge: -1 })
        .toArray();
      return res.status(200).json(result);
    } catch {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else {
    return res.status(405).json("허용되지 않는 요청 메소드입니다");
  }
}
