import axios from "axios";

export const sendPostData = (postInfo, router) => {
  return axios
    .post("/api/challengers", postInfo)
    .then((res) => {
      console.log(res);
      router.push("/dashboard/challengers");
    })
    .catch((err) => {
      console.log(err);
    });
};