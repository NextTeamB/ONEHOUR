import axios from "axios";
import crypto from "crypto";

export const onSignUp = (userInfo, router) => {  
    let newUserInfo = {
      ...userInfo,
      // 비밀번호 암호화 로직
      password: crypto
        .createHash("sha256")
        .update(userInfo.password)
        .digest("hex"),
    };
    axios
      .post("/api/users/sign-up", newUserInfo)
      .then((res) => {
        console.log(res);
        router.push('/login')
      })
      .catch((err) => {
        console.log(err);
      });
  };