import axios from "axios";
import crypto from "crypto";
// crypto 패키지 사용을 위해 editPassword 메서드를 함수로 분리

export const editPassword = (editInfo, setModalState, setEditInfo) => {
  if (editInfo.password === "") {
    // 변경할 비밀번호를 입력하지 않았을 때 return
    alert("변경할 비밀번호를 입력해주세요.");
    return;
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(editInfo.password)) {
    // 비밀번호 유효성 검사 - 변경할 비밀번호가 규칙에 맞지 않을 때 return
    alert("비밀번호는 숫자+영문자 조합으로 8자리 이상 입력해주세요.");
    return;
  }
  const initialEditInfo = {
    nickname: "",
    password: "",
  };
  let newEditInfo = {
    ...editInfo,
    password: crypto
      .createHash("sha256")
      .update(editInfo.password)
      .digest("hex"),
  };
  axios
    .patch("/api/users/edit-pw", newEditInfo)
    .then((res) => {
      alert("비밀번호 변경이 완료되었습니다");
      setModalState([0, 0, 0]);
      setEditInfo(initialEditInfo);
    })
    .catch((err) => {
      console.log(err);
    });
};
