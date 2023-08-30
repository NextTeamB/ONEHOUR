"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./challengers.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import userIcon from "../../../public/user-icon-box.png";

export interface postInfo {
  email: string;
  postId: number;
  title: string;
  date: string;
  content: string;
  nickname: string;
}

const Challengers = () => {
  const [postList, setPostList] = useState<postInfo[]>([]);
  const [modalUp, setModalUp] = useState(0);
  const [currnetIdx, setCurrentIdx] = useState(0);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("/api/challengers")
      .then((res) => {
        setPostList([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePost = (postId: number) => {
    axios
      .delete(`/api/challengers/${postId}`)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          axios
            .get("/api/challengers")
            .then((res) => {
              setPostList([...res.data]);
              alert("게시글이 정상적으로 삭제되었습니다");
            })
            .catch((err) => {
              console.log("연결이 원활하지 않습니다");
            });
        }, 500);
        setModalUp(0);
      })
      .catch((err) => {
        console.log(err);
        alert("삭제 권한이 없습니다");
      });
  };

  // useEffect(() => {
  //   console.log(postList);
  // }, [postList]);

  return (
    <div className={styles.upper}>
      <div className={styles.titleSec}>
        <h3>챌린저스</h3>
        <p>다른 유저들의 원아워 챌린지를 확인하며 소통해보세요</p>
      </div>
      <div className={styles.postWrapper}>
        <div className={styles.postBox}>
          <button
            onClick={() => {
              router.push("/dashboard/challengers/new-post");
            }}
            className={styles.newpostBtn}
          >
            <div className={styles.plusWrap}>+</div>
          </button>
            <p className={styles.newpostText}>새로운 게시글을 작성해주세요.</p>
        </div>
        {postList.map((a, i) => {
          return (
            <>
              <div
                onClick={() => {
                  setModalUp(1);
                  setCurrentIdx(postList.indexOf(a));
                }}
                className={styles.postBox}
                key={i}
              >
                <div className={styles.postUser}>
                  <Image src={userIcon} alt="userIcon" className={styles.userIcon} />
                  <p className={styles.nickWrap}>
                    <span>{postList[i].nickname}</span>
                    <span>님</span>
                  </p>
                </div>
                <div className={styles.postContainer}>
                  <h4 key={`title${i}`} className={styles.postTitle}>
                    {postList[i].title}
                  </h4>
                  <br />
                  <p key={`date${i}`} className={styles.postDate}>
                    {postList[i].date}
                  </p>
                  <br />
                  <p key={`content${i}`} className={styles.postContent}>
                    <span>{postList[i].content}</span>
                  </p>
                </div>                
              </div>
            </>
          );
        })}
      </div>
      {modalUp === 1 && (
        <div className={styles.modalBackdrop}>
          <div
            key={"modal" + `${currnetIdx}`}
            className={styles[`modal${modalUp}`]}
          >
            <h3>{postList[currnetIdx] ? postList[currnetIdx].title : ""}</h3>
            <p>{postList[currnetIdx] ? postList[currnetIdx].content : ""}</p>
            <div className={styles.postBottom}>
              <div className={styles.userWrap}>
                <Image src={userIcon} alt="userIcon" className={styles.userIcon} />
                <div className={styles.nickWrap}>
                  <span>{postList[currnetIdx] ? postList[currnetIdx].nickname : ""}</span>
                  <span>님</span>
                </div>
                <p className={styles.postDate}>{postList[currnetIdx] ? postList[currnetIdx].date : ""}</p>
              </div>
              <div className={styles.btnWrap}>
                <button
                  onClick={() => {
                    setModalUp(0);
                  }}
                >
                  뒤로가기
                </button>
                <button
                  onClick={() => {
                    deletePost(postList[currnetIdx].postId);
                  }}
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challengers;
