"use client";

import { useState } from "react";
import axios from "axios";
import { onLogout } from "../../util/onLogout";

const Example = () => {
  const [postInfo, setPostInfo] = useState<object>({
    postTitle: "",
    postContent: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Input 필드의 값이 변경되면 실행될 onChange 함수
    const newPostInfo = {
      ...postInfo, // 기존값 복사 (spread operator)
      [e.target.name]: e.target.value, // 값 덮어쓰기
    };
    setPostInfo(newPostInfo);
  };
  const sendPost = () => {
    axios
      .post("/api/challengers", postInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ height: "200vh" }}>
      <button
        onClick={() => {
          onLogout();
        }}>
        로그아웃
      </button>
      <input
        onChange={onChange}
        name="postTitle"
        type="text"
        placeholder="제목을 입력"></input>
      <input
        onChange={onChange}
        type="text"
        name="postContent"
        placeholder="본문을 입력"></input>
      <button
        onClick={() => {
          sendPost();
        }}>
        작성하기
      </button>
      <button>취소하기</button>
    </div>
  );
};

export default Example;
