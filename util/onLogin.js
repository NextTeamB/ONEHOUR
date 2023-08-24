import axios from "axios";
import { login, getToken } from "@/slices/userSlice";

export function onLogin(requestBody, dispatch) {
  axios
    .post("/api/auth/login", requestBody)
    .then((res) => {
      console.log(res);
      dispatch(login(res.data)); // 로그인 시 userSlice의 login 리듀서로 res.data에서 이메일, 이름, 닉네임을 넘겨줌
      dispatch(getToken(res.headers.authorization)); // accessToken은 이후 silentRefresh를 위해 리듀서를 분리함
      // 로그인 후 대시보드에서 새로고침 시 onLogin 함수는 이미 실행 완료된 상황이므로 onLoginSuccess 함수 또한 실행되지 않음
      // onLoginSuccess 삭제 -> 내비게이터에서 reissueToken으로 silent Refresh 수행하도록 변경
    })
    .catch((err) => {
      console.log(err);
    });
}

const onSilentRefresh = async () => {
  await axios
    .get("/api/auth/refresh")
    .then((res) => {
      axios.defaults.headers.common["authorization"] =
        res.headers.authorization;
      setTimeout(onSilentRefresh, 10000);
      console.log(res);
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
