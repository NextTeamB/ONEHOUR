"use client";
import { useEffect, useRef, useState } from "react";
import { onImageUpload } from "@/util/onImageUpload";

const imageUpload = () => {
  const profileImgInputRef = useRef<HTMLInputElement | null>(null);
  const challengersImgInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImg, setProfileImgUrl] = useState("");
  const [challengersImg, setChallengersImgUrl] = useState("");
  const onUploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      // 파일이 첨부되지 않았다면 return
      return;
    }
    let file = e.target.files[0];
    if (e.target.name == "profileImgInput") {
      onImageUpload(file, "profile", setProfileImgUrl);
    } else {
      onImageUpload(file, "challengers", setChallengersImgUrl);
    }
  };

  useEffect(() => {
    console.log({ profileImg, challengersImg });
  }, [profileImg, challengersImg]);

  const onUploadImgButtonClick = (ref: React.RefObject<HTMLInputElement>) => {
    // 이미지 업로드 버튼을 누르면 input 요소를 클릭한 것과 동일하게 작동하도록 하는 함수.
    if (!ref.current) {
      return;
    }
    ref.current.click();
  };
  return (
    <>
      <input
        type="file"
        name="profileImgInput"
        accept="image/*"
        ref={profileImgInputRef} // inputRef로 접근할 수 있도록 ref 지정
        onChange={onUploadImg}
        style={{ display: "none" }} // input 요소는 원하는대로 스타일링을 하는 것이 제한적이므로 이를 숨기고 따로 생성한 이미지 업로드 버튼 클릭 이벤트를 통해 이미지 업로드 구현
      />
      <input
        type="file"
        accept="image/*"
        name="challengersImgInput"
        ref={challengersImgInputRef} // inputRef로 접근할 수 있도록 ref 지정
        onChange={onUploadImg}
        style={{ display: "none" }}
      />
      <div onClick={() => onUploadImgButtonClick(profileImgInputRef)}>
        프로필 이미지 업로드
      </div>
      <img src={profileImg} />
      <div onClick={() => onUploadImgButtonClick(challengersImgInputRef)}>
        게시판 이미지 업로드
      </div>
      <img src={challengersImg} />
    </>
  );
};
export default imageUpload;
