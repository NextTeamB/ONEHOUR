import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Method GET
  if (req.method === "GET") {
    const db = (await connectDB).db("onehour");
    let result = await db.collection("userAccount").find().toArray();
    return res.status(200).json(result);
  }
  // Method POST
  else if (req.method === "POST") {
    if (req.body.name === "") {
      return res.status(400).json("uncorrectly request");
    }
    // const db = (await connectDB).db("onehour");
    // let result = await db.collection("userAccount").insertOne(req.body);
    // res.status(200).redirect("/");
    try {
      let db = (await connectDB).db("onehour");
      let result = db.collection("userAccount").insertOne(req.body);
      res.status(200).redirect("/");
    } catch (error) {
      return res.status(500).json("Server error");
    }
  }
  // Method DELETE
  else if (req.method === "DELETE") {
  }
}
