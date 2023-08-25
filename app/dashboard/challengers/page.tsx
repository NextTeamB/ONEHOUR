"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./challengers.module.scss";

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
      })
      .catch((err) => {
        console.log(err);
        alert("삭제 권한이 없습니다");
      });
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
  };

  // useEffect(() => {
  //   console.log(postList);
  // }, [postList]);

  return (
    <div className={styles.upper}>
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
              <h4 key={`title${i}`} className={styles.postTitle}>
                {postList[i].title}
              </h4>
              <br />
              <p key={`date${i}`} className={styles.postDate}>
                {postList[i].date}
              </p>
            </div>
          </>
        );
      })}
      <div
        key={"modal" + `${currnetIdx}`}
        className={styles[`modal${modalUp}`]}
      >
        {postList[currnetIdx] ? postList[currnetIdx].content : ""}
        <p>{postList[currnetIdx] ? postList[currnetIdx].nickname : ""}님</p>
        <button
          onClick={() => {
            setModalUp(0);
          }}
        >
          닫기버튼
        </button>
        <button
          onClick={() => {
            deletePost(postList[currnetIdx].postId);
          }}
        >
          삭제버튼
        </button>
      </div>
    </div>
  );
};

export default Challengers;
