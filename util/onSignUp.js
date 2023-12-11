import axios from "axios";
import crypto from "crypto";

export const onSignUp = (userInfo, router) => {
  let newUserInfo = {
    ...userInfo,
    // 비밀번호 암호화 로직
    password: crypto
      .createHash("sha256")
      .update(userInfo.passwordConfirm)
      .digest("hex"),
  };
  delete newUserInfo.passwordConfirm;
  axios
    .post("/api/users/sign-up", newUserInfo)
    .then((res) => {
      router.push("/login");
      console.log(res);
      setSignupModalState(1); // 회원가입이 성공하면 상태를 1로 업데이트
    })
    .catch((err) => {
      console.log(err);
    });
};
