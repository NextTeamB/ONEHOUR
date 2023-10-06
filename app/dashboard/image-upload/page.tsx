"use client";
import axios from "axios";
import { useRef, useCallback } from "react";

const imageUpload = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        // 파일이 첨부되지 않았다면 return
        return;
      }
      const formData = new FormData(); // 이미지를 저장하기 위한 FormData 생성
      formData.append("image", e.target.files[0]); // Input에 첨부된 이미지를 받아와 formData에 저장
      axios
        .post("/api/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // formData를 전송하기 위해 헤더에 Content-Type을 지정
          },
        })
        .then(() => {
          console.log(formData.get("image"));
        })
        .catch((err) => {
          console.log(err);
          console.log(formData.get("image"));
        });
    },
    []
  );
  const onUploadImageButtonClick = () => {
    // 이미지 업로드 버튼을 누르면 input 요소를 클릭한 것과 동일하게 작동하도록 하는 함수.
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef} // inputRef로 접근할 수 있도록 ref 지정
        onChange={onUploadImage}
        style={{ display: "none" }} // input 요소는 원하는대로 스타일링을 하는 것이 제한적이므로 이를 숨기고 따로 생성한 이미지 업로드 버튼 클릭 이벤트를 통해 이미지 업로드 구현
      />
      <div onClick={() => onUploadImageButtonClick()}>이미지 업로드</div>
    </>
  );
};
export default imageUpload;
