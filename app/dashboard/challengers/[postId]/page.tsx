"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import React from "react";
import styles from "./postId.module.scss";
import Image from "next/image";
import backArrow from "../../../../public/backArrow.png";
import { RootState } from "@/store/store";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export interface postInfo {
  email: string;
  title: string;
  content: string;
  nickname: string;
  date: string;
  postImgUrl: string;
}

type Union = string | null;

export default function PostId({ params }: { params: { postId: number } }) {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.user);
  const BASE_POST_IMG_URL = `${process.env.DEFAULT_POST_IMG_URL}`;
  let [postList, setPostList] = useState<postInfo[]>([]);

  useEffect(() => {
    console.log(params.postId);
    axios
      .get("/api/challengers/postId", { params: { postId: params.postId } })
      .then((res) => {
        setPostList([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {postList[0] ? (
        <div className={styles.upperSection}>
          <div className={styles.titleSection}>
            {postList[0] ? (
              <>
                <h2>{postList[0].title}</h2>
                <p>{postList[0].date}</p>
              </>
            ) : (
              "게시글 정보 없음"
            )}
            {postList[0].email === userInfo.email ? (
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  axios
                    .delete("/api/challengers/postId", {
                      params: { postId: params.postId },
                    })
                    .then((res) => {
                      alert("게시글이 삭제되었습니다");
                      router.push("/dashboard/challengers");
                    })
                    .catch((err) => {
                      alert("작성자 본인만 게시글을 삭제할 수 있습니다");
                    });
                }}
              >
                삭제하기
              </button>
            ) : (
              <></>
            )}

            <div className={styles.backBtnArea}>
              <button
                className={styles.backBtn}
                onClick={() => {
                  router.back();
                }}
              >
                <Image
                  src={backArrow}
                  alt="backArrow"
                  className={styles.backArrow}
                />
                목록으로
              </button>
            </div>
          </div>
          <hr />
          <div className={styles.articleSection}>
            {postList[0].postImgUrl ===
            String(process.env.NEXT_PUBLIC_DEFAULT_POST_IMG_URL) ? (
              <></>
            ) : (
              <div className={styles.imgBox}>
                <img
                  src={postList[0].postImgUrl}
                  alt="postImg"
                  className={styles.postImg}
                />
              </div>
            )}
            <div className={styles.articleBox}>
              <p>{postList[0].content}</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
