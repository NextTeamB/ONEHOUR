"use client";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useObserver } from "./useObserver";

const LIMIT = 4; // 변경 용이하게 offset을 상수로 설정

const InfinityScroll = () => {
  let isLastPage = false;
  const getChallengersList = async (
    { pageParam = 0 } // getPokemonList의 인자인 pageParam의 초깃값 설정
  ) => {
    if (isLastPage) return;
    const res = await axios.get("/api/challengers", {
      params: { limit: 4, offset: pageParam },
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

  return (
    <div>
      {status === "loading" && <p>로드 중</p>}
      {/* {status === "error" && <p>{error.message}</p>} */}
      {status === "success" &&
        data.pages.map((group, index) => (
          // pages들이 페이지 숫자에 맞춰서 들어있기 때문에
          // group을 map으로 한번 더 돌리는 이중 배열 구조이다.
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}>
            {group.posts.map((post) => (
              <>
                <div
                  // onClick={() => {
                  //   setModalUp(1);
                  //   setCurrentIdx(postList.indexOf(a));
                  // }}
                  key={post.postId}
                  style={{
                    height: "500px",
                  }}>
                  <div>
                    <p>
                      <span>{post.nickname}</span>
                      <span>님</span>
                    </p>
                  </div>
                  <div>
                    <h4>{post.title}</h4>
                    <br />
                    <p>{post.date}</p>
                    <br />
                    <p>
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
          </div>
        ))}
      {/* <button onClick={() => fetchNextPage()}>더 불러오기</button> */}
      <div ref={target} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  );
};
export default InfinityScroll;
