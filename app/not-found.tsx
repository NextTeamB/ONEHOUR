"use client";

import { useEffect } from "react";
import notfound from "@/public/not-found.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/login"), 1500);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={notfound} alt="notfound" height={404} />
    </div>
  );
}
