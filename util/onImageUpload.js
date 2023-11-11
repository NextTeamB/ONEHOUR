"use client";
import axios from "axios";

const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 10 * 1024 * 1024;

const fileSizeValid = (fileSize) => {
  // 파일 사이즈 체크 (10MB 미만의 파일만 업로드 가능)
  if (fileSize > FILE_SIZE_MAX_LIMIT) {
    return false;
  }
  return true;
};
const removeFileName = (originalFileName) => {
  // 확장자 추출 (이미지 파일만 가능)
  // 마지막 .의 위치를 구한다
  // 마지막 .의 위치 다음이 파일 확장자를 의미한다
  const lastIndex = originalFileName.lastIndexOf(".");
  // 파일 이름에서 .이 존재하지 않는 경우(파일 확장자가 존재하지 않는 경우)
  if (lastIndex < 0) {
    return "";
  }
  return originalFileName.substring(lastIndex + 1).toLowerCase();
};

const fileExtensionValid = (originalFileName) => {
  // 파일 확장자 체크
  const extension = removeFileName(originalFileName);
  /**
   * 허용가능한 확장자일 경우
   * extension = ALLOW_FILE_EXTENSION 상수의 해당 확장자 첫 index 위치값 (확장자 위치)
   */
  if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === "") {
    // 해당 if문이 수행되는 조건은
    // 1. 허용하지 않은 확장자일 경우
    // 2. 확장자가 없는 경우
    return false;
  }
  return true;
};

export const onImageUpload = async (file, imgType, setImgUrl) => {
  if (fileExtensionValid(file.name) == false) {
    alert("이미지 파일만 업로드할 수 있습니다.");
    return;
  }
  if (!fileSizeValid(file.size)) {
    e.target.value = "";
    alert("업로드 가능한 최대 파일 크기는 파일 당 10MB입니다.");
    return;
  }

  let fileName = file.name;
  let presignedPost = await axios.post(`/api/image-upload`, {
    fileName,
    imgType,
  }); // Presigned URL을 받아오기 위한 api 요청

  const formData = new FormData();
  // s3 버킷에 업로드하기 위해 response의 fields 및 값을 복사해 formData에 append
  Object.entries({ ...presignedPost.data.fields, file }).forEach(
    ([key, value]) => {
      formData.append(key, value);
    }
  );
  formData.append("Content-Disposition", "inline");
  await axios
    .post(presignedPost.data.url, formData, {
      headers: {
        Authorization: undefined, // s3 버킷 업로드 시에는 Authorization 헤더를 제거해야 함
      },
    })
    .then((res) => {
      setImgUrl(presignedPost.data.url + "/" + imgType + "/" + fileName);
    })
    .catch((err) => console.log(err));
};
