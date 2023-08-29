"use client";

import axios from "axios";
import { useState } from "react";
import { onLogout } from "../../../../util/onLogout";
import styles from "./new-post.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import close from "../../../../public/close-icon.png";

interface PostInfo {
  postTitle: string;
  postContent: string;
}

const NewPost = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [postInfo, setPostInfo] = useState<PostInfo>({
    postTitle: "",
    postContent: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Input 필드의 값이 변경되면 실행될 onChange 함수
    const newPostInfo: PostInfo = {
      ...postInfo, // 기존값 복사 (spread operator)
      [e.target.name]: e.target.value, // 값 덮어쓰기
    };
    setPostInfo(newPostInfo);
  };
  
  const cancelPost = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmCancel = () => {
    closeModal();
    router.push("/dashboard/challengers");
  };

  const sendPost = () => {
    if (!postInfo.postTitle || !postInfo.postContent) {
      alert("제목과 내용을 모두 입력해주세요.");
    } else {
      axios
        .post("/api/challengers", postInfo)
        .then((res) => {
          console.log(res);
          router.push("/dashboard/challengers");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.upper}>
      <div className={styles.title}>게시글 작성하기</div>
      <div className={styles.title_sub}>
        커뮤니티 수칙에 위반되는 부적절한 언어사용 및 내용 작성은
        자제해주시기 바라며 위반 시 정책에 따라 조치됩니다.
      </div>
      <div className={styles.postBox}>
        <input
          onChange={onChange}
          name="postTitle"
          type="text"
          placeholder="제목을 입력하세요"></input>
        <textarea
          onChange={onChange}
          name="postContent"
          placeholder="본문을 입력하세요"></textarea>
        <div className={styles.buttonWrapper}>
          <button
            onClick={() => {
              cancelPost();
            }}>
            취소하기
          </button>
          <button
            onClick={() => {
              sendPost();
            }}>
            작성하기
          </button>
        </div>
        {showModal && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <div className={styles.modalTop}>
                <Image onClick={closeModal} src={close} alt="close" className={styles.closeIcon} />  
              </div>
              <div className={styles.modalText}>
                <h3>게시글 작성을 취소하시겠습니까?</h3>
                <p>작성 중인 내용은 저장되지 않습니다.</p>
              </div>
              <button onClick={confirmCancel} className={styles.cancelBtn}>작성취소</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPost;
 