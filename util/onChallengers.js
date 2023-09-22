import axios from "axios";

// 전체 게시물 가져오는 api
export const fetchData = (setPostList, setModalUp) => {
  axios
    .get("/api/challengers")
    .then((res) => {
      setPostList([...res.data]);
    })
    .catch((err) => {
      console.log(err);
    });
  setModalUp(0);
};

// 게시물 삭제 api
export const deletePostData = (postId, setPostList, setModalUp) => {
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