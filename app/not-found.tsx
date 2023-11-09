"use client";

import { useEffect } from "react";
import notfound from "@/public/not-found.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import pageImg from "../public/404img.png";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/login"), 1500);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={pageImg} alt="notfound" height={1080} />
      {/* <br />
      <h3>요청하신 페이지를 찾을 수 없습니다</h3>
      <h3>
        올바르지 않은 URL 혹은 접근할 수 없는 페이지로의 접근을 시도하고
        있습니다
      </h3>
      <br />
      <h3>404 PAGE NOT FOUND</h3> */}
    </div>
  );
}
