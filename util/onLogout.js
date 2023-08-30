import axios from "axios";
import { persistor } from "../store/store";

export async function onLogout() {
  await axios
    .delete("/api/auth/logout")
    .then((res) => {
      alert("로그아웃되었습니다.");
      persistor.purge();
      axios.defaults.headers.common["authorization"] = undefined;
      window.location.replace("/");
    })
    .catch((err) => {
      console.log(err);
    });
}
