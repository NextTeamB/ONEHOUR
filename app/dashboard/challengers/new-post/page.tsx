"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styles from "./new-post.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import close from "../../../../public/closeicon.png";
import { sendPostData } from "../../../../util/onNewPost";
import imageUpload from "../../../../public/imageUpload.png";
import circleRight from "../../../../public/circleRight.png";
import { onImageUpload } from "../../../../util/onImageUpload";

interface PostInfo {
  postTitle: string;
  postContent: string;
  postImgUrl: string;
}

const NewPost = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(true);
  const [postInfo, setPostInfo] = useState<PostInfo>({
    postTitle: "",
    postContent: "",
    postImgUrl: "",
  });

  const postImgInputRef = useRef<HTMLInputElement | null>(null);
  const [trimedFileName, setTrimedFileName] = useState("");
  const [postImg, setPostImgUrl] = useState("");

  const onUploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    if (e.target.name == "postImgInput") {
      onImageUpload(file, "post", setPostImgUrl);
    }
  };

  useEffect(() => {
    console.log({ postImg });
    let trimFilename = postImg.split("/");
    setTrimedFileName(trimFilename[trimFilename.length - 1]);
    console.log(trimedFileName);
    setPostInfo({ ...postInfo, postImgUrl: postImg });
    console.log(postImg);
    setButtonClicked(true);
  }, [postImg]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      sendPostData(postInfo, router);
    }
  };

  const onUploadImgButtonClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (!ref.current) {
      return;
    }
    ref.current.click();
  };

  return (
    <div className={styles.upper}>
      <input
        type="file"
        name="postImgInput"
        accept="image/*"
        ref={postImgInputRef} // inputRef로 접근할 수 있도록 ref 지정
        onChange={onUploadImg}
        style={{ display: "none" }} // input 요소는 원하는대로 스타일링을 하는 것이 제한적이므로 이를 숨기고 따로 생성한 이미지 업로드 버튼 클릭 이벤트를 통해 이미지 업로드 구현
      />
      <div className={styles.title}>새로운 게시글을 작성합니다</div>
      <div className={styles.title_sub}>
        커뮤니티 수칙을 위반한 내용의 게시물은 고지 없이 삭제될 수 있으며, 위반
        시 법적 책임의 소지가 있음을 알립니다
      </div>
      <hr className={styles.underline1} />
      <div className={styles.postBox}>
        <input
          onChange={onChange}
          name="postTitle"
          type="text"
          placeholder="제목을 입력하세요"
        ></input>
        <textarea
          onChange={onChange}
          name="postContent"
          placeholder="본문을 입력하세요"
        ></textarea>
        <div className={styles.imgWrapper}>
          <p>파일 크기는 10MB를 초과할 수 없습니다</p>
          <h4 className={styles.fileName}>{trimedFileName}</h4>

          <button
            onClick={() => {
              onUploadImgButtonClick(postImgInputRef);
            }}
          >
            <Image
              src={imageUpload}
              alt="imageupload"
              className={styles.imageUp}
            />
          </button>
        </div>
        {buttonClicked ? (
          <div className={styles.buttonWrapper}>
            <button
              onClick={() => {
                cancelPost();
              }}
            >
              나가기
            </button>
            <button
              onClick={() => {
                setButtonClicked(false);
                sendPost();
              }}
            >
              작성하기
              <Image
                src={circleRight}
                alt="circleRight"
                className={styles.circleRight}
              />
            </button>
          </div>
        ) : (
          <p className={styles.empty}>작성중입니다</p>
        )}

        {showModal && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <div className={styles.modalTop}>
                <Image
                  onClick={closeModal}
                  src={close}
                  alt="close"
                  className={styles.closeIcon}
                />
              </div>
              <div className={styles.modalText}>
                <h3>게시글 작성을 취소하시겠습니까?</h3>
                <p>작성 중인 내용은 저장되지 않습니다.</p>
              </div>
              <button onClick={confirmCancel} className={styles.cancelBtn}>
                작성취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPost;
