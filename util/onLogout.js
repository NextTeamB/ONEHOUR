import axios from "axios";
import { persistor } from "../store/store";

export async function onLogout() {
  await axios
    .delete("/api/auth/logout")
    .then((res) => {
      persistor.purge();
      axios.defaults.headers.common["authorization"] = undefined;
      window.location.replace("/");
    })
    .catch((err) => {
      console.log(err);
    });
}
