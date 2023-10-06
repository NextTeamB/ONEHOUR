import { connectDB } from "../../util/databaseConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let db = (await connectDB).db("onehour");
      let result = await db
        .collection("userAccount")
        .find()
        .skip(3)
        .limit(10)
        .sort({ totalChallenge: -1 })
        .toArray();

      let top3data = await db
        .collection("userAccount")
        .find()
        .limit(3)
        .sort({ totalChallenge: -1 })
        .toArray();

      let dataset = [result, top3data];
      return res.status(200).json(dataset);
    } catch (err) {
      return res.status(500).json("서버에러가 발생하였습니다");
    }
  } else if (req.method === "POST") {
  } else {
    return res.status(405).json("허용되지 않는 요청 메소드입니다");
  }
}
