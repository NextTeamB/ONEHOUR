import axios from "axios";
import { login, getToken } from "@/slices/userSlice";
import crypto from "crypto";
const JWT_EXPIRE_TIME = 60 * 60 * 1000; // JWT 만료 시간을 1시간으로 설정
export function onLogin(requestBody, dispatch, router) {
  let newRequestBody = {
    ...requestBody,
    // 비밀번호 암호화 로직
    password: crypto
      .createHash("sha256")
      .update(requestBody.password)
      .digest("hex"),
  };
  axios
    .post("/api/auth/login", newRequestBody)
    .then((res) => {
      console.log(res);
      dispatch(login(res.data)); // 로그인 시 userSlice의 login 리듀서로 res.data에서 이메일, 이름, 닉네임을 넘겨줌
      dispatch(getToken(res.headers.authorization)); // accessToken은 이후 silentRefresh를 위해 리듀서를 분리함
      // 로그인 후 대시보드에서 새로고침 시 onLogin 함수는 이미 실행 완료된 상황이므로 onLoginSuccess 함수 또한 실행되지 않음
      // onLoginSuccess 삭제 -> 내비게이터에서 reissueToken으로 silent Refresh 수행하도록 변경
      router.push("/dashboard");
    })
    .catch((err) => {
      alert(err.response.data);
    });
}

const onSilentRefresh = async () => {
  await axios
    .get("/api/auth/refresh")
    .then((res) => {
      axios.defaults.headers.common["authorization"] =
        res.headers.authorization;
      setTimeout(onSilentRefresh, JWT_EXPIRE_TIME - 10000); // JWT가 만료되기 10초 전에 accessToken을 재발급
    })
    .catch((err) => {
      console.log(err);
    });
};

export const reissueToken = (accessToken) => {
  // 로그인 후 새로고침하면 silentRefresh가 일어나지 않음,
  // -> reissueToken을 네비게이터에서 실행하여 토큰 재발급 실행
  if (accessToken !== null && accessToken.slice(0, 6) === "Bearer") {
    axios.defaults.headers.common["Authorization"] = accessToken;
    onSilentRefresh();
  } else {
    console.log("Access Token not defined");
  }
};
