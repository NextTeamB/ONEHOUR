"use client";

import { useRef } from "react";
import styles from "./challengers.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import userIcon from "../../../public/user-icon-box.png";
import {} from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useObserver } from "@/components/IntersectionObserver";
import React from "react";

const LIMIT = 4; // 변경 용이하게 offset을 상수로 설정

export interface postInfo {
  email: string;
  postId: number;
  title: string;
  date: string;
  content: string;
  nickname: string;
}

const Challengers = () => {
  // const [postList, setPostList] = useState<postInfo[]>([]);
  // const [modalUp, setModalUp] = useState(0);
  // const [currnetIdx, setCurrentIdx] = useState(0);
  const router = useRouter();
  // useEffect(() => {
  //   fetchData(setPostList, setModalUp);
  // }, []);

  let isLastPage = false;
  const getChallengersList = async (
    { pageParam = 0 } // getPokemonList의 인자인 pageParam의 초깃값 설정
  ) => {
    if (isLastPage) return;
    const res = await axios.get("/api/challengers", {
      params: { limit: LIMIT, offset: pageParam },
    });
    if (res.data.hasNextPage == false) isLastPage = true;
    return res.data;
  };

  const target = useRef<HTMLDivElement>(null);
  // 바닥 ref를 위한 useRef 선언

  const {
    data, // data.pages를 갖고 있는 object (data.pages 안에는 posts와 offset 존재 )
    error,
    fetchNextPage, //  다음 페이지를 불러오는 함수
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    "challengersList", // data 이름
    getChallengersList, // fetch 콜백, 위 data를 불러올 함수
    {
      getNextPageParam: (lastPage) => {
        // 무한 스크롤의 핵심. 여기서 nextPage 값이 존재하지 않으면 리턴 값 없음. nextPage 값 존재 시 Number 리턴, getChallengersList의 인자로 pageParam(=Number) 전달

        if (lastPage.hasNextPage) {
          return Number(lastPage.offset);
        }
      },
    }
  );
  const onIntersect = (entry: { isIntersecting: any }[]) => {
    if (entry[0].isIntersecting) {
      fetchNextPage(); // 화면과 IntersectionObserver 요소가 교차하면 fetchNextPage 실행 ( )
    }
  };
  useObserver({ target: target, onIntersect });

  // const deletePost = (postId: number) => {
  //   deletePostData(postId, setPostList, setModalUp);
  // };

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
            className={styles.newpostBtn}>
            <div className={styles.plusWrap}>+</div>
          </button>
          <p className={styles.newpostText}>새로운 게시글을 작성해주세요</p>
        </div>
        {status === "success" &&
          data.pages.map((group, index) => (
            // pages들이 페이지 숫자에 맞춰서 들어있기 때문에
            // group을 map으로 한번 더 돌리는 이중 배열 구조이다.
            <React.Fragment key={index}>
              {group.posts.map((post: postInfo) => (
                <>
                  <div
                    // onClick={() => {
                    //   setModalUp(1);
                    //   setCurrentIdx(postList.indexOf(a));
                    // }}
                    className={styles.postBox}
                    key={post.postId}>
                    <div className={styles.postUser}>
                      <Image
                        src={userIcon}
                        alt="userIcon"
                        className={styles.userIcon}
                      />
                      <p className={styles.nickWrap}>
                        <span>{post.nickname}</span>
                        <span>님</span>
                      </p>
                    </div>
                    <div className={styles.postContainer}>
                      <h4 className={styles.postTitle}>{post.title}</h4>
                      <br />
                      <p className={styles.postDate}>{post.date}</p>
                      <br />
                      <p className={styles.postContent}>
                        <span>{post.content}</span>
                      </p>
                    </div>
                  </div>
                  {/* <div
                    key={post.postId}
                    style={{
                      height: "500px",
                    }}>
                    {post.title}
                  </div> */}
                </>
              ))}
            </React.Fragment>
          ))}
        <div ref={target} />
        {isFetchingNextPage && <p>계속 불러오는 중</p>}
      </div>
      {/* {modalUp === 1 && (
        <div className={styles.modalBackdrop}>
          <div
            key={"modal" + `${currnetIdx}`}
            className={styles[`modal${modalUp}`]}>
            <h3>{postList[currnetIdx] ? postList[currnetIdx].title : ""}</h3>
            <p>{postList[currnetIdx] ? postList[currnetIdx].content : ""}</p>
            <div className={styles.postBottom}>
              <div className={styles.userWrap}>
                <Image
                  src={userIcon}
                  alt="userIcon"
                  className={styles.userIcon}
                />
                <div className={styles.nickWrap}>
                  <span>
                    {postList[currnetIdx] ? postList[currnetIdx].nickname : ""}
                  </span>
                  <span>님</span>
                </div>
                <p className={styles.postDate}>
                  {postList[currnetIdx] ? postList[currnetIdx].date : ""}
                </p>
              </div>
              <div className={styles.btnWrap}>
                <button
                  onClick={() => {
                    setModalUp(0);
                  }}>
                  뒤로가기
                </button>
                <button
                  onClick={() => {
                    deletePost(postList[currnetIdx].postId);
                  }}>
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Challengers;
