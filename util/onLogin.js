import axios from "axios";
import { useRouter } from "next/router";
import { onLogout } from "./onLogout";

export function onLogin(requestBody) {
  axios
    .post("/api/auth/login", requestBody)
    .then((res) => {
      console.log(res);
      onLoginSuccess(res);
    })
    .catch((err) => {
      console.log(err);
    });

  const onLoginSuccess = (res) => {
    axios.defaults.headers.common["authorization"] = res.headers.authorization;
    setTimeout(onSilentRefresh, 10000);
  };
  const onSilentRefresh = async () => {
    if (axios.defaults.headers.common["authorization"]) {
      await axios
        .get("/api/auth/refresh")
        .then((res) => {
          onLoginSuccess(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}
