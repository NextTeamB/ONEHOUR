import type { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";

type Data = {
  id: number;
  name: String;
  nickname: string;
  phonenumber: string;
  agreement: boolean;
};

const userData = [
  {
    id: 1,
    name: "유재석",
    nickname: "목이긴기린",
    phonenumber: "01056542222",
    agreement: true,
  },
  {
    id: 2,
    name: "정형돈",
    nickname: "천사피그",
    phonenumber: "01011345555",
    agreement: true,
  },
  {
    id: 3,
    name: "노홍철",
    nickname: "옐로홀스",
    phonenumber: "01091836726",
    agreement: true,
  },
  {
    id: 4,
    name: "황광희",
    nickname: "페이퍼돌",
    phonenumber: "01088273912",
    agreement: false,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  // res.status(200).json([]);
  if (req.method === "GET") {
    return res.status(200).json(userData);
  } else if (req.method === "POST") {
    userData.push(req.body);
    return res.status(200).json(userData);
  }
}
